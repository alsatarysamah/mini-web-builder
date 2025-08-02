import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export type ComponentType =
  | "Header"
  | "Title"
  | "Paragraph"
  | "Image"
  | "Footer";

export type ComponentInstance = {
  id: string;
  type: ComponentType;
  content: string;
  count: number;
  x: number;
  y: number;
};

type ComponentStore = {
  components: ComponentInstance[];
  addComponent: (type: ComponentType) => void;
  updateComponentContent: (id: string, content: string) => void;
  updateComponentPosition: (id: string, x: number, y: number) => void;
  removeComponent: (id: string) => void;
  setComponents: (components: ComponentInstance[]) => void;
};

export const useComponentStore = create<ComponentStore>()(
  persist(
    (set) => ({
      components: [],

      // Add new component with default x/y position
      addComponent: (type) =>
        set((state) => {
          const count =
            state.components.filter((c) => c.type === type).length + 1;
          return {
            components: [
              ...state.components,
              {
                id: nanoid(),
                type,
                content: "",
                count,
                x: 0,
                y: 0,
              },
            ],
          };
        }),

      updateComponentContent: (id, content) =>
        set((state) => ({
          components: state.components.map((comp) =>
            comp.id === id ? { ...comp, content } : comp
          ),
        })),

      updateComponentPosition: (id, x, y) =>
        set((state) => ({
          components: state.components.map((comp) =>
            comp.id === id ? { ...comp, x, y } : comp
          ),
        })),

      removeComponent: (id) =>
        set((state) => ({
          components: state.components.filter((comp) => comp.id !== id),
        })),

      setComponents: (components) => set({ components }),
    }),
    {
      name: "builder-components",
    }
  )
);
