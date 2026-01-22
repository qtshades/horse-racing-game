import { Horse } from '@/entities/horse';
import type { Round, RoundResult } from '@/entities/race';

export type RaceState = {
  horses: Horse[]
  schedule: Round[]
  currentRound: number | null
  results: RoundResult[]
  running: boolean
  runToken: number
};
