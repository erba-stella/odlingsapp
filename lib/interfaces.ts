export interface PlantData {
  id: string;
  name_sv: string;
  name_latin: string;
  alias: string[];
  category: string;
  start_seeds_indoors?: { min: number; max: number };
  plant_seedlings_outdors?: { min: number; max: number };
  start_seeds_outdoors?: { min: number; max: number };
}

export interface CustomPlant {
  id: string;
  name_sv: string;
  name_latin: string;
  created: string;
  alias?: string[];
  category?: string;
};