"use client";

import { useComponentStore } from "@/stores/componentStore";

const components = ["Header", "Title", "Paragraph", "Image", "Footer"] as const;
type ComponentType = (typeof components)[number];

export default function ComponentButtons() {
  const addComponent = useComponentStore((state) => state.addComponent);
  const storeState = useComponentStore((state) => state.components);
  const countOfType = (type: ComponentType) =>
    storeState.filter((comp) => comp.type === type).length;
  const handleLibClick = (label: ComponentType) => {
    addComponent(label);
  };

  return (
    <div className="flex justify-center gap-4 flex-wrap p-3 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      {components.map((label) => {
        const isDisabled =
          (label === "Header" && countOfType("Header") >= 1) ||
          (label === "Footer" && countOfType("Footer") >= 1);

        return (
          <button
            key={label}
            className={`border rounded-2xl px-4 py-2 text-lg font-semibold flex items-center gap-2 transition duration-300 ease-in-out
              ${
                isDisabled
                  ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
                  : "bg-white border-indigo-300 shadow-lg text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
              }`}
            onClick={() => handleLibClick(label)}
            disabled={isDisabled}
          >
            <span className="text-sm">+</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
