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
    case "Title":
    case "Footer":
      return 280;
    case "Paragraph":
      return 145;
    case "Image":
      return 600;

    default:
      return 110;
  }
}
