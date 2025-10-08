import { type SVGProps } from "react";

export const plantIcons = [
  "beet",
  "broccoli",
  "cabbage",
  "carrot",
  "cauliflower",
  "chili",
  "corn",
  "cucumber",
  "cucumbers",
  "dill",
  "eggplant",
  "herb",
  "leek",
  "melon",
  "onion",
  "paprika",
  "pak-choi",
  "peas",
  "potato",
  "radish",
  "salad",
  "seedling",
  "squash",
  "tomato",
  "turnip",
  "leafy-green",
] as const;

export type PlantIconType = (typeof plantIcons)[number];

interface PlantIconProps extends SVGProps<SVGSVGElement> {
  type?: string; 
}

const spriteURL = "./icons/plants/sprite.svg#icon_";
const FALLBACK_ICON: PlantIconType = "seedling";

const validIcons = new Set<string>(plantIcons);

function isPlantIconType(value: string): value is PlantIconType {
  return validIcons.has(value);
}

export const PlantIcon = ({ type, ...props }: PlantIconProps) => {
  const icon: PlantIconType =
    type && isPlantIconType(type) ? type : FALLBACK_ICON;
  
  return (
    <svg {...props}>
      <use href={`${spriteURL}${icon}`} />
    </svg>
  );
};