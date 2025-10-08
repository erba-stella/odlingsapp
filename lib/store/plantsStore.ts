"use client";
import {
  useLocalStorageCache,
  useSetLocalStorageCache,
} from "@/lib/hooks/useLocalStorageCache";
import { CustomPlant, PlantData } from "@/lib/interfaces";

/* ============================================================
    Constants: localStorage keys and initial values
*/

const PLANTS_KEY = "plants";
const PLANTS_INITIAL: CustomPlant[] = [];
const PLANT_DATA_KEY = "plantData";
const PLANT_DATA_INITIAL: PlantData[] = [];

/* ============================================================
   Util for stable selectors
    - Selector functions should preferably be defined outside the hook,
      to avoid unnecessary rerenders and weirdness
*/

function select<T, S>(fn: (data: T) => S) {
  return fn;
}

/* ============================================================
   HOOK: subscribe to all plants - basic usage
*/

const usePlants = (): CustomPlant[] => {
  return useLocalStorageCache<CustomPlant[], CustomPlant[]>(
    PLANTS_KEY,
    PLANTS_INITIAL
  );
};

/* ============================================================
   HOOK: subscribe to one specific plant
*/

const usePlant = (plantId: string): CustomPlant | undefined => {
  return useLocalStorageCache<CustomPlant[], CustomPlant | undefined>(
    PLANTS_KEY,
    PLANTS_INITIAL,
    {
      selector: select((plants) => plants.find((p) => p.id === plantId)),
      sliceId: `byId:${plantId}`,
    }
  );
};

/* ============================================================
   HOOK: subscribe to all plants in a given category
*/

const usePlantsInCategory = (id: string): CustomPlant[] => {
  return useLocalStorageCache<CustomPlant[], CustomPlant[]>(
    PLANTS_KEY,
    PLANTS_INITIAL,
    {
      selector: select((plants) => plants.filter((p) => p.categoryId === id)),
      sliceId: `byCategory:${id}`,
    }
  );
};

/* ============================================================
   HOOK: subscribe to plant category data for custom plants in a given category 
*/

const usePlantCategoryData = (categoryId: string): PlantData[] => {
  return useLocalStorageCache<PlantData[], PlantData[]>(
    PLANT_DATA_KEY,
    PLANT_DATA_INITIAL,
    {
      selector: select((data) => data.filter((d) => d.id === categoryId)),
      sliceId: `categoryData:${categoryId}`,
    }
  );
};

/* ============================================================
   HOOK: subscribe to a list of all used plant categories
*/

const usePlantCategories = () => {
  type PlantCategory = {
    id: string;
    name: string;
    icon: string;
  };
  const categories = useLocalStorageCache<PlantData[], PlantCategory[]>(
    PLANT_DATA_KEY,
    PLANT_DATA_INITIAL,
    {
      selector: select((data) =>
        data
          .map((d) => ({
            name: d.name_sv,
            id: d.id,
            icon: d.icon_name || "",
          }))
      ),
    }
  );
  if (!categories || categories.length === 0) return [];
  return categories;
};

/* ============================================================
   EXPORTS
   - hooks for subscribing to plants store
   - hook for editing plants store
*/

// Getter hook for subscribing to plants and plant data
export function usePlantsStore() {
  return {
    getPlants: usePlants,
    getPlantCategories: usePlantCategories,
    getPlantsInCategory: usePlantsInCategory,
    getPlant: usePlant,
    getPlantCategoryData: usePlantCategoryData,
  };
}

// Setter hook for editing plants and plant data
export function useEditPlantsStore() {
  const setPlants = useSetLocalStorageCache(PLANTS_KEY, PLANTS_INITIAL);
  const setPlantData = useSetLocalStorageCache(
    PLANT_DATA_KEY,
    PLANT_DATA_INITIAL
  );

  const savePlant = (newPlant: CustomPlant) => {
    setPlants((oldPlants) => {
      const existingIndex = oldPlants.findIndex((p) => p.id === newPlant.id);
      if (existingIndex === -1) return [...oldPlants, newPlant];

      const updatedPlants = [...oldPlants];
      updatedPlants[existingIndex] = newPlant;
      return updatedPlants;
    });
  };

  const savePlantCategory = (newData: PlantData) => {
    setPlantData((oldData) => {
      const existingIndex = oldData.findIndex((d) => d.id === newData.id);
      if (existingIndex === -1) return [newData, ...oldData];
      const updatedData = [...oldData];
      updatedData[existingIndex] = newData;
      return updatedData;
    });
  };

  const deletePlant = (plantId: string) => {
    setPlants((oldPlants) => {
      const newPlants = oldPlants.filter((plant) => plant.id !== plantId);
      const deletedPlant = oldPlants.find((plant) => plant.id === plantId);
      if (!deletedPlant) return oldPlants; 

      // Optionally, also delete related plant data if no other plants use it
      // setPlantData((oldData) => {
      //   const isCategoryUsed = newPlants.some(
      //     (plant) => plant.categoryId === deletedPlant.categoryId
      //   );
      //   if (isCategoryUsed) return oldData;
      //   return oldData.filter((data) => data.id !== deletedPlant.categoryId);
      // });

      return newPlants;
    });
  };

  return { savePlant, savePlantCategory, deletePlant };
}