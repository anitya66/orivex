import { useQuery } from "@tanstack/react-query";

import { getOpenProjects } from "../api/projectApi";

export function useProjects(params) {

  return useQuery({

    queryKey: ["open-projects", params],

    queryFn: () => getOpenProjects(params),

    keepPreviousData: true,

  });

}