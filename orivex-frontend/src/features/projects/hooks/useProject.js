import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../api/projectApi";

export function useProject(id) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });
}