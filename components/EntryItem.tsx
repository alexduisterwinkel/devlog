import { Entry } from "../types";

type Props = {
  entry: Entry;
  onDelete: (id: string) => void;
};

export default function EntryItem({ entry, onDelete }: Props) {
  return (
    <div className="border p-2 rounded">
      <div>{entry.text}</div>

      {entry.tags.length > 0 && (
        <div className="text-sm text-gray-500">
          {entry.tags.map(tag => `#${tag}`).join(" ")}
        </div>
      )}

      <button onClick={() => onDelete(entry.id)}>
        Delete
      </button>
    </div>
  );
}

