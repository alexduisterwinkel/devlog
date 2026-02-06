type Props = {
  onSubmit: (form: FormData) => void;
};

export default function EntryForm({ onSubmit }: Props) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(new FormData(e.currentTarget));
        e.currentTarget.reset();
      }}
      className="mb-4 space-y-2"
    >
      <textarea
        name="text"
        className="w-full border p-2 rounded"
        rows={3}
      />

      <input
        name="tags"
        className="w-full border p-2 rounded"
      />

      <button type="submit">Add Entry</button>
    </form>
  );
}
