import { useQuery } from "@tanstack/react-query";

import { getProjectProposals } from "../api/proposalApi";

export function useProjectProposals(projectId) {
  return useQuery({
    queryKey: ["project-proposals", projectId],

    queryFn: () =>
      getProjectProposals(projectId),

    enabled: !!projectId,
  });
}