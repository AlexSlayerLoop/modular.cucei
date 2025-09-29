import type { Route } from "./+types/Admin";

export async function clientLoader() {
  const res = await fetch("http://localhost:8000/api/v1/", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTk3Nzg5MzksInN1YiI6IjQ2MzBiZmJlLTE0MzYtNGNmZi1iY2E4LTdkODI3MmVhZTA5NSJ9.cOGDwb0xyrkdMevP_yF4iaG0Ag6ERBHXVhNA0wf6w4s",
    },
  });
  const data = await res.json();

  return { apiData: data };
}

export default function Admin({ loaderData }: Route.ComponentProps) {
  const { count, data } = loaderData.apiData;

  const users = data.map((user) => {
    return (
      <li key={user.id}>
        {user.email} {user.party_name}
      </li>
    );
  });

  return (
    <>
      <h1>users: {count}</h1>
      <ul>{users}</ul>
    </>
  );
}
