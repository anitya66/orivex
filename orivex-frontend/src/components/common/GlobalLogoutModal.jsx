import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmActionModal from "@/components/ui/ConfirmActionModal";
import { useLogoutModal } from "@/contexts/LogoutModalContext";
import { useAuth } from "@/contexts/AuthContext";

function GlobalLogoutModal() {
  const navigate = useNavigate();

  const { open, setOpen } =
    useLogoutModal();

  const { logout } = useAuth();

  const [loading, setLoading] =
    useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      logout();

      setOpen(false);

      navigate("/", {
        replace: true,
      });
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return null;
  }

  return (
    <ConfirmActionModal
      title="Are you sure you want to logout?"
      message="You will need to sign in again to access your dashboard."
      confirmText="Logout"
      loading={loading}
      onConfirm={handleLogout}
      onClose={() => setOpen(false)}
    />
  );
}

export default GlobalLogoutModal;