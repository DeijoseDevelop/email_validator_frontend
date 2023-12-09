import { create } from "zustand";

interface IUseHome {
    file: File | null;
    setFile: (file: File | null) => void;
}

export const useHome = create<IUseHome>((set, get) => ({
    file: null,
    setFile: (file: File | null) => set({ file }),
}));