import { BrowserRouter } from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { Toaster } from "sonner";

import { AuthProvider } from "@/contexts/AuthContext";
import { LogoutModalProvider } from "@/contexts/LogoutModalContext";

import { CallProvider } from "@/features/call/context/CallContext";

import GlobalLogoutModal from "@/components/common/GlobalLogoutModal";

const queryClient = new QueryClient();

function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>

      <BrowserRouter>

        <AuthProvider>

          <LogoutModalProvider>

            <CallProvider>

              {children}

              <GlobalLogoutModal />

              <Toaster
                richColors
                position="top-right"
              />

            </CallProvider>

          </LogoutModalProvider>

        </AuthProvider>

      </BrowserRouter>

    </QueryClientProvider>
  );
}

export default AppProviders;