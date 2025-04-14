"use server";

import { PlantData } from "@/lib/interfaces";
import { BASE_URL, API_PLANTS, API_PLANT_CATEGORIES } from "./endpoints"

const fetchData = async (endpoint: string, query: string) => {
  const res = await fetch(`${BASE_URL}${endpoint}${query}`);
  if (!res.ok) {
    throw new Error(`Error HTTP status ${res.status}: ${res.statusText}`);
  }
  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error(`Invalid data format received`);
  }
  return data;
};

export const fetchPlantData = async (
  query=''
): Promise<PlantData[]> => {
  return await fetchData(API_PLANTS, query);
};

export const fetchPlantCategoryData = async (
  query=''
): Promise<string[]> => {
  return await fetchData(API_PLANT_CATEGORIES, query);
};