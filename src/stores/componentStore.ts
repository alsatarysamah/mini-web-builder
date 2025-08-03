import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import {
  getComponentHeight,
  getComponentWidth,
} from "@/utils/componentHelpers";

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
  resetComponents: () => void;
};

export const useComponentStore = create<ComponentStore>()(
  persist(
    (set) => ({
      components: [],

      addComponent: (type) =>
        set((state) => {
          const count =
            state.components.filter((c) => c.type === type).length + 1;

          const GAP = 10;

          const lastComponent = state.components[state.components.length - 1];
          const lastY = lastComponent
            ? lastComponent.y + getComponentHeight(lastComponent.type) + GAP
            : 0;

          return {
            components: [
              ...state.components,
              {
                id: nanoid(),
                type,
                content: "",
                count,
                x: 0,
                y: lastY,
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
        set((state) => {
          const current = state.components.find((comp) => comp.id === id);
          if (!current) return {};

          const isOverlapping = (
            a: { x: number; y: number },
            b: { x: number; y: number }
          ) => {
            const xOverlap =
              Math.abs(a.x - b.x) < getComponentWidth(current.type);
            const yOverlap =
              Math.abs(a.y - b.y) < getComponentHeight(current.type);
            return xOverlap && yOverlap;
          };

          const hasOverlap = state.components.some(
            (comp) =>
              comp.id !== id &&
              isOverlapping({ x, y }, { x: comp.x, y: comp.y })
          );

          if (hasOverlap) {
            return {};
          }

          return {
            components: state.components.map((comp) =>
              comp.id === id ? { ...comp, x, y } : comp
            ),
          };
        }),

      removeComponent: (id) =>
        set((state) => ({
          components: state.components.filter((comp) => comp.id !== id),
        })),

      setComponents: (newComponents) => set({ components: newComponents }),

      resetComponents: () => set({ components: [] }),
    }),
    {
      name: "builder-components",
    }
  )
);
