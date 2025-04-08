import { type SVGProps } from "react";

export type PlantIconType =
    "beet" | "broccoli" | "cabbage" | "carrot" | "cauliflower" |
    "chili" | "corn" | "cucumber" | "cucumbers" | "dill" |
    "eggplant" | "herb" | "melon" | "onion" | "paprika" |
    "peas" | "radish" | "salad" | "seedling" | "squash" |
    "tomato" | "turnip";

interface PlantIconProps extends SVGProps<SVGSVGElement> {
  plant?: PlantIconType;
}

const spriteURL = './icons/plants/sprite.svg#icon_';

export const PlantIcon = ({ type = "seedling", ...props }: PlantIconProps) => {
  return (
    <svg {...props}>
      <use href={`${spriteURL}${type}`} />
    </svg>
  );
};