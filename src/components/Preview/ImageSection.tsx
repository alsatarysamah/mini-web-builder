"use client";

import { useState, useRef } from "react";
import { Image as LucideImage } from "lucide-react";
import { useComponentStore } from "@/stores/componentStore";
import Image from "next/image";

type Props = {
  id: string;
  selected: boolean;
  onSelect: () => void;
  x: number;
  y: number;
};

export default function ImageSection({ id, selected, onSelect, x, y }: Props) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const component = useComponentStore((state) =>
    state.components.find((c) => c.id === id)
  );

  const updateContent = useComponentStore(
    (state) => state.updateComponentContent
  );

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      updateContent(id, base64);
    };
    reader.readAsDataURL(file);
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
      style={{
        left: x,
        top: y,
        width: "600px",
        height: "400px",
      }}
      className={`absolute p-4 border rounded-lg bg-white cursor-move flex flex-col justify-center items-center gap-2 ${
        selected ? "border-blue-600 ring-2 ring-blue-400" : "border-gray-300"
      }`}
    >
      {component.content ? (
        <div className="w-full h-full flex justify-center items-center overflow-hidden">
          <Image
            src={component.content}
            alt="Uploaded"
            height={50}
            width={50}
            className="w-full h-full object-contain rounded"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400 w-full h-full bg-gray-50">
          <LucideImage className="text-6xl opacity-20" />
          <p className="text-sm mt-2">Upload an image</p>
        </div>
      )}

      <label
        htmlFor={`file-input-${id}`}
        className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded shadow hover:opacity-90 transition"
      >
        {component.content ? "Change Your Image" : "Upload an Image"}
      </label>
      <input
        id={`file-input-${id}`}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
