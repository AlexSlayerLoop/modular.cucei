import { Users } from "~/client";
import type { Route } from "./+types/admin";
import Pagination from "~/components/Common/Pagination";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const currentPage = +(url.searchParams.get("page") || 1);
  const USERS_PER_PAGE = 5;

  const { data } = await Users.usersReadUsers({
    query: { limit: USERS_PER_PAGE, skip: USERS_PER_PAGE * (currentPage - 1) },
  });

  return { data, currentPage, USERS_PER_PAGE };
}

export default function Admin({ loaderData }: Route.ComponentProps) {
  const { data, currentPage, USERS_PER_PAGE } = loaderData;

  const { data: users, count } = data!;

  return (
    <>
      <table className="table-auto border-collapse border border-gray-400 mx-10">
        <caption className="caption-top">Total users: {count}</caption>
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
              <td>{user.email}</td>
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
