import { useState } from "react";
import { Entry } from "../types";
import EntryItem from "./EntryItem";

type Props = {
  entries: Entry[];
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function EntryList({ entries, onDelete, onEdit }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <div key={entry.id} className="border p-2 rounded">
          {editingId === entry.id ? (
            <>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full border p-1 rounded mb-2"
                rows={3}
              />
              <button
                className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
                onClick={() => {
                  onEdit(entry.id, editText);
                  setEditingId(null);
                  setEditText("");
                }}
              >
                Save
              </button>
              <button
                className="px-2 py-1 bg-gray-400 text-white rounded"
                onClick={() => {
                  setEditingId(null);
                  setEditText("");
                }}
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
                onClick={() => {
                  setEditingId(entry.id);
                  setEditText(entry.text);
                }}
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
      ))}
    </div>
  );
}
