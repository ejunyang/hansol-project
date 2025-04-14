import { SocketDataType } from "@/type/DetectType";
import { useQuery } from "@tanstack/react-query";

export const useSocketData = () => {
  return useQuery<SocketDataType | null>({
    queryKey: ["socket-data"],
    queryFn: () => null,
    staleTime: Infinity,
  });
};
