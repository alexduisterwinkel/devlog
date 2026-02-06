'use client';

import { useState } from "react";

type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
  sortOrder: "newest" | "oldest";
  toggleSort: () => void;
};

export default function SearchBar({
  search,
  setSearch,
  sortOrder,
  toggleSort,
}: SearchBarProps) {
	const [isOpen, setIsOpen] = useState(false);
	
    return (
     <div className="bg-white dark:bg-gray-800 flex gap-2 mb-4">
      <input
        placeholder="Search entries..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="flex-1 border rounded p-2 bg-white dark:bg-gray-800 dark:text-white"
      />

      <button
        onClick={toggleSort}
        className="px-3 py-2 border rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
      >
        {sortOrder === "newest" ? "Newest" : "Oldest"}
      </button>
    </div>
  );
}
