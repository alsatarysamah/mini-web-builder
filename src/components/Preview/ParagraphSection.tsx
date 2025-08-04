"use client";

import { useComponentStore } from "@/stores/componentStore";
import { useEffect, useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const component = useComponentStore((state) =>
    state.components.find((c) => c.id === id)
  );
  const updateContent = useComponentStore(
    (state) => state.updateComponentContent
  );
  const updatePosition = useComponentStore(
    (state) => state.updateComponentPosition
  );

  useEffect(() => {
    if (ref.current && component) {
      const rect = ref.current.getBoundingClientRect();
      useComponentStore.setState((state) => ({
        components: state.components.map((c) =>
          c.id === id ? { ...c, width: rect.width, height: rect.height } : c
        ),
      }));
    }
  }, [id]);

  if (!component) return null;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (!parentRect || !ref.current || !component) return;

    let newX = e.clientX - parentRect.left - dragOffset.x;
    let newY = e.clientY - parentRect.top - dragOffset.y;

    newX = Math.max(0, Math.min(newX, parentRect.width - component.width));
    newY = Math.max(0, Math.min(newY, parentRect.height - component.height));

    const accepted = updatePosition(id, newX, newY);

    if (!accepted) {
      // TODO: Add a visual shake or toast here to indicate rejection
    } else {
      const rect = ref.current.getBoundingClientRect();
      useComponentStore.setState((state) => ({
        components: state.components.map((c) =>
          c.id === id ? { ...c, width: rect.width, height: rect.height } : c
        ),
      }));
    }
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
      style={{ left: component.x, top: component.y }}
      tabIndex={0}
      className={`absolute w-1/2 p-4 border rounded-lg bg-gray-50 cursor-move ${
        selected ? "border-gray-600 ring-2 ring-gray-400" : "border-gray-300"
      }`}
    >
      <textarea
        value={component.content}
        onChange={(e) => updateContent(id, e.target.value)}
        placeholder="Write a paragraph..."
        className="w-full h-32 resize-none text-gray-700 bg-transparent outline-none"
      />
    </div>
  );
}
