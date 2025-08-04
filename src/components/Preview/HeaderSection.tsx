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

export default function HeaderSection({ id, selected, onSelect, x, y }: Props) {
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
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setDragOffset({ x: offsetX, y: offsetY });
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
      style={{ left: x, top: y, width: "98%" }}
      className={`absolute p-4 m-2 border rounded-lg bg-gray-100 cursor-move items-center text-center ${
        selected ? "border-blue-600 ring-2 ring-blue-400" : "border-gray-300"
      }`}
    >
      <input
        value={component.content}
        onChange={(e) => update(id, e.target.value)}
        placeholder="Add your Header"
        className="mt-2 m-2 w-full bg-transparent border-none text-center outline-none text-blue-800 font-bold text-2xl"
      />
    </div>
  );
}
