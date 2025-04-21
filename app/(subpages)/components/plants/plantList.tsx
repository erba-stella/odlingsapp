"use client";
import { PlantTypeCard } from "@/app/(subpages)/components/plants/plantTypeCard";
import { useEffect, useState } from "react";
import { CustomPlant } from "@/lib/interfaces";
import { useSearchParams } from "next/navigation";

export const PlantList = () => {
  const [groupedByCategory, setGroupedByCategory] = useState<
    Record<string, CustomPlant[]>
    >({});
  const [savedPlant, setSavedPlant] = useState<string>("");
  /*
       Check for changes in search params
  */
  const searchParams = useSearchParams();
  const plantCreated = searchParams.get("created") || false;
  const prevSavedPlant = savedPlant;
  if (plantCreated && plantCreated !== prevSavedPlant)
    setSavedPlant(plantCreated);


    // hämta plantor från local storage
  useEffect(() => {
      console.log("savedPlant", savedPlant);
      const storedPlants = localStorage.getItem("my-plant-list");
      const parsedPlants: CustomPlant[] = storedPlants
        ? JSON.parse(storedPlants)
        : [];

      // sortera plantor i arrayer efter kategori
      const grouped = parsedPlants.reduce<Record<string, CustomPlant[]>>(
        (acc, plant) => {
          const plantType = plant.linkedTo.name_sv;
          // Om kategorin inte finns i acc, skapa en ny array
          // och lägg till plantan i den arrayen
          if (!acc[plantType]) {
            acc[plantType] = [];
          }
          acc[plantType].push(plant);
          return acc;
        },
        {} as Record<string, CustomPlant[]>
      );
      setGroupedByCategory(grouped);
    }, [savedPlant]);

  return (
    <>
      {Object.entries(groupedByCategory).map(([plantType, plants], i) => (
        <PlantTypeCard key={i} plantType={plantType} plants={plants} />
      ))}
    </>
  );
};

// icon={plants[0]?.linkedTo.icon_name ?? "cabbage"}
