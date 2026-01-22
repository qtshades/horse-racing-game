export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export const clamp01 = (value: number) => clamp(value, 0, 1);
