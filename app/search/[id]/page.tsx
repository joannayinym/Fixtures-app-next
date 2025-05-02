import { FixtureType } from "@/app/types/FixtureTypes";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";

async function getFixture(id: string): Promise<FixtureType | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/fixtures/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default async function FixtureDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const fixture = await getFixture(id);

  if (!fixture) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed p-4">
      <div className="pb-6 text-black font-bold">
        <Link
          href={"/"}
          className="underline text-black hover:text-blue-800 mr-6"
        >
          Home
        </Link>
        <Link
          href={"/search"}
          className="underline text-black hover:text-blue-800"
        >
          Back to Search
        </Link>
      </div>
      <h1 className="text-xl font-bold mb-2 text-black">Fixture Details</h1>

      <table className="table-auto border border-gray-300 text-left text-black mb-4">
        <tbody>
          <tr>
            <th className="px-4 py-2 font-bold border border-gray-300">
              Season
            </th>
            <td className="px-4 py-2 border border-gray-300">
              {fixture.season}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 font-bold border border-gray-300">
              Competition Name
            </th>
            <td className="px-4 py-2 border border-gray-300">
              {fixture.competitionName}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 font-bold border border-gray-300">
              Fixture Datetime
            </th>
            <td className="px-4 py-2 border border-gray-300">
              {fixture.fixtureDatetime &&
                dayjs(fixture.fixtureDatetime).format("YYYY-MM-DD HH:mm:ss")}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 font-bold border border-gray-300">
              Fixture Round
            </th>
            <td className="px-4 py-2 border border-gray-300">
              {fixture.fixtureRound}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 font-bold border border-gray-300">
              Home Team
            </th>
            <td className="px-4 py-2 border border-gray-300">
              {fixture.homeTeam}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 font-bold border border-gray-300">
              Away Team
            </th>
            <td className="px-4 py-2 border border-gray-300">
              {fixture.awayTeam}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
