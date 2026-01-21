import { describe, it, expect } from 'vitest';
import { useHorses } from '../../src/entities/horse';

describe('useHorses', () => {
  it('initializes with the requested count', () => {
    const { horses } = useHorses(5);
    expect(horses.value).toHaveLength(5);
  });

  it('generate replaces horses array with new count', () => {
    const { horses, generate } = useHorses(3);
    expect(horses.value).toHaveLength(3);
    generate(7);
    expect(horses.value).toHaveLength(7);
  });

  it('findById returns the correct horse or undefined', () => {
    const { horses, findById } = useHorses(4);
    const first = horses.value[0];
    expect(findById(first.id)).toEqual(first);
    expect(findById('non-existent-id')).toBeUndefined();
  });
});
