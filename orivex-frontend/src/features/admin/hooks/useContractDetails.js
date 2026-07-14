import { useQuery } from "@tanstack/react-query";

import { getContractDetails } from "../services/adminService";

export function useContractDetails(contractId) {

  return useQuery({

    queryKey: [
      "admin-contract",
      contractId,
    ],

    queryFn: () =>
      getContractDetails(contractId),

    enabled: !!contractId,

  });

}