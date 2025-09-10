export function softClamp(y: number, min: number, max: number, strength = 0.2) {
  if (y < min) return min + (y - min) * strength;
  if (y > max) return max + (y - max) * strength;
  return y;
}