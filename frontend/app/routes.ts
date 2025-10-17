import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),

  route("login", "./routes/login.tsx"),

  layout("./routes/layout.tsx", [
    route("admin", "./routes/admin.tsx"),
    route("dashboard", "./routes/dashboard.tsx"),
    route("me", "./routes/me.tsx"),
  ]),
] satisfies RouteConfig;
