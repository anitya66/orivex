import {

  useMutation,

  useQueryClient,

} from "@tanstack/react-query";

import {

  deleteProject,

} from "../services/adminService";

export function useDeleteProject() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: deleteProject,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-projects"],

      });

    },

  });

}