import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/contexts/AuthContext";

import { getProfile } from "../services/profileService";

export function useProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["profile", user?.role],
    queryFn: () => getProfile(user.role),
    enabled: !!user,
  });
}