import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeResume } from "../api/profileApi";

export function useRemoveResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeResume,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}