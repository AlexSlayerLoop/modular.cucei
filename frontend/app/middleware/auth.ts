import { redirect } from "react-router";
import { Users } from "~/client";
import { userContext } from "~/context";

export async function timingMiddleware({ request, context }, next) {
  const start = performance.now();
  await next();
  const duration = performance.now() - start;
  console.log(`Navigation took ${duration}ms`);
  console.log(`Request URL: ${request.url}`);
}

export async function authMiddleware({ context }) {
  const { data, error } = await Users.usersReadUserMe();

  error && localStorage.removeItem("access_token");

  if (!data) {
    console.log("No user, redirecting to /login");
    throw redirect("/login");
  }

  context.set(userContext, data);
}
