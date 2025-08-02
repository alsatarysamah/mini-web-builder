"use client";

import { useEffect, useState } from "react";
import { useComponentStore } from "@/stores/componentStore";
import HeaderSection from "./HeaderSection";
import TitleSection from "./TitleSection";

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
    <div
      className="relative w-full h-[800px]  my-5 border-2 border-dashed border-gray-300 bg-white rounded-xl shadow-md"
    >
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
            return <TitleSection key={comp.id} {...commonProps} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
