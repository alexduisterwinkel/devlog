
'use client';

import { useEffect, useState } from "react";
import { Entry } from "../types";

export function useEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] =
    useState<"newest" | "oldest">("newest");
  const [darkMode, setDarkMode] = useState(false);

  // load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("entries");
    if (stored) setEntries(JSON.parse(stored));
	// Load dark mode preference from localStorage
    const storedDark = localStorage.getItem("darkMode");
  	if (storedDark) setDarkMode(storedDark === "true");
  }, []);

  // persist
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

  const addEntry = (formData: FormData) => {
    const textValue = formData.get("text") as string;
    const tagsValue = formData.get("tags") as string;

    const newEntry: Entry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
      text: textValue,
      tags: tagsValue
        .split(",")
        .map(t => t.trim())
        .filter(Boolean),
    };

    setEntries(prev => [newEntry, ...prev]);
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const editEntry = (id: string, newText: string) => {
    setEntries(prev =>
      prev.map(e =>
        e.id === id ? { ...e, text: newText } : e
      )
    );
  };

  const toggleSort = () => {
    setSortOrder(prev =>
      prev === "newest" ? "oldest" : "newest"
    );
  };

  const visibleEntries = entries
    .filter(entry =>
      (!activeTag || entry.tags.includes(activeTag)) &&
      entry.text.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date)
    );

  const allTags = Array.from(
    new Set(entries.flatMap(e => e.tags))
  );

  return {
    entries,
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
  };
}