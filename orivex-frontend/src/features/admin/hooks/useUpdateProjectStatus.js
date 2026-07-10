import {

  useMutation,

  useQueryClient,

} from "@tanstack/react-query";

import {

  updateProjectStatus,

} from "../services/adminService";

export function useUpdateProjectStatus() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({

      projectId,

      status,

    }) =>

      updateProjectStatus(

        projectId,

        status

      ),

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-projects"],

      });

    },

  });

}