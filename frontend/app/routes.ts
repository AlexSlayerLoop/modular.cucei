import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Admin.tsx"),
  route("/auth/login", "routes/auth/login.tsx"),
] satisfies RouteConfig;
