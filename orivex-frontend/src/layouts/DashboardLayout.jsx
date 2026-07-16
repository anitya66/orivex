import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "@/components/common/Sidebar/Sidebar";
import Topbar from "@/components/common/Topbar/Topbar";

import {
  connectSocket,
  disconnectSocket,
} from "@/features/chat/websocket/socketManager";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    console.log("DashboardLayout Mounted");

    connectSocket();

    return () => {
      console.log("DashboardLayout Unmounted");

      disconnectSocket();
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Right Section */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Topbar */}

        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Content */}

        <main className="flex-1 overflow-y-auto bg-slate-950">
          <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;