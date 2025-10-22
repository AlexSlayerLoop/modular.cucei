import { userContext } from "~/context";
import type { Route } from "./+types/me";
import { useFetcher } from "react-router";
import { Users } from "~/client";

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const user = context.get(userContext);
  return user;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const full_name = formData.get("full_name") as string;
  const intent = formData.get("intent") as string;

  if (intent === "update") {
    const { data, error, response } = await Users.usersUpdateUserMe({
      body: { full_name, email },
    });

    if (response?.ok) {
      return { ok: true, message: "User updated successfully" };
    } else {
      return { ok: false, message: "Failed to update user" };
    }
  }

  if (intent === "delete") {
    const { response } = await Users.usersDeleteUserMe();
    if (response?.ok) {
      localStorage.removeItem("access_token");
    } else {
      return {
        ok: false,
        message: "Super users are not allowed to delete themselves",
      };
    }
  }
}

export default function UserMe({ loaderData }: Route.ComponentProps) {
  const user = loaderData;
  let fetcher = useFetcher();

  return (
    <>
      {fetcher.data?.ok && (
        <p className="bg-green-200 text-green-800 p-2 mb-4">
          {fetcher.data.message}
        </p>
      )}
      {fetcher.data?.ok === false && (
        <p className="bg-red-200 text-red-800 p-2 mb-4">
          {fetcher.data.message}
        </p>
      )}

      <fetcher.Form
        method="post"
        className="grid grid-cols-[_1fr_3fr] gap-2 justify-items-stretch text-3xl"
      >
        <label htmlFor="email" className="font-bold">
          Email{" "}
        </label>
        <input
          className="border-2"
          type="email"
          id="email"
          name="email"
          defaultValue={user?.email}
          required
        />

        <label htmlFor="full_name" className="font-bold">
          Full Name
        </label>
        <input
          className="border-2"
          type="text"
          id="full_name"
          name="full_name"
          defaultValue={user?.full_name ?? ""}
        />

        <label htmlFor="municipality" className="font-bold">
          Municipality
        </label>
        <input
          className="border-2"
          type="text"
          id="municipality"
          name="municipality"
          defaultValue={user?.municipality ?? ""}
          readOnly
        />
        <div className="col-span-2 flex gap-4 justify-end mt-4">
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
    </>
  );
}
