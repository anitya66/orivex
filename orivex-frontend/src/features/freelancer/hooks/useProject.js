import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../api/freelancerProjectApi";

export function useProject(id) {
  return useQuery({
    queryKey: ["freelancer-project", id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });
}