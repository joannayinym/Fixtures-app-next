import { NextResponse } from "next/server";
import { getDBConnection } from "@/lib/mongodb";
import Fixture from "@/models/Fixture";
import { FixtureType } from "@/app/types/FixtureTypes";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  try {
    await getDBConnection();
    const fixtures = await Fixture.find<FixtureType>({
      $or: [
        { homeTeam: { $regex: query, $options: "i" } },
        { awayTeam: { $regex: query, $options: "i" } },
      ],
    });

    return NextResponse.json(fixtures);
  } catch (error) {
    throw new Error("Error searching fixtures: " + error);
  }
}
