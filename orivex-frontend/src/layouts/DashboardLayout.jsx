import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "@/components/common/Sidebar/Sidebar";
import Topbar from "@/components/common/Topbar/Topbar";

import {
  connectSocket,
  disconnectSocket,
} from "@/features/chat/websocket/socketManager";

function DashboardContent() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {

    console.log("Connecting ORIVEX Socket...");

    connectSocket(() => {

      console.log("✅ ORIVEX Socket Ready");

    });

    return () => {

      console.log("Disconnecting ORIVEX Socket...");

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

        <main className="flex flex-1 flex-col overflow-hidden bg-slate-950">

          <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl flex-1 flex-col px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">

            <Outlet />

          </div>

        </main>

      </div>

    </div>

  );

}

export default function DashboardLayout() {

  return <DashboardContent />;

}