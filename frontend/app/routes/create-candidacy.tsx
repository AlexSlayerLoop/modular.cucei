import { useFetcher } from "react-router";
import type { Route } from "./+types/create-candidacy";
import { userContext } from "~/context";
import {
  Candidacies,
  Ocr,
  type CandidacyPublicWithPersonalInfo,
  type CandidacyWithPersonalInfoCreate,
  type GenderEnum,
  type PoliticalPosition,
} from "~/client";
import { useEffect, useState } from "react";
import { municipalityName } from "~/utils/muncipality_name";
import { stringToNum } from "~/utils/string_to_num";

interface OcrResult {
  results: Array<{
    page: number;
    text: string;
    confidence: number;
  }>;
}

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const currentUser = context.get(userContext);
  return currentUser;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "mainForm") {
    const political_position = formData.get(
      "political_position",
    ) as PoliticalPosition;
    const position = formData.get("position") as string;
    const municipality = formData.get("municipality") as string;

    const full_name = formData.get("full_name") as string;
    const birthdate = formData.get("birthdate") as string;
    const gender = formData.get("gender") as GenderEnum;
    const state_of_residence = formData.get("state_of_residence") as string;
    const municipality_of_residence = formData.get("municipality_of_residence");
    const curp = formData.get("curp") as string;
    const ine_valid_until = formData.get("ine_valid_until") as string;
    const ine_clave_elector = formData.get("ine_clave_elector") as string;
    const is_public_servant =
      (formData.get("is_public_servant") as string) === "si";
    const ocupation = formData.get("ocupation") as string;

    const body: CandidacyWithPersonalInfoCreate = {
      municipal_candidacy: {
        political_position: political_position,
        position: Number(position),
        municipality: Number(municipality),
      },
      candidate_personal_info: {
        full_name: full_name,
        birthdate: birthdate,
        gender: gender,
        state_of_residence: Number(state_of_residence),
        municipality_of_residence: Number(municipality_of_residence),
        curp: curp,
        ine_valid_until: ine_valid_until,
        ine_clave_elector: ine_clave_elector,
        is_public_servant: is_public_servant,
        ocupation: ocupation,
      },
    };

    const { data, error, response } =
      await Candidacies.candidaciesCreateCandidacy({
        body: body,
      });

    console.log(data, error);

    if (!response.ok) {
      return {
        ok: false,
        message:
          error?.detail?.at(0)?.msg ??
          error?.detail ??
          "Error al crear la candidatura",
      };
    } else {
      return { ok: true, message: "Candidatura creada correctamente" };
    }
  }

  if (intent === "analize_ine") {
    const file = formData.get("ine") as File;

    const { data, error } = await Ocr.ocrOcrEndpoint({
      body: { file },
    });
    const ocrResult = data as OcrResult;
    // console.log(ocrResult);

    const isIne = {
      text: ocrResult.results.at(2)?.text.includes("CREDENCIAL PARA VOTAR"),
      confidence: ocrResult.results.at(2)?.confidence,
    };

    if (!isIne.text) {
      return { ok: false, message: "El archivo subido no es una INE." };
    }

    const curp = ocrResult.results.at(17);
    const resObj = {
      full_name: {
        text: ocrResult.results.at(43)?.text,
        confidence: ocrResult.results.at(43)?.confidence,
      },
      birthdate: {
        // format YYYY-MM-DD
        text:
          ocrResult.results?.at(7)?.text.split("/").reverse()?.join("-") || "",
        confidence: ocrResult.results.at(7)?.confidence,
      },
      curp: {
        text: curp?.text,
        confidence: curp?.confidence,
      },
      gender: {
        text: curp?.text.charAt(10),
        confidence: curp?.confidence,
      },
      state_of_residence: {
        text: ocrResult.results.at(21)?.text,
        confidence: ocrResult.results.at(21)?.confidence,
      },
      municipality_of_residence: {
        text: ocrResult.results.at(22)?.text.slice(-3),
        confidence: ocrResult.results.at(22)?.confidence,
      },
      ine_valid_until: {
        text: ocrResult.results.at(30)?.text,
        confidence: ocrResult.results.at(30)?.confidence,
      },
      ine_clave_elector: {
        text: ocrResult.results.at(15)?.text.split(" ").at(-1) || "",
        confidence: ocrResult.results.at(15)?.confidence,
      },
    };
    return resObj;
  }

  if (intent === "formulario_aceptacion_de_registro") {
    const file = formData.get("aceptacion_de_registro") as File;

    const { data, error } = await Ocr.ocrOcrEndpoint({
      body: { file },
    });
    const ocrResult = data as OcrResult;

    if (!ocrResult.results.at(10)?.text.includes("5a. ESCRITO")) {
      return {
        ok: false,
        message: "El archivo subido no es el formulario correcto.",
      };
    }

    const positionExtractedText = ocrResult.results.at(24)?.text.split(" ");

    const returnPosition = (array: string[]) => {
      if (array?.includes("Presidencia")) return "Presidencia";
      if (array?.includes("Sindicatura")) return "Sindicatura";
      if (array?.includes("Regiduría")) return "Regiduría";
      return "";
    };

    const resObj = {
      position: {
        text: stringToNum(ocrResult.results.at(25)?.text || ""),
        confidence: ocrResult.results.at(25)?.confidence,
      },
      political_position: {
        text: returnPosition(positionExtractedText!) || "",
        confidence: ocrResult.results.at(24)?.confidence,
      },
    };

    console.log(ocrResult);
    return resObj;
  }
}

export default function CreateCandidacy({ loaderData }: Route.ComponentProps) {
  const currentUser = loaderData;
  let fetcher = useFetcher();

  const [hasIneFile, setHasIneFile] = useState(false);
  const [hasAceptationFile, setHasAceptationFile] = useState(false);
  const [formData, setFormData] = useState({
    full_name: {
      text: "",
      confidence: 0,
    },
    birthdate: {
      text: "1970-01-01",
      confidence: 0,
    },
    gender: {
      text: "",
      confidence: 0,
    },
    curp: {
      text: "",
      confidence: 0,
    },
    state_of_residence: {
      text: "",
      confidence: 0,
    },
    municipality_of_residence: {
      text: "",
      confidence: 0,
    },
    ine_valid_until: {
      text: "",
      confidence: 0,
    },
    ine_clave_elector: {
      text: "",
      confidence: 0,
    },
    political_position: {
      text: "",
      confidence: 0,
    },
    position: {
      text: "",
      confidence: 0,
    },
  });

  useEffect(() => {
    if (fetcher.data) {
      setFormData((prevData) => ({
        ...prevData,
        ...fetcher.data,
      }));
    }
  }, [fetcher.data]);

  const handleIneFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setHasIneFile(Boolean(files && files.length > 0));
  };

  const handleAcpetationFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    setHasAceptationFile(Boolean(files && files.length > 0));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        text: value,
      },
    }));
  };

  return (
    <>
      {fetcher.data?.message && (
        <div
          className={
            fetcher.data.ok
              ? "max-w-5xl mx-auto p-4 mb-4 text-center font-bold bg-green-200 text-green-800"
              : "max-w-5xl mx-auto p-4 mb-4 text-center font-bold bg-red-200 text-red-800"
          }
        >
          {fetcher.data.message}
        </div>
      )}

      <h1 className="text-center text-4xl mb-3">
        Crear Candidatura {currentUser?.political_party}{" "}
        {currentUser?.municipality &&
          municipalityName(currentUser?.municipality)}
      </h1>

      <div className="flex gap-4">
        <div className="flex flex-col *:flex *:flex-col gap-8">
          {/*Archivo INE */}
          <div>
            <fetcher.Form method="post" encType="multipart/form-data">
              <label htmlFor="ine" className="text-center">
                INE
              </label>
              <br />
              <input
                type="text"
                name="filetype"
                value="ine_certificada"
                hidden
                readOnly
              />
              <input
                id="ine"
                name="ine"
                type="file"
                className="border-2"
                onChange={handleIneFileChange}
              />
              <button
                type="submit"
                name="intent"
                value="analize_ine"
                disabled={!hasIneFile}
                className={
                  hasIneFile
                    ? "border-1 rounded-2xl px-4 py-1 mt-2 bg-blue-500 text-white"
                    : "border-1 rounded-2xl px-4 py-1 mt-2 bg-gray-300 cursor-not-allowed"
                }
              >
                {fetcher.state !== "idle" ? "Analizando..." : "Analizar"}
              </button>
            </fetcher.Form>
          </div>

          {/*Archivo form de aceptacion */}
          <div>
            <fetcher.Form method="post" encType="multipart/form-data">
              <label htmlFor="aceptacion_de_registro" className="text-center">
                Fomulario de aceptacion de registro
              </label>
              <br />
              <input
                type="text"
                name="filetype"
                value="formulario_aceptacion_de_registro"
                hidden
                readOnly
              />
              <input
                id="aceptacion_de_registro"
                name="aceptacion_de_registro"
                type="file"
                className="border-2"
                onChange={handleAcpetationFileChange}
              />
              <button
                type="submit"
                name="intent"
                value="formulario_aceptacion_de_registro"
                className={
                  hasAceptationFile
                    ? "border-1 rounded-2xl px-4 py-1 mt-2 bg-blue-500 text-white"
                    : "border-1 rounded-2xl px-4 py-1 mt-2 bg-gray-300 cursor-not-allowed"
                }
              >
                {fetcher.state !== "idle" ? "Analizando..." : "Analizar"}
              </button>
            </fetcher.Form>
          </div>

          {/*Archivo 3 de 3 contra la violencia */}
          {/* <div> */}
          {/*   <label htmlFor="3_de_3" className="text-center"> */}
          {/*     Formulario de 3 de 3 contra la violencia */}
          {/*   </label> */}
          {/*   <input */}
          {/*     id="3_de_3" */}
          {/*     name="files" */}
          {/*     type="file" */}
          {/*     multiple */}
          {/*     className="border-2" */}
          {/*   /> */}
          {/*   <input type="submit" value={"Upload Files"} className="border-2" /> */}
          {/* </div> */}

          {/*Archivo acta de nacimiento */}
          {/*   <div> */}
          {/*     <label htmlFor="acta_nacimiento" className="text-center"> */}
          {/*       Acta de nacimiento */}
          {/*     </label> */}
          {/*     <input */}
          {/*       id="acta_nacimiento" */}
          {/*       name="files" */}
          {/*       type="file" */}
          {/*       multiple */}
          {/*       className="border-2" */}
          {/*     /> */}
          {/*     <input type="submit" value={"Upload Files"} className="border-2" /> */}
          {/*   </div> */}
        </div>

        <fetcher.Form method="post">
          <div className="**:mx-2 **:my-1">
            {/* Political Position */}
            <div>
              <label htmlFor="political_position">Puesto</label>
              <select
                name="political_position"
                id="political_position"
                className="border-2"
                value={formData.political_position.text}
                onChange={handleInputChange}
              >
                <option value="Presidente">Presidente</option>
                <option value="Sindico">Sindico</option>
                <option value="Regidor">Regidor</option>
              </select>
              {fetcher.data?.political_position && (
                <span className="text-red-400">
                  confidence {formData.political_position.confidence.toFixed(2)}
                </span>
              )}
            </div>

            {/* Position */}
            <div>
              <label htmlFor="position">Posicion</label>
              <input
                id="position"
                name="position"
                type="number"
                className="border-2"
                value={formData.position.text}
                onChange={handleInputChange}
                required
              />
              {fetcher.data?.position && (
                <span className="text-red-400">
                  confidence {formData.position.confidence.toFixed(2)}
                </span>
              )}
            </div>

            {/* Municipio */}
            <div>
              <label htmlFor="municipality">Municipio</label>
              <input
                type="number"
                id="municipality"
                name="municipality"
                value={currentUser?.municipality || ""}
                className="border-2"
                readOnly
              />
            </div>

            {/* Nombre Completo */}
            <div>
              <label htmlFor="full_name">Nombre Completo</label>
              <input
                id="full_name"
                className="border-2"
                type="text"
                name="full_name"
                value={formData.full_name.text}
                onChange={handleInputChange}
              />
              {fetcher.data?.full_name && (
                <span className="text-red-400">
                  confidence {formData.full_name.confidence.toFixed(2)}
                </span>
              )}
            </div>

            {/* Fecha de Nacimiento */}
            <div>
              <label htmlFor="birthdate">Fecha de Nacimiento</label>
              <input
                name="birthdate"
                type="date"
                className="border-2"
                value={formData.birthdate.text}
                onChange={handleInputChange}
              />
              {fetcher.data?.birthdate && (
                <span className="text-red-400">
                  confidence {formData.birthdate.confidence.toFixed(2)}
                </span>
              )}
            </div>

            {/* Sexo */}
            <div>
              <label htmlFor="gender">Sexo</label>
              <select
                name="gender"
                id="gender"
                className="border-2"
                value={formData.gender.text}
                onChange={handleInputChange}
              >
                <option value="M">Mujer</option>
                <option value="H">Hombre</option>
              </select>

              {fetcher.data?.gender && (
                <span className="text-red-400">
                  confidence {formData.gender.confidence.toFixed(2)}
                </span>
              )}
            </div>

            {/* Estado de Recidencia */}
            <div>
              <label htmlFor="state_of_residence">Estado de Recidencia</label>
              <input
                type="number"
                name="state_of_residence"
                className="border-2"
                value={formData.state_of_residence.text}
                onChange={handleInputChange}
                required
              />
              {fetcher.data?.state_of_residence && (
                <span className="text-red-400">
                  confidence {formData.state_of_residence.confidence.toFixed(2)}
                </span>
              )}
            </div>

            {/* Municipio de Recidencia */}
            <div>
              <label htmlFor="municipality_of_residence">
                Municipio de Recidencia
              </label>
              <input
                type="number"
                name="municipality_of_residence"
                className="border-2"
                value={formData.municipality_of_residence.text}
                onChange={handleInputChange}
              />
              {fetcher.data?.municipality_of_recidence && (
                <span className="text-red-400">
                  confidence
                  {formData.municipality_of_residence.confidence.toFixed(2)}
                </span>
              )}
            </div>

            {/* CURP */}
            <div>
              <label htmlFor="curp">curp</label>
              <input
                name="curp"
                type="text"
                className="border-2"
                value={formData.curp.text}
                onChange={handleInputChange}
              />
              {fetcher.data?.curp && (
                <span className="text-red-400">
                  confidence {formData.curp.confidence.toFixed(2)}
                </span>
              )}
            </div>

            {/* INE valid until */}
            <div>
              <label htmlFor="ine_valid_until">Año de Vigencia (INE)</label>
              <input
                type="text"
                placeholder="ej. 2032"
                id="ine_valid_until"
                name="ine_valid_until"
                value={formData.ine_valid_until.text}
                onChange={handleInputChange}
                className="border-2"
              />
              {fetcher.data?.ine_valid_until && (
                <span className="text-red-400">
                  confidence {formData.ine_valid_until.confidence.toFixed(2)}
                </span>
              )}
            </div>

            {/* INE clave de elector */}
            <div>
              <label htmlFor="ine_clave_elector">INE Clave Elector</label>
              <input
                type="ine_clave_elector"
                id="ine_clave_elector"
                name="ine_clave_elector"
                value={formData.ine_clave_elector.text}
                onChange={handleInputChange}
                className="border-2"
              />
              {fetcher.data?.ine_clave_elector && (
                <span className="text-red-400">
                  confidence {formData.ine_clave_elector.confidence.toFixed(2)}
                </span>
              )}
            </div>

            {/* Servidor Publico */}
            <div>
              <span>¿Eres servidor público?</span>
              <label htmlFor="si">si</label>
              <input
                id="si"
                type="radio"
                name="is_public_servant"
                value="si"
                className="border-2"
              />
              <label id="no">no</label>
              <input
                id="no"
                type="radio"
                name="is_public_servant"
                value="no"
                className="border-2"
              />
            </div>

            {/* Ocupacion */}
            <div>
              <label htmlFor="ocupation">Ocupacion</label>
              <input
                name="ocupation"
                id="ocupation"
                type="text"
                className="border-2"
                required
              />
            </div>

            <button
              type="submit"
              name="intent"
              value="mainForm"
              className="border-2 mt-2 rounded-xl px-2 hover:bg-black hover:text-white"
            >
              Enviar
            </button>
          </div>
        </fetcher.Form>
      </div>
    </>
  );
}
