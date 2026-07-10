import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadCompanyLogo } from "../services/profileService";

export function useUploadCompanyLogo() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: uploadCompanyLogo,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

    },

  });

}