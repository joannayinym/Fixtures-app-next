import { NextRequest } from "next/server";
import Fixture from "@/models/Fixture";
import { getDBConnection } from "@/lib/mongodb";
import { FixtureType } from "@/app/types/FixtureTypes";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await getDBConnection();

    const id = (await params).id;
    const fixture = await Fixture.findById<FixtureType>(id);

    if (!fixture) {
      return new Response(JSON.stringify({ error: "Data Not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(fixture), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
