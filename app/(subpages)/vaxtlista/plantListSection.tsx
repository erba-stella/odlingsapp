"use client";
import { usePlantsStore, useEditPlantsStore } from "@/lib/store/plantsStore";
import SortableList from "@/app/components/sortableList";
import { useLocalStorageCache, useSetLocalStorageCache } from "@/lib/hooks/useLocalStorageCache";
import { Suspense } from "react";
import AddPlantForm from "./addPlantForm";

type Props = {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
};

export const PlantListSection = ({
  categoryId,
  categoryName,
  categoryIcon,
}: Props) => {
  // Get plants in this category from the store
  const { getPlantsInCategory } = usePlantsStore();
  const plants = getPlantsInCategory(categoryId);

  // Storing the order of plants in the list in local storage
  const KEY = `listOrder-${categoryId}`, INITIAL = plants.map((p) => p.id) || [];
  const listOrder = useLocalStorageCache<string[]>( KEY, INITIAL);
  const setListOrder = useSetLocalStorageCache<string[]>(KEY, INITIAL);

  const handleOrderChange = (newOrder: string[]) => {
    setListOrder(newOrder);
  };

  // Adding a new plant to the category
  const { savePlant } = useEditPlantsStore();
  const handleAddPlant = (name: string) => {
    const newPlant = {
      id: crypto.randomUUID(),
      name,
      created: new Date().toISOString(),
      categoryId,
    };
    savePlant(newPlant);
    setListOrder((prev) => [...prev, newPlant.id]);
  };

  return (
    <section>
      <h2>{categoryName}</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <SortableList
          className="cardList"
          listId={categoryId}
          listOrder={listOrder}
          onOrderChange={handleOrderChange}
        >
          {plants.map((plant) => (
            <SortableList.Item key={plant.id} id={plant.id}>
              {plant.name} {categoryIcon}
            </SortableList.Item>
          ))}
        </SortableList>
        <AddPlantForm onSubmit={handleAddPlant} styles="" />
      </Suspense>
    </section>
  );
};