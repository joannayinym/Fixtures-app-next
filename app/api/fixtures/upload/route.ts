import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "@/lib/mongodb";
import Fixture from "@/models/Fixture";
import csv from "csv-parser";
import { Readable } from "stream";
import { FixtureType } from "@/app/types/FixtureTypes";

function streamFromBuffer(buffer: Buffer) {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const readable = streamFromBuffer(buffer);

    await getDBConnection();

    const results: FixtureType[] = [];
    const temp: FixtureType[] = [];

    await new Promise<void>((resolve, reject) => {
      readable
        .pipe(csv())
        .on("data", (row) => {
          temp.push({
            fixtureMid: row.fixture_mid,
            season: row.season,
            competitionName: row.competition_name,
            fixtureDatetime: row.fixture_datetime,
            fixtureRound: row.fixture_round,
            homeTeam: row.home_team,
            awayTeam: row.away_team,
          });
        })
        .on("end", async () => {
          for (const item of temp) {
            const exists = await Fixture.exists({
              fixtureMid: item.fixtureMid,
            });
            if (!exists) {
              results.push(item);
            }
          }

          if (results.length > 0) {
            await Fixture.insertMany(results);
          }
          resolve();
        })
        .on("error", reject);
    });

    return NextResponse.json(
      {
        message: "File uploaded successfully",
        count: results.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
