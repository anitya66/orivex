import { useQuery } from "@tanstack/react-query";

import { getUserDetails } from "../services/adminService";

export function useUserDetails(userId) {

  return useQuery({

    queryKey: [
      "admin-user-details",
      userId,
    ],

    queryFn: () =>
      getUserDetails(userId),

    enabled: !!userId,

  });

}