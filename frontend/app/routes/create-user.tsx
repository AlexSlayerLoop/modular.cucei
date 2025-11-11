import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/create-user";
import { Users, type PoliticalParties, type UserCreate } from "~/client";
import { userContext } from "~/context";

export async function clientAction({
  request,
  context,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const is_superuser = formData.get("is_superuser") === "si";
  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmar = formData.get("confirmar") as string;
  const municipality = formData.get("municipality") as string;
  const political_party = formData.get("political_party") as PoliticalParties;

  const body: UserCreate = { is_superuser, email, password };
  if (full_name && full_name.length > 0) body.full_name = full_name;
  municipality && (body.municipality = +municipality);

  const currentUser = context.get(userContext);
  body.political_party = currentUser?.political_party
    ? currentUser.political_party
    : political_party;

  if (password !== confirmar) {
    return { ok: false, message: "Las contraseñas no coinciden" };
  }

  const { data, error, response } = await Users.usersCreateUser({
    body: body,
  });

  if (!response?.ok) {
    return {
      ok: false,
      message:
        error?.detail?.at(0)?.msg ??
        error?.detail ??
        "Error al crear el usuario",
    };
  }

  return redirect("/admin");
}

export default function CreateUser() {
  let fetcher = useFetcher();

  return (
    <>
      {fetcher.data?.message && (
        <div
          className={`max-w-5xl mx-auto p-4 mb-4 text-center font-bold ${
            fetcher.data.ok
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          } rounded`}
        >
          {fetcher.data.message}
        </div>
      )}
      <h1 className="text-center text-xl font-bold mb-4 mx-10">
        Create User Page
      </h1>

      <div className="max-w-5xl mx-auto p-4 bg-white shadow-md rounded">
        <fetcher.Form
          method="post"
          className="*:flex *:justify-between *:gap-4 *:mb-2"
        >
          {/* is_superuser */}
          <div>
            <p className="font-bold">
              Super Usuario? <span className="text-red-500 ">*</span>
            </p>
            <div>
              <label htmlFor="si">Si </label>
              <input type="radio" id="si" name="is_superuser" value="si" />
            </div>
            <div>
              <label htmlFor="no">No </label>
              <input
                type="radio"
                id="no"
                name="is_superuser"
                value="no"
                defaultChecked
              />
            </div>
          </div>

          {/* full_name */}
          <div>
            <label htmlFor="full_name" className="font-bold">
              Nombre Completo
            </label>
            <input
              className="border-2"
              type="text"
              id="full_name"
              name="full_name"
            />
          </div>

          {/* email */}
          <div>
            <label htmlFor="email" className="font-bold">
              Email <span className="text-red-500 ">*</span>
            </label>
            <input
              className="border-2"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>

          {/* password */}
          <div>
            <label htmlFor="password" className="font-bold">
              Nueva contraseña <span className="text-red-500 ">*</span>
            </label>
            <input
              className="border-2"
              type="password"
              id="password"
              name="password"
              // minLength={8}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmar" className="font-bold">
              Confirmar contraseña <span className="text-red-500 ">*</span>
            </label>
            <input
              className="border-2"
              type="password"
              id="confirmar"
              name="confirmar"
              // minLength={8}
              required
            />
          </div>

          {/* municipality */}
          <div>
            <label htmlFor="municipality" className="font-bold">
              Municipio
            </label>
            <input
              className="border-2"
              type="text"
              id="municipality"
              name="municipality"
            />
          </div>

          {/* partido politico */}
          <div>
            <label htmlFor="political_party" className="font-bold">
              Partido Politico
            </label>
            <select name="political_party" id="political_party">
              <option value="MC">MC</option>
              <option value="MORENA">MORENA</option>
              <option value="PRI">PRI</option>
              <option value="PAN">PAN</option>
              <option value="PT">PT</option>
              <option value="PRD">PRD</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            Crear
          </button>
        </fetcher.Form>
      </div>
    </>
  );
}
