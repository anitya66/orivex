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
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import ConfirmActionModal from "@/components/ui/ConfirmActionModal";
import { useAuth } from "@/contexts/AuthContext";

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
    name: "Bids",
    path: "/bids",
    icon: Gavel,
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

function Sidebar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [logoutModalOpen, setLogoutModalOpen] =
    useState(false);

  const [logoutLoading, setLogoutLoading] =
    useState(false);

  const menus =
    user?.role === "CLIENT"
      ? clientMenus
      : user?.role === "FREELANCER"
      ? freelancerMenus
      : adminMenus;

  async function handleLogout() {
  setLogoutLoading(true);

  try {
    logout();

    setLogoutModalOpen(false);

    // Hard redirect
    window.location.href = "/";
  } finally {
    setLogoutLoading(false);
  }
}

  return (
    <>
      <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 p-6">
          <h1 className="text-2xl font-bold text-blue-500">
            ORIVEX
          </h1>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="mb-4 rounded-xl bg-slate-800 p-4">
            <p className="font-semibold text-white">
              {user?.name}
            </p>

            <p className="text-sm text-slate-400">
              {user?.role}
            </p>
          </div>

          <button
            onClick={() =>
              setLogoutModalOpen(true)
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {logoutModalOpen && (
        <ConfirmActionModal
          title="Are you sure you want to logout?"
          message="You will need to sign in again to access your dashboard."
          confirmText="Logout"
          loadingText="Logging out..."
          loading={logoutLoading}
          onConfirm={handleLogout}
          onClose={() =>
            setLogoutModalOpen(false)
          }
        />
      )}
    </>
  );
}

export default Sidebar;