import { useState } from "react";
import { Entry } from "../types";

type Props = {
  entry: Entry;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function EntryItem({ entry, onDelete, onEdit }: Props) {
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
    <div className="border p-2 rounded">
      {isEditing ? (
        <>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full border p-1 rounded mb-2"
            rows={3}
          />
          <button
            className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-2 py-1 bg-gray-400 text-white rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div>{entry.text}</div>
          {entry.tags.length > 0 && (
            <div className="text-sm text-gray-500">
              {entry.tags.map((tag) => `#${tag}`).join(" ")}
            </div>
          )}
          <button
            className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded"
            onClick={() => onDelete(entry.id)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}