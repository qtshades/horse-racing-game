import type { Round, Standing } from '@/entities/race';
import type { Horse } from '@/entities/horse';

export function simulateRound(round: Round, horses: Horse[]): Standing[] {
  const horsesById = indexHorsesById(horses);
  const participantHorses = resolveParticipants(round.horses, horsesById);

  const rawStandings = participantHorses.map((horse) => ({
    horseId: horse.id,
    time: calculateFinishTimeMs(round.distance, horse.condition),
  }));

  const sortedByTime = rawStandings.sort((a, b) => a.time - b.time);

  return sortedByTime.map((entry, idx) => ({
    ...entry,
    position: idx + 1,
  }));
}

function indexHorsesById(horses: Horse[]): Map<string, Horse> {
  return new Map(horses.map((horse) => [horse.id, horse] as const));
}

function resolveParticipants(
  participantIds: readonly string[],
  horsesById: Map<string, Horse>
): Horse[] {
  return participantIds
    .map((horseId) => horsesById.get(horseId))
    .filter((horse): horse is Horse => horse != null);
}

function calculateFinishTimeMs(distanceMeters: number, conditionScore: number): number {
  const clampedCondition = clamp(conditionScore, 1, 100);
  const relativePaceFactor = 100 / clampedCondition;
  return Math.round(distanceMeters * relativePaceFactor);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
