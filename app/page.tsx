'use client';

import { useState, useEffect } from 'react';
import { Entry } from '../types';

import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import TagFilter from "../components/TagFilter";
import SearchBar from "../components/SearchBar";
import './globals.css';


export default function Home() {
	const [entries, setEntries] = useState<Entry[]>([]);
	const [text, setText] = useState('');
	const [tags, setTags] = useState('');
	const [activeTag, setActiveTag] = useState<string | null>(null);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editText, setEditText] = useState('');
	const [darkMode, setDarkMode] = useState(false);
	const [search, setSearch] = useState("");
	const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

	useEffect(() => {
		const stored = localStorage.getItem("entries");
		if (stored) {
			setEntries(JSON.parse(stored));
	  	}
		// Load dark mode preference from localStorage
		const storedDark = localStorage.getItem("darkMode");
		if (storedDark) setDarkMode(storedDark === "true");
	}, []);

	useEffect(() => {
	  	localStorage.setItem("entries", JSON.stringify(entries));
	}, [entries]);
	
	useEffect(() => {
		localStorage.setItem("darkMode", darkMode.toString());
		if (darkMode) {
		  document.documentElement.classList.add("dark");
		} else {
		  document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);
	
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

	const visibleEntries = entries
	  .filter(entry =>
		(!activeTag || entry.tags.includes(activeTag)) &&
		entry.text.toLowerCase().includes(search.toLowerCase())
	  )
	  .sort((a, b) => {
		if (sortOrder === "newest") {
		  return b.date.localeCompare(a.date);
		}
		return a.date.localeCompare(b.date);
	  });

	const toggleSort = () => {
	  setSortOrder(prev =>
		prev === "newest" ? "oldest" : "newest"
	  );
	};

	return (
    	<main className="bg-white dark:bg-gray-800 p-6 max-w-3xl mx-auto bg-gray-50 min-h-screen">
			<h1 className="bg-white dark:bg-gray-800 text-4xl font-extrabold mb-6 text-center text-gray-800 dark:text-white">
				Dev Log
			</h1>
			<button
			  className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
			  onClick={() => setDarkMode(prev => !prev)}
			>
			  {darkMode ? "Light Mode" : "Dark Mode"}
			</button>
			<EntryForm onSubmit={addEntry} />

			<TagFilter
				tags={allTags}
				activeTag={activeTag}
				setActiveTag={setActiveTag}
			  />

			<SearchBar
			  search={search}
			  setSearch={setSearch}
			  sortOrder={sortOrder}
			  toggleSort={toggleSort}
			/>

			<EntryList
  				entries={visibleEntries}
				onDelete={deleteEntry}
				onEdit={editEntry}
			  />
		</main>
  );
}
