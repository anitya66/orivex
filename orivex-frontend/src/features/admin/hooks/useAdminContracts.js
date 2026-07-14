import {
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";

import { getContracts } from "../services/adminService";

export function useAdminContracts({

  page,

  size,

  keyword,

  status,

}) {

  return useQuery({

    queryKey: [
      "admin-contracts",
      page,
      size,
      keyword,
      status,
    ],

    queryFn: () =>
      getContracts({
        page,
        size,
        keyword,
        status,
      }),

    placeholderData: keepPreviousData,

  });

}