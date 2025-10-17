import type { Route } from "./+types/dashboard";
import { userContext } from "~/context";

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const user = context.get(userContext);
  return user;
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const user = loaderData;
  return (
    <div>
      <h1 className="text-3xl">Dashboard</h1>

      <p>Welcome, {user?.email}</p>
      <p>id: {user?.id}</p>
      <p>full_name: {user?.full_name ?? "[not set yet]"}</p>
      <p>municipality: {user?.municipality ?? "[not set yet]"}</p>
    </div>
  );
}
