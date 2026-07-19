import { Toaster } from "sonner";

import AppRouter from "@/routes/AppRouter";



function AppContent() {
  

  return (
    <>
      <AppRouter />

      

      <Toaster
        position="top-right"
        richColors
        closeButton
      />
    </>
  );
}

export default function App() {
  return <AppContent />;
}