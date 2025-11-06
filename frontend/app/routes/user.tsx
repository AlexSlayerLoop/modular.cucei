import { Users, type UserUpdate } from "~/client";
import type { Route } from "./+types/user";
import { redirect, useFetcher } from "react-router";
import { userContext } from "~/context";
import { useEffect, useState } from "react";

export async function clientLoader({
  params,
  context,
}: Route.ClientLoaderArgs) {
  const { data, error } = await Users.usersReadUserById({
    path: { user_id: params.userId },
  });

  context.set(userContext, data!);

  return { data };
}

export async function clientAction({
  request,
  context,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const user_id = formData.get("user_id") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const full_name = formData.get("full_name") as string;
  const municipality = formData.get("municipality") as number | null;
  let is_superuser = formData.get("is_superuser") as boolean | string;
  is_superuser = is_superuser === "si" ? true : false;
  const intent = formData.get("intent") as string;

  const user = context.get(userContext);
  const changes: Partial<UserUpdate> = {};

  if (email !== user?.email) changes.email = email;
  if (full_name !== user?.full_name) changes.full_name = full_name;
  if (municipality !== user?.municipality) changes.municipality = municipality;
  if (is_superuser !== user?.is_superuser) changes.is_superuser = is_superuser;
  if (password && password.length > 0) {
    changes.password = password;
  }

  if (intent === "update") {
    if (Object.keys(changes).length > 0) {
      const { data, error, response } = await Users.usersUpdateUser({
        path: { user_id },
        body: changes,
      });
      if (response?.ok) {
        return { ok: true, message: "User updated successfully" };
      } else {
        return { ok: false, message: "Failed to update user" };
      }
    }
  }

  if (intent === "delete") {
    const { response } = await Users.usersDeleteUser({
      path: { user_id: user_id },
    });
    if (response?.ok) {
      return redirect("/admin");
    } else {
      return {
        ok: false,
        message: "Super users are not allowed to delete themselves",
      };
    }
  }
}

export default function User({ loaderData }: Route.ComponentProps) {
  const { data: user } = loaderData;
  let fetcher = useFetcher();
  const [visible, setVisible] = useState(false);

  const showToast = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 4000);
  };

  useEffect(() => {
    if (fetcher.data) {
      showToast();
    }
  }, [fetcher.data]);

  return (
    <>
      {visible && fetcher.data?.ok && (
        <p className="bg-green-200 text-green-800 p-2 mb-4">
          {fetcher.data.message}
        </p>
      )}
      {visible && fetcher.data?.ok === false && (
        <p className="bg-red-200 text-red-800 p-2 mb-4">
          {fetcher.data.message}
        </p>
      )}

      <div className="max-w-5xl mx-auto p-4 bg-white shadow-md rounded">
        <fetcher.Form
          method="post"
          className="*:flex *:justify-between *:gap-4 *:mb-2"
        >
          <input type="hidden" name="user_id" value={user?.id} />

          {/* is_superuser */}
          <div>
            <p className="font-bold">Super Usuario?</p>
            <div>
              <label htmlFor="si">Si </label>
              <input
                type="radio"
                id="si"
                name="is_superuser"
                value="si"
                defaultChecked={user?.is_superuser === true}
              />
            </div>
            <div>
              <label htmlFor="no">No </label>
              <input
                type="radio"
                id="no"
                name="is_superuser"
                value="no"
                defaultChecked={user?.is_superuser === false}
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
              defaultValue={user?.full_name ?? ""}
            />
          </div>

          {/* email */}
          <div>
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              className="border-2"
              type="email"
              id="email"
              name="email"
              defaultValue={user?.email}
              required
            />
          </div>

          {/* password */}
          <div>
            <label htmlFor="password" className="font-bold">
              Nueva contraseña
            </label>
            <input
              className="border-2"
              type="password"
              id="password"
              name="password"
              minLength={8}
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
              defaultValue={user?.municipality ?? ""}
            />
          </div>

          {/* political_party */}
          <div>
            <label htmlFor="political_party" className="font-bold">
              Partido
            </label>
            <input
              type="text"
              id="political_party"
              name="political_party"
              defaultValue={user?.political_party ?? ""}
              readOnly
            />
          </div>

          {/* buttons */}
          <div className="flex gap-4 justify-end mt-4">
            <button
              type="submit"
              name="intent"
              value="update"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              Update
            </button>
            <button
              type="submit"
              name="intent"
              value="delete"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
            >
              delete
            </button>
          </div>
        </fetcher.Form>
      </div>
    </>
  );
}
