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

import { useAuth } from "@/contexts/AuthContext";
import { STORAGE_KEYS } from "@/constants/storageKeys";

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
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const menus =
  user?.role === "CLIENT"
    ? clientMenus
    : user?.role === "FREELANCER"
    ? freelancerMenus
    : adminMenus;

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    setUser(null);
    navigate("/login");
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-blue-500">
          ORIVEX
        </h1>
      </div>

      {/* Navigation */}
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

      {/* Bottom */}
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
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;