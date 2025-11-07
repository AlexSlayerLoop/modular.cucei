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
    route("admin/user/:userId", "./routes/user.tsx"),
    route("admin/create-user", "./routes/create-user.tsx"),
    route("dashboard", "./routes/dashboard.tsx"),
    route("me", "./routes/me.tsx"),
    route("candidacies", "./routes/candidacies.tsx"),
    route("candidacy/:candidacyId", "./routes/candidacy.tsx"),
    route("create-candidacy", "./routes/create-candidacy.tsx"),
  ]),
] satisfies RouteConfig;
