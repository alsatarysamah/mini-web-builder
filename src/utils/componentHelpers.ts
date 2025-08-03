import type { ComponentType } from "@/stores/componentStore";

export const getComponentHeight = (type: ComponentType): number => {
  switch (type) {
    case "Paragraph":
      return 100;
    case "Header":
      return 55;
    case "Title":
    case "Footer":
      return 60;
    case "Image":
      return 400;
    default:
      return 50;
  }
};

export function getComponentWidth(type: string): number {
  switch (type) {
    case "Header":
      return 200;
    case "Title":
    case "Footer":
      return 180;
    case "Paragraph":
      return 250;
    case "Image":
      return 600;
    case "Footer":
    default:
      return 110;
  }
}
