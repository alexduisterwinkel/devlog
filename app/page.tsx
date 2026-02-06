'use client';

import { useState, useEffect } from 'react';
import { Entry } from '../types';

import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import TagFilter from "../components/TagFilter";


export default function Home() {
	const [entries, setEntries] = useState<Entry[]>([]);
	const [text, setText] = useState('');
	const [tags, setTags] = useState('');
	const [activeTag, setActiveTag] = useState<string | null>(null);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editText, setEditText] = useState('');

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
	
	const deleteEntry = (id: string) => {
	  setEntries(prev => prev.filter(e => e.id !== id));
	};

	const addEntry = (formData: FormData) => {
    const textValue = formData.get('text') as string;
    const tagsValue = formData.get('tags') as string;

    const newEntry: Entry = {
	  id: crypto.randomUUID(),
	  date: new Date().toISOString().split('T')[0],
	  text: textValue,
	  tags: tagsValue.split(',').map(t => t.trim()).filter(Boolean),
	};

	setEntries(prev => [newEntry, ...prev]);
	};
	
	const editEntry = (id: string, newText: string) => {
	  setEntries(prev =>
		prev.map(e => (e.id === id ? { ...e, text: newText } : e))
	  );
	};

	return (
    	<main className="p-4">
      	<h1 className="text-2xl font-bold mb-4">Dev Log</h1>

		<EntryForm onSubmit={addEntry} />

		<TagFilter
			tags={allTags}
			activeTag={activeTag}
			setActiveTag={setActiveTag}
		  />
			
		<EntryList
			entries={entries.filter(
			  entry => !activeTag || entry.tags.includes(activeTag)
			)}
			onDelete={deleteEntry}
			onEdit={editEntry}
		  />
    </main>
  );
}
