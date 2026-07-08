import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../api/updateProject";

export function useUpdateProject() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({ id, data }) => updateProject(id, data),

    onSuccess: (_, variables) => {

      queryClient.invalidateQueries({
        queryKey: ["my-projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["project", String(variables.id)],
      });

      queryClient.invalidateQueries({
        queryKey: ["project", variables.id],
      });

    },

  });

}