import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  BarChart3,
  Shield,
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
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">

      {/* Logo */}

      <div className="border-b border-slate-800 p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">

            <Shield
              size={28}
              className="text-white"
            />

          </div>

          <div>

            <h1 className="text-3xl font-black tracking-wide text-white">
              ORIVEX
            </h1>

            <p className="text-sm text-blue-400">
              Admin Console
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-3 p-5">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >

              <Icon
                size={21}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span className="font-medium">
                {item.title}
              </span>

            </NavLink>

          );

        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-6">

        <div className="rounded-2xl bg-slate-900 p-4">

          <p className="text-xs uppercase tracking-wider text-slate-500">
            System
          </p>

          <div className="mt-3 flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

            <span className="font-medium text-white">
              Operational
            </span>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default AdminSidebar;