import { useQuery } from "@tanstack/react-query";

import { getRecentActivities } from "../services/adminService";

export function useRecentActivities() {

  return useQuery({

    queryKey: ["recent-activities"],

    queryFn: getRecentActivities,

  });

}