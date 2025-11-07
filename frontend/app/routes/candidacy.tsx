import { Candidacies } from "~/client";
import type { Route } from "./+types/candidacy";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { data } = await Candidacies.candidaciesGetCandidacyById({
    path: { candidacy_id: params.candidacyId },
  });
  return data;
}

export default function Candidacy({ loaderData }: Route.ComponentProps) {
  const cadidacy = loaderData;

  return (
    <>
      <h1 className="text-3xl">Bienvenido a Candidatua Municipal</h1>
      <details>
        <summary>Tip sobre esta página</summary>
        <p>
          Esta página es para ver los detalles de una candidatura específica.
        </p>
      </details>

      <div className="flex flex-col">
        <pre>{JSON.stringify(cadidacy, null, 2)}</pre>
      </div>
    </>
  );
}
