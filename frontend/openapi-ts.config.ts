import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./openapi.json",
  output: "app/client",
  plugins: [
    {
      name: "@hey-api/sdk",
      asClass: true,
    },
    {
      name: "@hey-api/schemas",
      type: "json",
    },
  ],
});
