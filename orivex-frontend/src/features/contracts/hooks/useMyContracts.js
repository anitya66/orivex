import { useQuery } from "@tanstack/react-query";
import { getMyContracts } from "../api/contractApi";

export function useMyContracts() {
  return useQuery({
    queryKey: ["my-contracts"],
    queryFn: getMyContracts,
  });
}