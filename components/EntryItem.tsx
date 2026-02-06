import { useState, memo } from "react";
import { Entry } from "../types";

type Props = {
  entry: Entry;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

function EntryItem({ entry, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(entry.text);

  const handleSave = () => {
    onEdit(entry.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(entry.text);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition">
  {isEditing ? (
    <>
      <textarea
	  	onKeyDown={(e) => {
		  if (e.key === "Escape") {
			setIsEditing(false);
			setEditText(entry.text);
		  }
		}}
        value={editText}
        onChange={e => setEditText(e.target.value)}
        className="w-full border rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        rows={3}
      />
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="mb-2">{entry.text}</div>
      {entry.tags.length > 0 && (
        <div className="text-sm text-gray-500 mb-2">
          {entry.tags.map(tag => `#${tag}`).join(" ")}
        </div>
      )}
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => onDelete(entry.id)}
        >
          Delete
        </button>
      </div>
    </>
  )}
</div>
  );
}

export default memo(EntryItem);