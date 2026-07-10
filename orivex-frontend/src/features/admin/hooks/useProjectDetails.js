import { useQuery } from "@tanstack/react-query";

import { getProjectDetails } from "../services/adminService";

export function useProjectDetails(projectId) {

  return useQuery({

    queryKey: [

      "admin-project-details",

      projectId,

    ],

    queryFn: () =>

      getProjectDetails(projectId),

    enabled: !!projectId,

  });

}