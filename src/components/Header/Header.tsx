"use client";

import {  Trash2 } from "lucide-react";
import { useComponentStore } from "@/stores/componentStore";
import ImportExportControls from "../ImportExportControls/ImportExportControls";


export default function Header() {
  const resetComponents = useComponentStore((state) => state.resetComponents);

  const handleReset = () => {
    const confirmed = window.confirm("Are you sure you want to delete all components?");
    if (confirmed) {
      resetComponents();
    }
  };

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
          🌐 WebBuilder
        </h1>

        <div className="flex space-x-4">
          <ImportExportControls />

        </div>
      </div>
    </header>
  );
}
