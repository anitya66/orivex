
import {
  LayoutDashboard,
  Briefcase,
  Gavel,
  FileText,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import { useLogoutModal } from "@/contexts/LogoutModalContext";

const clientMenus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Projects",
    path: "/dashboard/my-projects",
    icon: Briefcase,
  },
  {
    name: "Contracts",
    path: "/dashboard/contracts",
    icon: FileText,
  },
  {
    name: "Chat",
    path: "/dashboard/chat",
    icon: MessageSquare,
  },
  {
    name: "Notifications",
    path: "/dashboard/notifications",
    icon: Bell,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

const freelancerMenus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Browse Projects",
    path: "/dashboard/browse-projects",
    icon: Briefcase,
  },
  {
    name: "My Proposals",
    path: "/dashboard/my-proposals",
    icon: Gavel,
  },
  {
    name: "My Contracts",
    path: "/dashboard/my-contracts",
    icon: FileText,
  },
  {
    name: "Chat",
    path: "/dashboard/chat",
    icon: MessageSquare,
  },
  {
    name: "Notifications",
    path: "/dashboard/notifications",
    icon: Bell,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

const adminMenus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    path: "/dashboard/admin/users",
    icon: User,
  },
  {
    name: "Projects",
    path: "/dashboard/admin/projects",
    icon: Briefcase,
  },
  {
    name: "Contracts",
    path: "/dashboard/admin/contracts",
    icon: FileText,
  },
  {
    name: "Analytics",
    path: "/dashboard/admin/analytics",
    icon: Gavel,
  },
  {
    name: "Notifications",
    path: "/dashboard/notifications",
    icon: Bell,
  },
];

function Sidebar({
  open,
  onClose,
}) {
  const { user } = useAuth();

  const { setOpen } = useLogoutModal();

  const menus =
    user?.role === "CLIENT"
      ? clientMenus
      : user?.role === "FREELANCER"
      ? freelancerMenus
      : adminMenus;

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        flex w-72 flex-col
        border-r border-slate-800
        bg-slate-950
        transition-transform duration-300 ease-in-out

        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:static
        lg:translate-x-0
        lg:flex-shrink-0
      `}
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-6 lg:justify-start">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-blue-500/30">

            O

          </div>

          <div>

            <h1 className="text-xl font-bold tracking-wide text-white">
              ORIVEX
            </h1>

            <p className="text-xs tracking-wide text-slate-400">
              Premium Marketplace
            </p>

          </div>

        </div>

        {/* Close Button */}

        <button
          onClick={onClose}
          className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white lg:hidden"
        >
          <X size={20} />
        </button>

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Navigation
        </p>

        <div className="space-y-2">

          {menus.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose?.()}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`
                }
              >
                <Icon
                  size={20}
                  className="transition-transform duration-200 group-hover:scale-110"
                />

                <span>{item.name}</span>

              </NavLink>

            );

          })}

        </div>

      </nav>
          {/* Bottom */}

      <div className="border-t border-slate-800 p-5">

        <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Account
        </p>

        {/* User Card */}

        <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-900 p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">

              {user?.name?.charAt(0)?.toUpperCase()}

            </div>

            <div className="min-w-0 flex-1">

              <p className="truncate font-semibold text-white">

                {user?.name}

              </p>

              <div className="mt-1 flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <p className="truncate text-xs uppercase tracking-wider text-slate-400">

                  {user?.role}

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Logout */}

        <button
          onClick={() => {
            onClose?.();
            setOpen(true);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-medium text-red-400 transition-all duration-200 hover:bg-red-500 hover:text-white"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>

  );

}

export default Sidebar;