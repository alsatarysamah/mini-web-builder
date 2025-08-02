import { FolderDown, FolderUp } from "lucide-react";
export default function Header() {
  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
          🌐 WebBuilder
        </h1>

        <div className="flex space-x-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-100 transition shadow-sm">
            <FolderDown className="w-5 h-5" />
            <span className="font-medium">Import</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 border border-green-100 rounded-xl hover:bg-green-100 transition shadow-sm">
            <FolderUp className="w-5 h-5" />
            <span className="font-medium">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
}
