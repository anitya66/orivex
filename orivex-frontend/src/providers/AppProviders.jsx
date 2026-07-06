import { BrowserRouter } from "react-router-dom";


import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { Toaster } from "sonner";

import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {children}

          <Toaster
            richColors
            position="top-right"
          />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default AppProviders;