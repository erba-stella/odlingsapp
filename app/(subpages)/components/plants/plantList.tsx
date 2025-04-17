"use client";
import { PlantTypeCard } from "@/app/(subpages)/components/plants/plantTypeCard";
import { useEffect, useState } from "react";
import { CustomPlant } from "@/lib/interfaces";
// import { useLocalStorage } from "@/lib/utils/localstorage";

export const PlantList = () => {
  const [groupedByCategory, setGroupedByCategory] = useState<
    Record<string, CustomPlant[]>
  >({});
  // hämta plantor från local storage

  // const [plantList, setStoredPlantList] = useLocalStorage(
  //     "my-plant-list",
  //     ""
  //   );
  useEffect(() => {
    // https://www.w3schools.com/jsref/jsref_reduce.asp
    const storedPlants = localStorage.getItem("my-plant-list");
    const parsedPlants: CustomPlant[] = storedPlants
      ? JSON.parse(storedPlants)
      : [];
    // sortera plantor utefter dess kategori, vissa kan vara samma kategori och lägga dem i en varsin array efter kategorin

    const grouped = parsedPlants.reduce<Record<string, CustomPlant[]>>(
      (acc, plant) => {
        const category = plant.linkedTo.category;
        // Om kategorin inte finns i acc, skapa en ny array
        // och lägg till plantan i den arrayen
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(plant);
        return acc;
      },
      {} as Record<string, CustomPlant[]>
    );
    setGroupedByCategory(grouped);
    console.log(grouped);
  }, []);

  return (
    <>
      {/* Plant card test */}
      {/* <PlantTypeCard plantType="Tomater" icon="tomato" plants={plants} />
      <PlantTypeCard plantType="Huvudkål" icon="cabbage" plants={plants} />
      <PlantTypeCard plantType="Betor" icon="beet" plants={plants} />
      <PlantTypeCard plantType="Melon" icon="melon" plants={plants} />
      <PlantTypeCard plantType="Pak-Choi" icon="pak-choi" plants={plants} /> */}
      {Object.entries(groupedByCategory).map(([category, plants], i) => (
         <PlantTypeCard key={i} plantType={category} plants={plants} />
      ))}
    </>
  );
};

// icon={plants[0]?.linkedTo.icon_name ?? "cabbage"}
