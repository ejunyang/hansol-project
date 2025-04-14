import { SocketDataType } from "@/type/DetectType";
import { create } from "zustand";

interface SocketState {
  isConnected: boolean;
  socketData: SocketDataType | null;
  setConnected: (status: boolean) => void;
  setSocketData: (data: SocketDataType | null) => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  isConnected: false,
  socketData: null,
  setConnected: (status: boolean) => set({ isConnected: status }),
  setSocketData: (data: SocketDataType | null) => set({ socketData: data }),
}));
