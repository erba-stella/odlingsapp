import { type SVGProps } from "react";

export type PlantIconType =
  | "beet"
  | "broccoli"
  | "cabbage"
  | "carrot"
  | "cauliflower"
  | "chili"
  | "corn"
  | "cucumber"
  | "cucumbers"
  | "dill"
  | "eggplant"
  | "herb"
  | "melon"
  | "onion"
  | "paprika"
  | "pak-choi"
  | "peas"
  | "potato"
  | "radish"
  | "salad"
  | "seedling"
  | "squash"
  | "tomato"
  | "turnip"
  | "leafy-green";

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