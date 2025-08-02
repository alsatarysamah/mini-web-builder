import { useComponentStore } from "@/stores/componentStore";

type Props = {
  id: string;
  selected: boolean;
  onSelect: () => void;
};

export default function TitleSection({ id, selected, onSelect }: Props) {
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
      className={`relative mb-4 p-4 border rounded-lg bg-gray-50 cursor-pointer items-center ${
        selected ? "border-gray-600 ring-2 ring-gray-400" : "border-gray-300"
      }`}
    >
      <input
        value={component.content}
        onChange={(e) => update(id, e.target.value)}
        placeholder="Your Title Here"
        className="w-full text-2xl font-semibold text-gray-700 bg-transparent outline-none text-center"
        autoFocus
      />
    </div>
  );
}
