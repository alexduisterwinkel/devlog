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
    <div className="mb-4 space-x-2">
      <button onClick={() => setActiveTag(null)}>
        All
      </button>

      {tags.map(tag => (
        <button key={tag} onClick={() => setActiveTag(tag)}>
          #{tag}
        </button>
      ))}
    </div>
  );
}
