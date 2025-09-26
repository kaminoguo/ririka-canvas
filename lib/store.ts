import { create } from "zustand";

interface CanvasElement {
  id: string;
  type: "sticky" | "social" | "image" | "music";
  position: { x: number; y: number };
  rotation?: number;
  content?: string;
  href?: string;
}

interface CanvasStore {
  elements: CanvasElement[];
  addElement: (element: CanvasElement) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;
}

const useCanvasStore = create<CanvasStore>((set) => ({
  elements: [],
  addElement: (element) =>
    set((state) => ({ elements: [...state.elements, element] })),
  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    })),
  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
    })),
}));

export default useCanvasStore;