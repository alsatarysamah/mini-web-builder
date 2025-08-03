import type { ComponentType } from "@/stores/componentStore";

export const getComponentHeight = (type: ComponentType): number => {
  switch (type) {
    case "Paragraph":
      return 100;
    case "Header":
      return 55;
    case "Title":
      return 60;
    default:
      return 50;
  }
};
