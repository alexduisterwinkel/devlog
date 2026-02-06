type Props = {
  tags: string[];
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
};

export default function TagFilter({
  tags,
  activeTag,
  setActiveTag,
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 mb-6 flex flex-wrap gap-2">
	  <button
		onClick={() => setActiveTag(null)}
		className={`px-3 py-1 rounded-full ${
		  activeTag === null
			? "bg-blue-500 text-white"
			: "bg-gray-200 text-gray-700 hover:bg-gray-300"
		}`}
	  >
		All
	  </button>

	  {tags.map(tag => (
		<button
		  key={tag}
		  onClick={() => setActiveTag(tag)}
		  className={`px-3 py-1 rounded-full ${
			activeTag === tag
			  ? "bg-blue-500 text-white"
			  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
		  }`}
		>
		  #{tag}
		</button>
	  ))}
	</div>
  );
}
