import type { ComponentType } from "@/stores/componentStore";

export const getComponentHeight = (type: ComponentType): number => {
  switch (type) {
    case "Paragraph":
      return 100;
    case "Header":
      return 55;
    case "Title":
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
      return 180;
    case "Paragraph":
      return 250;
    case "Image":
      return 110;
    case "Footer":
    default:
      return 110;
  }
}
