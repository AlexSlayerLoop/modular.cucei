from io import BytesIO

import numpy as np
import requests
from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from pdf2image import convert_from_bytes
from PIL import Image

from app.core.ai import load_ocr_model

router = APIRouter(prefix="/ocr", tags=["ocr"])


@router.post("/")
async def ocr_endpoint(
    file: UploadFile | None = File(None),
    image_url: str | None = Form(None),
):
    """inference endpoint for ocr"""
    if not file and not image_url:
        raise HTTPException(
            status_code=400, detail="Provide either a file or an image URL"
        )

    if image_url:
        res = requests.get(image_url)
        if res.status_code != 200:
            raise HTTPException(status_code=400, detail="invalid iamge URL")
        content = res.content
        filename = image_url.split("/")[-1]
    else:
        content = await file.read()
        filename = file.filename

    results = []
    reader = load_ocr_model()

    if filename.lower().endswith("pdf"):
        try:
            images = convert_from_bytes(content)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error converting PDF. {e}")

        for i, image in enumerate(images, 1):
            page_results = reader.readtext(np.array(image))
            texts = [
                {"page": 1, "text": t, "confidence": float(conf)}
                for (_, t, conf) in page_results
            ]
            results.extend(texts)
    else:
        image = Image.open(BytesIO(content))
        ocr_results = reader.readtext(np.array(image))
        results = [
            {"page": 1, "text": t, "confidence": float(conf)}
            for (_, t, conf) in ocr_results
        ]
    return JSONResponse({"results": results})
