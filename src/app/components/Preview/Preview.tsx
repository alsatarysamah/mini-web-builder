"use client";

import { useEffect, useState } from "react";
import { useComponentStore } from "@/stores/componentStore";
import HeaderSection from "./HeaderSection";
import GeneralSection from "./GeneralSection";
import ParagraphSection from "./ParagraphSection";
import ImageSection from "./ImageSection";

export default function Preview() {
  const components = useComponentStore((state) => state.components);
  const removeComponent = useComponentStore((state) => state.removeComponent);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && selectedId) {
        removeComponent(selectedId);
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, removeComponent]);

  return (
    <div className="relative w-full h-[70vh] overflow-x-hidden py-5  my-5 border-2 border-dashed border-gray-300 bg-white rounded-xl shadow-md">
      {components.map((comp) => {
        const isSelected = comp.id === selectedId;

        const commonProps = {
          id: comp.id,
          selected: isSelected,
          onSelect: () => setSelectedId(comp.id),
          x: comp.x,
          y: comp.y,
        };

        switch (comp.type) {
          case "Header":
            return <HeaderSection key={comp.id} {...commonProps} />;
          case "Title":
            return (
              <GeneralSection
                key={comp.id}
                {...commonProps}
                placeholder="Your Title Here"
              />
            );
          case "Paragraph":
            return <ParagraphSection key={comp.id} {...commonProps} />;
          case "Image":
            return <ImageSection key={comp.id} {...commonProps} />;
          case "Footer":
            return (
              <GeneralSection
                key={comp.id}
                {...commonProps}
                placeholder="Your Footer Here"
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
