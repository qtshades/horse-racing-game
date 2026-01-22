export type Round = {
  round: number
  distance: number
  horses: string[]
};

export type Standing = {
  horseId: string
  position?: number | null
  time?: number | null
};

export type RoundResult = {
  round: number
  standings: Standing[]
};
