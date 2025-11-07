import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { authMiddleware } from "~/middleware/auth";
import Sidebar from "~/components/Common/Sidebar";
import { userContext } from "~/context";

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  // timingMiddleware,
  authMiddleware,
];

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const currentUser = context.get(userContext);
  return currentUser;
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const currentUser = loaderData;

  function handleClick() {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between sticky top-0 bg-gray-200 p-2">
        <div className="font-stretch-expanded  text-3xl">SISGE 〄</div>
        <div className="flex">
          <p className="p-2">{currentUser?.full_name}</p>
          <span className="p-2">|</span>
          <button
            className="p-2 hover:text-white hover:bg-black"
            onClick={handleClick}
          >
            Log out
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentUser={currentUser!} />

        <main className="flex flex-col flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
