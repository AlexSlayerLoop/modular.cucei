import { Link } from "react-router";

export default function Index() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl">Welcome to the App!</h1>
      <p>
        This is the home page.{" "}
        <span className="text-blue-500 underline">
          <Link to="/login">Login</Link>
        </span>
      </p>
    </div>
  );
}
