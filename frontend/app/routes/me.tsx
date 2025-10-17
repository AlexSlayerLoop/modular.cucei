import { userContext } from "~/context";
import type { Route } from "./+types/me";

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const user = context.get(userContext);
  return user;
}

export default function UserMe({ loaderData }: Route.ComponentProps) {
  const user = loaderData;
  return (
    // TODO: create a proper user profile page
    <>
      <h1 className="flex justify-center py-16 text-3xl">
        User profile {user?.email}
      </h1>
    </>
  );
}
