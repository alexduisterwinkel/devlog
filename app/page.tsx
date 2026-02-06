'use client';

import { useState, useEffect } from 'react';
import { Entry } from '../types';

import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import TagFilter from "../components/TagFilter";
import SearchBar from "../components/SearchBar";
import { useEntries } from "../hooks/useEntries";
import './globals.css';


export default function Home() {
	  const {
		visibleEntries,
		allTags,
		activeTag,
		setActiveTag,
		search,
		setSearch,
		sortOrder,
		toggleSort,
		addEntry,
		deleteEntry,
		editEntry,
		darkMode,
		setDarkMode
	  } = useEntries();

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

			<SearchBar
			  search={search}
			  setSearch={setSearch}
			  sortOrder={sortOrder}
			  toggleSort={toggleSort}
			/>
				  
			<TagFilter
				tags={allTags}
				activeTag={activeTag}
				setActiveTag={setActiveTag}
			  />

			<EntryList
  				entries={visibleEntries}
				onDelete={deleteEntry}
				onEdit={editEntry}
			  />
		</main>
  );
}
