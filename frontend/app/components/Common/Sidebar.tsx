import { NavLink } from "react-router";
import type { UserPublic } from "~/client";

export default function Sidebar({ currentUser }: { currentUser: UserPublic }) {
  return (
    <aside className="basis-48 bg-gray-300">
      <nav>
        <ul className="flex flex-col gap-2 p-2">
          <NavLink
            to="/me"
            className={({ isActive }) =>
              isActive ? "bg-black text-white p-2" : "hover:underline"
            }
          >
            Mi Perfil
          </NavLink>

          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              isActive ? "bg-black text-white p-2" : "hover:underline"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="candidacies"
            className={({ isActive }) =>
              isActive ? "bg-black text-white p-2" : "hover:underline"
            }
          >
            Candidaturas
          </NavLink>

          {currentUser.is_superuser && (
            <NavLink
              to="admin"
              className={({ isActive }) =>
                isActive ? "bg-black text-white p-2" : "hover:underline"
              }
            >
              Admin
            </NavLink>
          )}
        </ul>
      </nav>
    </aside>
  );
}
