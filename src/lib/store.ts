import { create } from "zustand";

interface LoaderState {
  isLoading: boolean;
  message: string;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
}

export const useStore = create<LoaderState>((set) => ({
  isLoading: false,
  message: "CARGANDO DATOS",
  startLoading: (message = "CARGANDO DATOS") => set({ isLoading: true, message }),
  stopLoading: () => set({ isLoading: false }),
}));
