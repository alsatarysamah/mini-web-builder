"use client";

import { useState, useEffect } from "react";
import { useComponentStore } from "@/stores/componentStore";
import HeaderSection from "./HeaderSection";

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

  if (components.length === 0) {
    return (
      <div className="flex-1 mx-10 my-5 border-2 border-dashed border-gray-300 bg-white rounded-xl shadow-md p-6 min-h-[300px]">
        <p className="text-center text-gray-400">
          🧱 Start adding sections from above...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 mx-10 my-5 border-2 border-dashed border-gray-300 bg-white rounded-xl shadow-md p-6 min-h-[300px]">
      {components.map((comp) => {
        const isSelected = comp.id === selectedId;

        const commonProps = {
          id: comp.id,
          selected: isSelected,
          onSelect: () => setSelectedId(comp.id),
        };

        switch (comp.type) {
          case "Header":
            return <HeaderSection key={comp.id} {...commonProps} />;
          // case "Paragraph":
          //   return <ParagraphSection key={comp.id} {...commonProps} />;
          // add others...
          default:
            return null;
        }
      })}
    </div>
  );
}
