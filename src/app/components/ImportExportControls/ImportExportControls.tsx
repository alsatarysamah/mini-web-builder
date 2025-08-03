"use client";

import { FolderDown, FolderUp } from "lucide-react";
import { useRef } from "react";
import { useComponentStore } from "@/stores/componentStore";

export default function ImportExportControls() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const components = useComponentStore((state) => state.components);
  const setComponents = useComponentStore((state) => state.setComponents);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result as string;
        const parsed = JSON.parse(result);

        console.log("🚀 ~ parsed:", parsed);

        if (Array.isArray(parsed)) {
          setComponents(parsed);
        } else {
          alert("Invalid file format. Expected an array of components.");
        }
      } catch (err) {
        alert("Error reading file. Make sure it's a valid JSON.");
      }

      // ✅ Reset file input after processing
      e.target.value = "";
    };

    reader.readAsText(file);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(components, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "components.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex space-x-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <button
        onClick={handleImportClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-100 transition shadow-sm"
      >
        <FolderDown className="w-5 h-5" />
        <span className="font-medium">Import</span>
      </button>

      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 border border-green-100 rounded-xl hover:bg-green-100 transition shadow-sm"
      >
        <FolderUp className="w-5 h-5" />
        <span className="font-medium">Export</span>
      </button>
    </div>
  );
}
