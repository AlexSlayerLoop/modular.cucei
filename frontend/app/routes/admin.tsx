import { Users } from "~/client";
import type { Route } from "./+types/admin";
import Pagination from "~/components/Common/Pagination";
import { Link } from "react-router";
import { userContext } from "~/context";

export async function clientLoader({
  request,
  context,
}: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const currentPage = +(url.searchParams.get("page") || 1);
  const USERS_PER_PAGE = 5;

  const { data } = await Users.usersReadUsers({
    query: { limit: USERS_PER_PAGE, skip: USERS_PER_PAGE * (currentPage - 1) },
  });

  const currentUser = context.get(userContext);
  return { data, currentPage, USERS_PER_PAGE, currentUser };
}

export default function Admin({ loaderData }: Route.ComponentProps) {
  const { data, currentPage, USERS_PER_PAGE, currentUser } = loaderData;

  const { data: users, count } = data!;

  return (
    <>
      <h1 className="text-xl font-bold mb-4 mx-10">
        Users Managment{" "}
        <span>
          <Link to="/admin/create-user" className="border rounded-md px-2">
            + Nuevo
          </Link>
        </span>
      </h1>

      <table className="table-auto border-collapse border border-gray-400 mx-10">
        <caption className="caption-bottom">Total users: {count}</caption>
        <thead>
          <tr className="bg-gray-200">
            <th>Email</th>
            <th>Name</th>
            <th>Municipality</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-gray-100 *:py-3 border border-y-2 border-gray-300"
            >
              <td>
                {user.id === currentUser?.id ? (
                  <Link
                    to={{ pathname: "/me" }}
                    className="text-blue-600 hover:underline"
                  >
                    {user.email} <span> (tu)</span>
                  </Link>
                ) : (
                  <Link
                    to={{ pathname: `/admin/user/${user.id}` }}
                    className="text-blue-600 hover:underline"
                  >
                    {user.email}
                  </Link>
                )}
              </td>
              <td>{user.full_name}</td>
              <td>{user.municipality}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        count={count}
        USERS_PER_PAGE={USERS_PER_PAGE}
      />
    </>
  );
}
