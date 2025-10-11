"use client";
import { usePlantsStore, useEditPlantsStore } from "@/lib/store/plantsStore";
import SortableList from "@/app/components/sortableList";
import { useRef } from "react";
import { AddPlantForm } from "@/app/components/addPlantForm";
import { CustomPlant } from "@/lib/interfaces";
import { PlantCardContent } from "@/app/components/plantCardContent";
import { PlantIcon } from "@/app/components/icons/plantIcon";
import { useListOrder } from "@/lib/store/plantListOrderStore";


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

  // keep track of the latest changes: new plant added to list / deleted from list
  const newPlantRef = useRef<CustomPlant | null>(null);
  // const deletedPlantRef = useRef<CustomPlant | null>(null);

  const { listOrder, setListOrder } = useListOrder(categoryId);

  const handleOrderChange = (newOrder: string[]) => {
    setListOrder(newOrder);
  };

  // Adding a new plant to the category
  const { savePlant } = useEditPlantsStore();
  const handleAddPlant = (name: string, id: string) => {
    const newPlant: CustomPlant = {
      id,
      name,
      created: new Date().toISOString(),
      categoryId,
    };
    newPlantRef.current = newPlant;
    savePlant(newPlant);
    const prev = listOrder || [];
    setListOrder([...prev, newPlant.id]);
  };

  // Deleting plant
  const { deletePlant } = useEditPlantsStore();
  const handleDelete = (plantId: string) => {
    deletePlant(plantId);
  };

  return (
    <section
      style={{ viewTransitionName: `section-${categoryName}` }}
    >
      <h2>
        {categoryName}
        <PlantIcon width={15} height={15} type={categoryIcon} />
      </h2>

      <p aria-live="polite" className="visually-hidden">
        {newPlantRef.current &&
          `${newPlantRef.current.name} har lagts till i listan ${categoryName}`}
      </p>

      <SortableList
        listId={categoryId}
        listOrder={listOrder}
        onOrderChange={handleOrderChange}
      >
        {plants.map((plant) => (
          <SortableList.Item key={plant.id} id={plant.id}>
            <PlantCardContent
              id={plant.id}
              onDelete={() => {
                handleDelete(plant.id);
              }}
            />
          </SortableList.Item>
        ))}
      </SortableList>
      <AddPlantForm plantCategory={categoryName} onSubmit={handleAddPlant} />
    </section>
  );
};
