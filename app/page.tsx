'use client';

import { useState, useEffect } from 'react';
import { Entry } from '../types';

export default function Home() {
	const [entries, setEntries] = useState<Entry[]>([]);
	const [text, setText] = useState('');
	const [tags, setTags] = useState('');
	const [activeTag, setActiveTag] = useState<string | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
    	e.preventDefault();
		console.log("submit fired")
    	const newEntry: Entry = {
    		id: crypto.randomUUID(),
    		date: new Date().toISOString().split('T')[0],
    		text,
    		tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    	};

		console.log(entries);
		setEntries([newEntry, ...entries]);
		setText('');
		setTags('');
  	};
	
	useEffect(() => {
	  const stored = localStorage.getItem("entries");
	  if (stored) {
		setEntries(JSON.parse(stored));
	  }
	}, []);

	useEffect(() => {
	  localStorage.setItem("entries", JSON.stringify(entries));
	}, [entries]);

	const allTags = Array.from(
	  new Set(entries.flatMap(entry => entry.tags))
	);

	return (
    	<main className="p-4">
      	<h1 className="text-2xl font-bold mb-4">Dev Log</h1>

      	<form onSubmit={handleSubmit} className="mb-4 space-y-2">
        	<textarea
          	value={text}
          	onChange={e => setText(e.target.value)}
          	className="w-full border p-2 rounded"
          	rows={3}
        />

        	<input
          		value={tags}
          		onChange={e => setTags(e.target.value)}
          		className="w-full border p-2 rounded"
        	/>

        	<button type="submit">
          		Add Entry
        	</button>
      	</form>

		<div className="mb-4 space-x-2">
		  <button onClick={() => setActiveTag(null)}>
			All
		  </button>

		  {allTags.map(tag => (
			<button key={tag} onClick={() => setActiveTag(tag)}>
			  #{tag}
			</button>
		  ))}
		</div>
		
      	<div>
			{entries
			  .filter(entry =>
				!activeTag || entry.tags.includes(activeTag)
			  )
			  .map(entry => (
				<div key={entry.id}>{entry.text}</div>
			  ))}
		</div>
    </main>
  );
}
