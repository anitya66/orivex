import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadProfileImage } from "../services/profileService";

export function useUploadProfileImage() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: uploadProfileImage,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

    },

  });

}