export type Round = {
  round: number
  distance: number
  horses: string[]
};

export type Standing = {
  horseId: string
  position: number
  time: number
};

export type RoundResult = {
  round: number
  standings: Standing[]
};
