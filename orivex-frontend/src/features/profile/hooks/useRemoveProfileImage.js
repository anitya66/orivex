import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeProfileImage } from "../api/profileApi";

export function useRemoveProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeProfileImage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}