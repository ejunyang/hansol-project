import { ImageItem } from "@/type/DetectType";
import { create } from "zustand";

type SelectedImageItem = ImageItem & { unique_id: string };

interface ModalType {
  selectedImage: SelectedImageItem | undefined;
  setSelectedImage: (data: SelectedImageItem | undefined) => void;
}

export const useModalStore = create<ModalType>((set) => ({
  selectedImage: undefined,
  setSelectedImage: (data) => set({ selectedImage: data }),
}));
