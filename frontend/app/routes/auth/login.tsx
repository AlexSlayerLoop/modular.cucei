import { Form, type ActionFunctionArgs } from "react-router";

export async function actions({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
}

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Form className="border-2 p-4">
        <h1 className="text-center">Login</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="username">Email</label>
          <input
            className="border-2"
            type="email"
            id="username"
            name="username"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="border-2"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button
          className="rounded-lg p-2 border-2 mt-2 hover:bg-black hover:text-white"
          type="submit"
        >
          Login
        </button>
      </Form>
    </div>
  );
}
