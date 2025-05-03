import mongoose from "mongoose";

const FixtureSchema = new mongoose.Schema(
  {
    fixtureMid: { type: String, required: true, unique: true },
    season: String,
    competitionName: String,
    fixtureDatetime: String,
    fixtureRound: String,
    homeTeam: String,
    awayTeam: String,
  },
  {
    strict: true,
  }
);

const Fixture =
  mongoose.models.Fixture || mongoose.model("Fixture", FixtureSchema);

export default Fixture;
