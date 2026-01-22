export default function computeDuration(distance: number, condition: number) {
  const baseMs = distance;
  const conditionFactor = 100 / Math.max(1, condition);
  return Math.max(300, Math.round(baseMs * conditionFactor));
}
