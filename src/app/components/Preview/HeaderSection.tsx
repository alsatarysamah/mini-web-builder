import { useComponentStore } from "@/stores/componentStore";

type Props = {
  id: string;
  selected: boolean;
  onSelect: () => void;
};

export default function HeaderSection({ id, selected, onSelect }: Props) {
  const component = useComponentStore((state) =>
    state.components.find((c) => c.id === id)
  );
  const update = useComponentStore((state) => state.updateComponentContent);

  if (!component) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      tabIndex={0}
      className={`relative mb-4 p-4 border rounded-lg bg-indigo-50 cursor-pointer ${
        selected
          ? "border-indigo-600 ring-2 ring-indigo-400"
          : "border-indigo-300"
      }`}
    >
      <input
        value={component.content}
        onChange={(e) => update(id, e.target.value)}
        placeholder="Your Header Here"
        className="w-full text-4xl font-extrabold text-indigo-700 bg-transparent outline-none"
      />
    </div>
  );
}
