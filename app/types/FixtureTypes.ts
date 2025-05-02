export type FixtureType = {
  fixtureMid: string;
  season: string;
  competitionName: string;
  fixtureDatetime: Date;
  fixtureRound: number;
  homeTeam: string;
  awayTeam: string;
};

export type FixtureOutput = {
  _id: string;
} & FixtureType;
