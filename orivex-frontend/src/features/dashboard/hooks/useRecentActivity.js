import { useQuery } from "@tanstack/react-query";

import { getRecentActivity } from "../api/activityApi";

export function useRecentActivity() {
  return useQuery({
    queryKey: ["recent-activity"],
    queryFn: getRecentActivity,
  });
}