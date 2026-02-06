import { useCallback } from "react";
import { Entry } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import EntryItem from "./EntryItem";

type Props = {
  entries: Entry[];
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function EntryList({ entries, onDelete, onEdit, hasEntries }: Props) {
	const handleDelete = useCallback(
	  (id: string) => onDelete(id),
	  [onDelete]
	);

	const handleEdit = useCallback(
	  (id: string, text: string) => onEdit(id, text),
	  [onEdit]
	);
	
	if (entries.length === 0 && hasEntries) {
	  return (
		<div className="text-center py-10 text-gray-500 dark:text-gray-400">
		  No entries match your search or tag filter.
		</div>
	  );
	}
	if (entries.length === 0) {
	return (
		<div className="text-center py-10 text-gray-500 dark:text-gray-400">
		  No entries yet. Add your first dev log.
		</div>
	  );
	}
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
							onDelete={handleDelete}
							onEdit={handleEdit}
			  			/>
					</motion.div>
		  		))}
			</AnimatePresence>
    </div>
  );
}