"use client";
import { useComponentStore } from "@/stores/componentStore";
import { useState, useRef } from "react";

type Props = {
  id: string;
  selected: boolean;
  onSelect: () => void;
  x: number;
  y: number;
};

export default function ParagraphSection({
  id,
  selected,
  onSelect,
  x,
  y,
}: Props) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

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
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();
    const compRect = ref.current?.getBoundingClientRect();
    if (!parentRect || !compRect) return;

    let newX = e.clientX - parentRect.left - dragOffset.x;
    let newY = e.clientY - parentRect.top - dragOffset.y;

    newX = Math.max(0, Math.min(newX, parentRect.width - compRect.width));
    newY = Math.max(0, Math.min(newY, parentRect.height - compRect.height));

    updatePosition(id, newX, newY);
  };

  return (
    <div
      ref={ref}
      draggable
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      tabIndex={0}
      style={{ left: x, top: y }}
      className={`absolute w-1/2 p-4 border rounded-lg bg-gray-50 cursor-move ${
        selected ? "border-gray-600 ring-2 ring-gray-400" : "border-gray-300"
      }`}
    >
      <textarea
        value={component.content}
        onChange={(e) => update(id, e.target.value)}
        placeholder="Write a paragraph..."
        className="w-full h-32 resize-none text-gray-700 bg-transparent outline-none"
      />
    </div>
  );
}
