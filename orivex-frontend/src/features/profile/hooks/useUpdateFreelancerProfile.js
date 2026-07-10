import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateFreelancerProfile } from "../services/profileService";

export function useUpdateFreelancerProfile() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: updateFreelancerProfile,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

    },

  });

}