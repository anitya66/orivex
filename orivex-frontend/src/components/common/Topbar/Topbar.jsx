import { Bell, Search } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

function Topbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      <div className="flex items-center gap-3 rounded-xl border border-slate-700 px-4 py-2 text-slate-400">
        <Search size={18} />

        <span>Search...</span>
      </div>

      <div className="flex items-center gap-4">
        <Bell className="text-slate-400" />

        <div className="text-right">
          <p className="text-sm font-medium text-white">
            {user?.name}
          </p>

          <p className="text-xs text-slate-400">
            {user?.role}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Topbar;