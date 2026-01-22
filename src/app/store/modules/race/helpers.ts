import type { Round, RoundResult, Standing } from '@/entities/race';
import type { RaceState } from '@/app/store/modules/race/types';
import type { Horse } from '@/entities/horse';
import computeDuration from '@/shared/model/computeDuration';

export function makeRoundPlaceholders(round: Round): RoundResult {
  return {
    round: round.round,
    standings: round.horses.map((horseId) => ({ horseId, position: null, time: null })),
  };
}

export function makeAllPlaceholders(schedule: Round[]): RoundResult[] {
  return schedule.map(makeRoundPlaceholders);
}

export function updateResultInPlace(results: RoundResult[], payload: RoundResult) {
  const idx = results.findIndex((r) => r.round === payload.round);
  if (idx !== -1) results[idx] = payload;
  else results.push(payload);
}

export function getRoundByIndex(state: RaceState, index: number): Round | null {
  return state.schedule[index] ?? null;
}

export function roundMaxDuration(round: Round, state: RaceState): number {
  const durations = round.horses
    .map((id) => getHorseById(state, id))
    .filter((h): h is Horse => h != null)
    .map((h) => computeDuration(round.distance, h.condition));

  return durations.length ? Math.max(...durations) : 1000;
}

export function withPositions(standings: Standing[]): Standing[] {
  return standings.map((s, i) => ({ ...s, position: s.position ?? i + 1 }));
}

function getHorseById(state: RaceState, id: string): Horse | null {
  return state.horses.find((h) => h.id === id) ?? null;
}
