import { Users, type UsersPublic } from "~/client";
import type { Route } from "./+types/admin";

export async function clientLoader() {
  const { data, error, request, response } = await Users.usersReadUsers({
    query: { limit: 10 },
  });
  if (!response.ok) {
    // manejar el error
  } else {
    return data;
  }
}

export default function Admin({ loaderData }: Route.ComponentProps) {
  const { count, data: users } = loaderData as UsersPublic;

  return (
    <div>
      <div className="text-center">
        <h1>Users Management</h1>
        <p>Total users: {count}</p>
        <p>Email | Name | Municipality</p>
      </div>
      <br />

      <ul className="flex flex-col items-center">
        {users.map((user) => (
          <li key={user.id}>
            {user.email} - {user.full_name ?? "[not set yet]"} -{" "}
            {user.municipality ?? "[not set yet]"}
          </li>
        ))}
      </ul>
    </div>
  );
}
