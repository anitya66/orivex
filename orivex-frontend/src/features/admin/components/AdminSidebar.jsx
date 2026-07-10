import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  BarChart3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    path: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Projects",
    path: "/dashboard/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Contracts",
    path: "/dashboard/admin/contracts",
    icon: FileText,
  },
  {
    title: "Analytics",
    path: "/dashboard/admin/analytics",
    icon: BarChart3,
  },
];

function AdminSidebar() {
  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-950">

      <div className="border-b border-slate-800 p-8">

        <h1 className="text-3xl font-bold text-blue-500">
          ORIVEX
        </h1>

        <p className="mt-2 text-slate-400">
          Admin Panel
        </p>

      </div>

      <nav className="space-y-2 p-5">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-5 py-4 transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />

              {item.title}
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}

export default AdminSidebar;