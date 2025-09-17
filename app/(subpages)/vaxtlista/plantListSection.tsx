"use client";
import { usePlantsStore, useEditPlantsStore } from "@/lib/store/plantsStore";
import SortableList from "@/app/components/sortableList";
import { useLocalStorageCache, useSetLocalStorageCache } from "@/lib/hooks/useLocalStorageCache";
import { Suspense, useRef } from "react";
import { AddPlantForm } from "@/app/components/addPlantForm";
import { CustomPlant } from "@/lib/interfaces";

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

  // keep track of the latest new plant added to list
  const newPlantRef = useRef<CustomPlant | null>(null);

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
    const newPlant: CustomPlant = {
      id: crypto.randomUUID(),
      name,
      created: new Date().toISOString(),
      categoryId,
    };
    newPlantRef.current = newPlant;
    savePlant(newPlant);
    setListOrder((prev) => [...prev, newPlant.id]);
  };

  return (
    <section>
      <h2>{categoryName}</h2>

      <p aria-live="polite" className="visually-hidden">
        {newPlantRef.current &&
          `${newPlantRef.current.name} har lagts till i listan ${categoryName}`}
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <SortableList
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
        <AddPlantForm
          plantCategory={categoryName}
          onSubmit={handleAddPlant}
          styling=""
        />
      </Suspense>
    </section>
  );
};