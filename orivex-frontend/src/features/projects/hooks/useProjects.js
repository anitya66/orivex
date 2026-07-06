import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/projectApi";

export function useProjects(params) {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => getProjects(params),
    keepPreviousData: true,
  });
}