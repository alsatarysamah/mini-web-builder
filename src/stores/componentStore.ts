import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import {
  getComponentHeight,
  getComponentWidth,
} from "@/utils/componentHelpers";

// Define allowed component types
export type ComponentType =
  | "Header"
  | "Title"
  | "Paragraph"
  | "Image"
  | "Footer";

// Shape of each component instance
export type ComponentInstance = {
  id: string;
  type: ComponentType;
  content: string;
  count: number;
  x: number;
  y: number;
};

// Store interface
type ComponentStore = {
  components: ComponentInstance[];
  addComponent: (type: ComponentType) => void;
  updateComponentContent: (id: string, content: string) => void;
  updateComponentPosition: (id: string, x: number, y: number) => void;
  removeComponent: (id: string) => void;
  setComponents: (components: ComponentInstance[]) => void;
  resetComponents: () => void;
};

// Zustand store with sessionStorage persistence
export const useComponentStore = create<ComponentStore>()(
  persist(
    (set) => ({
      components: [],

      // Adds a new component and calculates its vertical position
      addComponent: (type) =>
        set((state) => {
          const count =
            state.components.filter((c) => c.type === type).length + 1;
          const GAP = 12;

          const lastBottom = state.components.reduce((max, comp) => {
            const bottom = comp.y + getComponentHeight(comp.type);
            return Math.max(max, bottom);
          }, 0);

          return {
            components: [
              ...state.components,
              {
                id: nanoid(),
                type,
                content: "",
                count,
                x: 0,
                y: lastBottom + GAP,
              },
            ],
          };
        }),

      // Updates the content of a component
      updateComponentContent: (id, content) =>
        set((state) => ({
          components: state.components.map((comp) =>
            comp.id === id ? { ...comp, content } : comp
          ),
        })),

      // Updates the position of a component, but prevents overlaps
      updateComponentPosition: (id, x, y) =>
        set((state) => {
          const current = state.components.find((c) => c.id === id);
          if (!current) return {};

          const width = getComponentWidth(current.type);
          const height = getComponentHeight(current.type);

          const newRect = { x, y, width, height };

          const isOverlapping = (r1, r2) => {
            return !(
              r1.x + r1.width <= r2.x ||
              r1.x >= r2.x + r2.width ||
              r1.y + r1.height <= r2.y ||
              r1.y >= r2.y + r2.height
            );
          };

          const overlap = state.components.some((c) => {
            if (c.id === id) return false;
            const otherRect = {
              x: c.x,
              y: c.y,
              width: getComponentWidth(c.type),
              height: getComponentHeight(c.type),
            };
            return isOverlapping(newRect, otherRect);
          });

          if (overlap) return {}; // Skip update

          return {
            components: state.components.map((comp) =>
              comp.id === id ? { ...comp, x, y } : comp
            ),
          };
        }),

      // Removes a component by ID
      removeComponent: (id) =>
        set((state) => ({
          components: state.components.filter((comp) => comp.id !== id),
        })),

      // Sets the full list of components
      setComponents: (components) => set({ components }),

      // Clears all components
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
}

    }
  )
);
