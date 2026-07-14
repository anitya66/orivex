import {
  createContext,
  useContext,
  useState,
} from "react";

const LogoutModalContext =
  createContext();

export function LogoutModalProvider({
  children,
}) {
  const [open, setOpen] =
    useState(false);

  return (
    <LogoutModalContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </LogoutModalContext.Provider>
  );
}

export function useLogoutModal() {
  return useContext(
    LogoutModalContext
  );
}