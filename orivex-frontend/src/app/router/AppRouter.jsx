import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../../features/landing/pages/LandingPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;