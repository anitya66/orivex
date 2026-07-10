import {
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";

import { getProjects } from "../services/adminService";

export function useProjects({

  page,

  size,

  keyword,

  status,

}) {

  return useQuery({

    queryKey: [

      "admin-projects",

      page,

      size,

      keyword,

      status,

    ],

    queryFn: () =>

      getProjects({

        page,

        size,

        keyword,

        status,

      }),

    placeholderData: keepPreviousData,

  });

}