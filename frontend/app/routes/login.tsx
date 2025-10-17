import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/login";
import { Login as LoginRequest } from "~/client/sdk.gen";

export async function clientLoader() {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return redirect("/dashboard");
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const { data, error } = await LoginRequest.loginLoginAccessToken({
    body: { username, password },
  });

  if (data) {
    localStorage.setItem("access_token", data.access_token);
    return redirect("/dashboard");
  }

  return { error };
}

export default function Login() {
  let fetcher = useFetcher();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <fetcher.Form className="border-2 p-7" method="post">
        {fetcher.state !== "idle" && <p>Loading...</p>}
        {fetcher.data?.error && (
          <p className="bg-red-200 text-red-800 p-2">
            {fetcher.data?.error.detail}
          </p>
        )}

        <h1 className="text-center">Login</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Email</label>
          <input
            className="border-2"
            type="email"
            id="username"
            name="username"
            required
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="border-2"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button
          className="rounded-lg p-2 border-2 mt-2 hover:bg-black hover:text-white"
          type="submit"
        >
          Login
        </button>
      </fetcher.Form>
    </div>
  );
}
