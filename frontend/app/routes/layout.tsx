import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { authMiddleware, timingMiddleware } from "~/middleware/auth";
import Sidebar from "~/components/Common/Sidebar";

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  // timingMiddleware,
  authMiddleware,
];

export default function Layout() {
  function handleClick() {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between sticky top-0 bg-gray-200 p-2">
        <div>Logo</div>
        <button
          className="p-2 hover:text-white hover:bg-black"
          onClick={handleClick}
        >
          Log out
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex flex-col flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
