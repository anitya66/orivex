import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/freelancerProjectApi";

export function useProjects(params) {
  return useQuery({
    queryKey: ["freelancer-projects", params],
    queryFn: () => getProjects(params),
  });
}