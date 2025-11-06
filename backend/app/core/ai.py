from functools import lru_cache

import easyocr


@lru_cache(maxsize=1)
def load_ocr_model():
    reader = easyocr.Reader(["es"], gpu=False)
    return reader
