import { Outlet } from "react-router-dom";

import Sidebar from "@/components/common/Sidebar/Sidebar";
import Topbar from "@/components/common/Topbar/Topbar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;