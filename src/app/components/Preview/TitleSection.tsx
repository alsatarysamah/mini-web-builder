"use client";

import { useState } from "react";

export default function TitleSection() {
  const [text, setText] = useState("");

  const placeholder = "Your Title";

  return (
    <div className="mb-4">
      <div className="relative">
        <div className="absolute inset-0 rounded-lg border border-gray-300 bg-gray-50 shadow-sm pointer-events-none" />

        <input
          type="text"
          className="relative z-10 w-full text-base font-medium text-gray-700 bg-transparent px-4 py-3 placeholder-gray-400 outline-none"
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
}
