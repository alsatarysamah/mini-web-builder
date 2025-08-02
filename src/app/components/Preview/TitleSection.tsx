"use client";
import { useComponentStore } from "@/stores/componentStore";
import { useState } from "react";

type Props = {
  id: string;
  selected: boolean;
  onSelect: () => void;
  x: number;
  y: number;
};

export default function TitleSection({ id, selected, onSelect, x, y }: Props) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const component = useComponentStore((state) =>
    state.components.find((c) => c.id === id)
  );
  const update = useComponentStore((state) => state.updateComponentContent);
  const updatePosition = useComponentStore(
    (state) => state.updateComponentPosition
  );

  if (!component) return null;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setDragOffset({ x: offsetX, y: offsetY });
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const parentRect = (
      e.target as HTMLElement
    ).parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    const newX = e.clientX - parentRect.left - dragOffset.x;
    const newY = e.clientY - parentRect.top - dragOffset.y;

    updatePosition(id, newX, newY);
  };

  return (
    <div
      draggable
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      tabIndex={0}
      style={{ left: x, top: y, width: "90%" }}
      className={`absolute p-4 border rounded-lg bg-gray-50 cursor-move items-center ${
        selected ? "border-gray-600 ring-2 ring-gray-400" : "border-gray-300"
      }`}
    >
      <input
        value={component.content}
        onChange={(e) => update(id, e.target.value)}
        placeholder="Your Title Here"
        className="w-full text-2xl font-semibold text-gray-700 bg-transparent outline-none text-center"
      />
    </div>
  );
}
