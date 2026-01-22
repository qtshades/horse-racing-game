import type { Horse } from '../types';
import shuffleInPlace from '@/shared/model/shuffleInPlace';
import { clamp } from '@/shared/lib/clamp';

export const HORSES_NAMES_POOL = [
  'Thunder','Storm','Shadow','Blaze','Spirit','Comet','Midnight','Starfire','Pegasus','Apollo',
  'Eclipse','Silver','Goldie','Majesty','Prince','Duchess','Ranger','Arrow','Atlas','Bolt',
  'Hurricane','Zephyr','Nimbus','Aurora','Ember','Flint','Mustang','Yukon','Sundance','Whisper',
  'Valor','Noble','Sable','Raven','Copper','Cinnamon','Brindle','Oakley','Swift','Timber',
  'Raider','Mirage','Sterling','Onyx','Celeste','Legend','Victory','Falcon','Seraph','Breeze',
];

export function generateHorses(count = 20): Horse[] {
  const safeCount = clamp(count, 1, 20);

  const names = getRandomNames(safeCount);

  return Array.from({ length: safeCount }, (_, i) => horseFactoryMethod(i, safeCount, names[i]));
}

function horseFactoryMethod(index: number, total: number, name: string): Horse {
  return {
    id: generateUID(),
    name,
    color: getDistinctHorseColor(index, total),
    condition: randomInt(1, 100),
  };
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

function getRandomNames(count: number): string[] {
  const available = [...HORSES_NAMES_POOL];
  shuffleInPlace(available);

  return Array.from({ length: count }, (_, i) => available[i % available.length]);
}
