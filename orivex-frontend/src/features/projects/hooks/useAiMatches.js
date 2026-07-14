import { useQuery } from "@tanstack/react-query";

import { getAiMatches } from "../api/aiMatchingApi";

export function useAiMatches(projectId) {
  return useQuery({
    queryKey: ["ai-matches", projectId],

    queryFn: () => getAiMatches(projectId),

    enabled: !!projectId,
  });
}