"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FixtureOutput } from "../types/FixtureTypes";
import dayjs from "dayjs";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FixtureOutput[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    let timer: NodeJS.Timeout | null = null;
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fetch(`/api/fixtures/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => setResults(data));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed p-4">
      <div className="pb-6 text-black">
        <Link href={"/"} className="underline text-black hover:text-blue-800">
          Home
        </Link>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Please enter a keyword to search..."
        className="border p-2 w-full mb-4 text-black max-w-[600px] rounded-md"
      />

      <ul className="list-disc pl-5 text-black overflow-y-auto">
        {results.map((fixture) => (
          <li key={fixture._id} className="mb-2">
            <Link href={`/search/${fixture._id}`}>
              <span className="hover:underline cursor-pointer">
                {fixture.fixtureDatetime &&
                  dayjs(fixture.fixtureDatetime).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}{" "}
                {fixture.homeTeam} vs {fixture.awayTeam}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
