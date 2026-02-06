import EntryItem from "./EntryItem";
import { Entry } from "../types";

type Props = {
  entries: Entry[];
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function EntryList({ entries, onDelete, onEdit }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white space-y-4">
      {entries.map((entry) => (
        <EntryItem
          key={entry.id}
          entry={entry}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}