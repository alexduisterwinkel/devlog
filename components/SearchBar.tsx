'use client';

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
  return (
    <div className="flex gap-2 mb-4">
      <input
        placeholder="Search entries..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="flex-1 border rounded p-2 bg-white dark:bg-gray-800"
      />

      <button
        onClick={toggleSort}
        className="px-3 py-2 border rounded bg-gray-200 dark:bg-gray-700"
      >
        {sortOrder === "newest" ? "Newest" : "Oldest"}
      </button>
    </div>
  );
}
