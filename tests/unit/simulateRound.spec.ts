import { describe, it, expect } from 'vitest';
import { simulateRound } from '@/entities/race';

const horses = Array.from({ length: 5 }, (_, i) => ({ id: `h${i + 1}`, name: `Horse ${i + 1}`, color: 'hsl(0 0% 0%)', condition: 50 + i * 10 }));

const round = { round: 1, distance: 1200, horses: horses.map(h => h.id) };

describe('simulateRound', () => {
  it('returns standings for participants sorted by time', () => {
    const standings = simulateRound(round, horses);

    expect(standings.length).toBe(5);

    for (let i = 1; i < standings.length; i++) {
      const currTime = standings[i].time;
      const prevTime = standings[i - 1].time;

      expect(currTime).toBeDefined();
      expect(currTime).not.toBeNull();
      expect(prevTime).toBeDefined();
      expect(prevTime).not.toBeNull();

      expect(currTime!).toBeGreaterThanOrEqual(prevTime!);
    }
  });

  it('uses horse condition to influence times', () => {
    const s = simulateRound(round, horses);
    const fastest = s[0];
    const fastestHorse = horses.find(h => h.id === fastest.horseId)!;
    expect(fastestHorse.condition).toBe(Math.max(...horses.map(h => h.condition)));
  });
});
