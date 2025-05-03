"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FixtureOutput } from "../types/FixtureTypes";
import dayjs from "dayjs";
import HomeLink from "../components/HomeLink";
import LayoutBackgroundLiner from "../components/LayoutBackgroundLiner";

export default function SearchPage() {
  const [query, setQuery] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const [results, setResults] = useState<FixtureOutput[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setSearching(false);
      setResults([]);
      return;
    }

    setSearching(true);

    let timer: NodeJS.Timeout | null = null;
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fetch(`/api/fixtures/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setSearching(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 300);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [query]);

  return (
    <LayoutBackgroundLiner>
      <HomeLink showSearch={false} />
      <h1 className="text-xl font-bold mb-2 text-black">
        Please Input Search Keywords:
      </h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Please enter a keyword to search..."
        className="border p-2 w-full mb-4 text-black max-w-[600px] rounded-md"
      />
      {searching && query && <p className="text-black">Searching...</p>}
      {!searching && results.length === 0 && query && (
        <p className="text-red-500">No results found.</p>
      )}
      {!searching && results.length > 0 && (
        <table className="w-full text-left text-black border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-4 text-sm md:text-base">Date</th>
              <th className="py-2 px-4 text-sm md:text-base">
                Competition Name
              </th>
              <th className="py-2 px-4 text-sm md:text-base">Round</th>
              <th className="py-2 px-4 text-sm md:text-base">
                Teams (Home vs Away)
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {results.map((fixture) => (
              <tr key={fixture._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 text-sm md:text-base">
                  {fixture.fixtureDatetime
                    ? dayjs(fixture.fixtureDatetime).format("YYYY-MM-DD")
                    : ""}
                </td>
                <td className="py-2 px-4 text-sm md:text-base">
                  {fixture.competitionName}
                </td>
                <td className="py-2 px-4 text-sm md:text-base">
                  {fixture.fixtureRound}
                </td>
                <td className="py-2 px-4 text-sm md:text-base">
                  <Link href={`/search/${fixture._id}`}>
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {fixture.homeTeam} vs {fixture.awayTeam}
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </LayoutBackgroundLiner>
  );
}
