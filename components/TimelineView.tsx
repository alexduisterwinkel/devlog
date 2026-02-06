'use client';

import { Entry } from "../types";

type TimelineViewProps = {
  entries: Entry[];
};

export default function TimelineView({ entries }: TimelineViewProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        No entries to show on the timeline.
      </div>
    );
  }

  // Group entries by date
  const grouped: Record<string, Entry[]> = {};
  entries.forEach(entry => {
    if (!grouped[entry.date]) grouped[entry.date] = [];
    grouped[entry.date].push(entry);
  });

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white space-y-6">
      {sortedDates.map(date => (
        <div key={date}>
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">{date}</h3>
          <ul className="space-y-1">
            {grouped[date].map(entry => (
              <li
                key={entry.id}
                className="p-4 p-2 rounded bg-gray-100 dark:bg-gray-600 transition hover:bg-gray-200 dark:hover:bg-gray-500 border border-gray-300 rounded-md dark:border-gray-700 dark:rounded-xl "
              >
                {entry.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
