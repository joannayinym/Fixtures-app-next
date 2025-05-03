export type FixtureType = {
  fixtureMid: string;
  season: string;
  competitionName: string;
  fixtureDatetime: string;
  fixtureRound: string;
  homeTeam: string;
  awayTeam: string;
};

export type FixtureOutput = {
  _id: string;
} & FixtureType;
