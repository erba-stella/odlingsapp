// import { PlantIconType } from "@/app/(subpages)/components/icons/plantIcons"

export interface PlantData {
  id: string;
  name_sv: string;
  name_latin: string;
  alias: string[];
  icon_name?: string;
  tags: string[];
  start_seeds_indoors?: { min: number; max: number };
  plant_seedlings_outdors?: { min: number; max: number };
  start_seeds_outdoors?: { min: number; max: number };
}

export interface CustomPlant {
  id: string;
  created: string;
  name: string;
  categoryId: string;
}

export interface CustomPlantExtended extends CustomPlant {
  categoryData: PlantData;
}