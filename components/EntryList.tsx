import EntryItem from "./EntryItem";
import { Entry } from "../types";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  entries: Entry[];
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function EntryList({ entries, onDelete, onEdit }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white space-y-4">
      <AnimatePresence>
		  {entries.map(entry => (
			<motion.div
			  key={entry.id}
			  initial={{ opacity: 0, y: 10 }}
			  animate={{ opacity: 1, y: 0 }}
			  exit={{ opacity: 0, y: -10 }}
			  layout
			  transition={{ duration: 0.15 }}
			>
			  <EntryItem
				entry={entry}
				onDelete={onDelete}
				onEdit={onEdit}
			  />
			</motion.div>
		  ))}
		</AnimatePresence>
    </div>
  );
}