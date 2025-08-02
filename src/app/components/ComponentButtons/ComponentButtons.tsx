"use client";

const components = ["Header", "Title", "Paragraph", "Image", "Footer"];

export default function ComponentButtons() {
  return (
    <div className="flex justify-center gap-4 flex-wrap p-3 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      {components.map((label) => (
        <button
          key={label}
          className="bg-white border border-indigo-300 shadow-lg rounded-2xl px-4 py-2 text-indigo-600 font-semibold text-lg hover:bg-indigo-50 hover:text-indigo-800 transition duration-300 ease-in-out flex items-center gap-2"
        >
          <span className="text-sm">+</span>
          {label}
        </button>
      ))}
    </div>
  );
}
