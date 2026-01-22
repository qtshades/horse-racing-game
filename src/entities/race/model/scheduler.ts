import type { Horse } from '@/entities/horse';
import { HORSES_PER_ROUND, type Round } from '@/entities/race';
import shuffleInPlace from '@/shared/model/shuffleInPlace';

export function generateSchedule(horses: Horse[], distances: number[]): Round[] {
  const available = horses.map(h => h.id);

  return distances.map((distance, index) => ({
    round: index + 1,
    distance,
    horses: pickRandomDistinct(available, Math.min(HORSES_PER_ROUND, available.length)),
  }));
}

function pickRandomDistinct<T>(items: readonly T[], count: number): T[] {
  if (count <= 0) return [];
  if (count >= items.length) return [...items];

  const copy = [...items];
  shuffleInPlace(copy);
  return copy.slice(0, count);
}

