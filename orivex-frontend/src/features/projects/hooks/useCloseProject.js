import { useMutation, useQueryClient } from "@tanstack/react-query";
import { closeProject } from "../api/closeProject";

export function useCloseProject() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: closeProject,

    onSuccess: (_, id) => {

      queryClient.invalidateQueries({
        queryKey: ["my-projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["project", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["project", String(id)],
      });

    },

  });

}