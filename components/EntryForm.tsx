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
      className="mb-6 space-y-3 p-4 bg-white shadow rounded-lg"
    >
      <textarea
        name="text"
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
		rows={3}
		placeholder="What did you work on today?"
      />

      <input
        name="tags"
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
		placeholder="Tags (comma separated)"
      />

      <button 
		type="submit"
		className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
			Add Entry
	  </button>
    </form>
  );
}
