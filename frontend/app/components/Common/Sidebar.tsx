import { NavLink } from "react-router";

export default function Sidebar() {
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
            My Profile
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
            to="create-registro"
            className={({ isActive }) =>
              isActive ? "bg-black text-white p-2" : "hover:underline"
            }
          >
            Crear Registro
          </NavLink>

          <NavLink
            to="admin"
            className={({ isActive }) =>
              isActive ? "bg-black text-white p-2" : "hover:underline"
            }
          >
            Admin
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
}
