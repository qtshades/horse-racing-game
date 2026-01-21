import type { Horse } from '@/entities/horse/types';
import { HORSES_PER_ROUND } from '@/entities/race';
import type { Round } from '@/entities/race';

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

function shuffleInPlace<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0
    ;[arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

