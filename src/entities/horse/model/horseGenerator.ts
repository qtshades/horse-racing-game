import type { Horse } from '../types'

export function generateHorses(count = 20): Horse[] {
  const safeCount = clamp(count, 1, 20);

  return Array.from({ length: safeCount }, (_, i) => horseFactoryMethod(i, safeCount));
}

function horseFactoryMethod(index: number, total: number): Horse {
  return {
    id: generateUID(),
    name: `Horse ${index + 1}`,
    color: getDistinctHorseColor(index, total),
    condition: randomInt(1, 100),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUID(prefix = 'horse'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function getDistinctHorseColor(index: number, total: number): string {
  const hue = Math.round((index * 360) / total) % 360;
  const lightness = 45 + (index % 5) * 2;
  return `hsl(${hue} 65% ${lightness}%)`;
}
