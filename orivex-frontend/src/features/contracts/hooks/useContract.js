import { useQuery } from "@tanstack/react-query";
import { getContractById } from "../api/contractApi";

export function useContract(id) {
  return useQuery({
    queryKey: ["contract", id],
    queryFn: () => getContractById(id),
    enabled: !!id,
  });
}