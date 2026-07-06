import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../api/deleteProject";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}