import { Candidacies } from "~/client";
import type { Route } from "./+types/candidacy";
import { municipalityName } from "~/utils/muncipality_name";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { data } = await Candidacies.candidaciesGetCandidacyById({
    path: { candidacy_id: params.candidacyId },
  });
  return data;
}

export default function Candidacy({ loaderData }: Route.ComponentProps) {
  const candidacy = loaderData;

  return (
    <>
      <h1 className="text-3xl">
        Candidatura Municipal {municipalityName(candidacy?.municipality!)}
      </h1>
      <details>
        <summary>Tip sobre esta página</summary>
        <p>
          Esta página es para ver los detalles de una candidatura específica.
        </p>
      </details>
      <div className="flex flex-col gap-2 mt-4 border-1 shadow-2xl p-4 rounded bg-white">
        <h2 className="text-2xl font-bold">Datos de la candidatura</h2>
        {/* <pre>{JSON.stringify(candidacy, null, 2)}</pre> */}
        <div>Candidato: {candidacy?.candidate_personal_info.full_name}</div>
        <div>Cargo: {candidacy?.political_position}</div>
        <div>Posicion: {candidacy?.position}</div>
        {/* <div>{municipalityName(candidacy?.municipality!)}</div> */}

        <h2 className="text-2xl font-bold">Datos Personal</h2>
        <div>
          Fecha de Nacimiento: {candidacy?.candidate_personal_info.birthdate}
        </div>
        <div>Curp: {candidacy?.candidate_personal_info.curp}</div>
        <div>
          Municipio de Residencia:{" "}
          {candidacy?.candidate_personal_info.municipality_of_residence}
        </div>
        <div>Sexo: {candidacy?.candidate_personal_info.gender}</div>
        <div>
          Clave de Elector:{" "}
          {candidacy?.candidate_personal_info.ine_clave_elector}
        </div>
        <div>
          Estado de Residencia:{" "}
          {candidacy?.candidate_personal_info.state_of_residence}
        </div>
        <div>
          Ine Valida Hasta: {candidacy?.candidate_personal_info.ine_valid_until}
        </div>
        <div>
          Es servidor Publico:{" "}
          {candidacy?.candidate_personal_info.is_public_servant ? "Si" : "No"}
        </div>
        <div>Ocupación: {candidacy?.candidate_personal_info.gender}</div>
      </div>
    </>
  );
}
