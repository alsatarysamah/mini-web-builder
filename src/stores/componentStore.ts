import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

type ComponentType = "Header" | "Title" | "Paragraph" | "Image" | "Footer";

type ComponentInstance = {
  id: string;
  type: ComponentType;
  content: string;
  count: number;
};

type ComponentStore = {
  components: ComponentInstance[];
  addComponent: (type: ComponentType) => void;
  updateComponentContent: (id: string, content: string) => void;
  removeComponent: (id: string) => void;
  setComponents: (components: ComponentInstance[]) => void;
};

export const useComponentStore = create<ComponentStore>()(
  persist(
    (set) => ({
      components: [],
      addComponent: (type) =>
        set((state) => {
          const count =
            state.components.filter((c) => c.type === type).length + 1;
          return {
            components: [
              ...state.components,
              { id: nanoid(), type, content: "", count },
            ],
          };
        }),
      updateComponentContent: (id, content) =>
        set((state) => ({
          components: state.components.map((comp) =>
            comp.id === id ? { ...comp, content } : comp
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
