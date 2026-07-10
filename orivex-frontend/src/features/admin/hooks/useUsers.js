import {
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";

import { getAllUsers } from "../services/adminService";

export function useUsers({

  page,
  size,
  keyword,
  role,
  status,

}) {

  return useQuery({

    queryKey: [
      "admin-users",
      page,
      size,
      keyword,
      role,
      status,
    ],

    queryFn: () =>
      getAllUsers({
        page,
        size,
        keyword,
        role,
        status,
      }),

    placeholderData: keepPreviousData,

      staleTime: 1000 * 60,


  });

}