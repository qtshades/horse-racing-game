import { describe, it, expect } from 'vitest';
import { generateHorses } from '../../src/entities/horse';

describe('generateHorses', () => {
  it('returns correct count and handles 0', () => {
    expect(generateHorses(0)).toHaveLength(1);
    expect(generateHorses(5)).toHaveLength(5);
  });

  it('produces unique ids and non-empty names', () => {
    const list = generateHorses(10);
    const ids = list.map(h => h.id);
    const idSet = new Set(ids);
    expect(idSet.size).toBe(ids.length);
    list.forEach((h) => {
      expect(typeof h.name).toBe('string');
      expect(h.name.length).toBeGreaterThan(0);
      expect(typeof h.id).toBe('string');
    });
  });

  it('generates hsl color strings and colors are distinct', () => {
    const list = generateHorses(8);
    const colorRegex = /^hsl\(\d+\s+\d+%\s+\d+%\)$/;
    const colors = list.map(h => h.color);
    colors.forEach(c => expect(colorRegex.test(c)).toBe(true));
    const colorSet = new Set(colors);
    expect(colorSet.size).toBe(colors.length);
  });

  it('condition is within 1..100 and integer', () => {
    const list = generateHorses(20);
    list.forEach(h => {
      expect(h.condition).toBeGreaterThanOrEqual(1);
      expect(h.condition).toBeLessThanOrEqual(100);
      expect(Number.isInteger(h.condition)).toBe(true);
    });
  });
});
