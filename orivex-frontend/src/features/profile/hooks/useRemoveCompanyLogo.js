import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeCompanyLogo } from "../api/profileApi";

export function useRemoveCompanyLogo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCompanyLogo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}