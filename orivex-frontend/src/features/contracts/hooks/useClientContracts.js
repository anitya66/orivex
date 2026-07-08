import { useQuery } from "@tanstack/react-query";
import { getClientContracts } from "../api/contractApi";

export function useClientContracts() {
  return useQuery({
    queryKey: ["client-contracts"],
    queryFn: getClientContracts,
  });
}