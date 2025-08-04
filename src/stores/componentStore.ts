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

          const GAP = 12;

          const lastBottom = state.components.reduce((max, comp) => {
            const compBottom = comp.y + getComponentHeight(comp.type);
            return compBottom > max ? compBottom : max;
          }, 0);

          const newY = lastBottom + GAP;

          return {
            components: [
              ...state.components,
              {
                id: nanoid(),
                type,
                content: "",
                count,
                x: 0,
                y: newY,
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

          const currentWidth = getComponentWidth(current.type);
          const currentHeight = getComponentHeight(current.type);

          // Helper to check if two rectangles overlap
          const isOverlapping = (
            rect1: { x: number; y: number; width: number; height: number },
            rect2: { x: number; y: number; width: number; height: number }
          ) => {
            return !(
              rect1.x + rect1.width <= rect2.x ||
              rect1.x >= rect2.x + rect2.width ||
              rect1.y + rect1.height <= rect2.y ||
              rect1.y >= rect2.y + rect2.height
            );
          };

          const newRect = {
            x,
            y,
            width: currentWidth,
            height: currentHeight,
          };

          const hasOverlap = state.components.some((comp) => {
            if (comp.id === id) return false;

            const otherRect = {
              x: comp.x,
              y: comp.y,
              width: getComponentWidth(comp.type),
              height: getComponentHeight(comp.type),
            };

            return isOverlapping(newRect, otherRect);
          });

          if (hasOverlap) {
            return {}; // reject position update if overlap is found
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
      storage: {
        getItem: (key) => {
          const item = sessionStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        },
        setItem: (key, value) => {
          sessionStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          sessionStorage.removeItem(key);
        },
      },
    }
  )
);
