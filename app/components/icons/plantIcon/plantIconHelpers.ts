import { plantIcons, type PlantIconType } from ".";

const validIcons = new Set<string>(plantIcons);

/* Checks if a string is a valid icon */
export function isPlantIconType(value: string): value is PlantIconType {
  return validIcons.has(value);
}

/* Returns a valid icon or fallback */
export function getValidPlantIcon(
  value: string | undefined,
  fallback: PlantIconType = "seedling"
): PlantIconType {
  return value && isPlantIconType(value) ? value : fallback;
}

/* Filters a list of strings from JSON to only valid icons */
export function filterValidPlantIcons(values: string[]): PlantIconType[] {
  return values.filter(isPlantIconType);
}