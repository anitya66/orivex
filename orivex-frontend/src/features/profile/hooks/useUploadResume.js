import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadResume } from "../services/profileService";

export function useUploadResume() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: uploadResume,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

    },

  });

}