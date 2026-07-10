import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateClientProfile } from "../services/profileService";

export function useUpdateClientProfile() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: updateClientProfile,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

    },

  });

}