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

  // Give aria-live user feedback for latest changes: new plant added to list / deleted from list
  const newPlantRef = useRef<CustomPlant | null>(null);
  const deletedPlantRef = useRef<CustomPlant | null>(null);

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

  const sectionId = `section-${categoryId}`;

  return (
    <section
      aria-labelledby={sectionId} // made to be a landmark region with aria-labelledby
      style={{ viewTransitionName: sectionId }}
      data-animation="motion-section"
    >
      <h2 id={sectionId}>
        {categoryName}
        <PlantIcon width={15} height={15} type={categoryIcon} />
      </h2>

      {/* TODO: improve and break out as component (aria-live feedback): */}
      <p aria-live="polite" className="visually-hidden">
        {newPlantRef.current &&
          `${newPlantRef.current.name} har lagts till i listan ${categoryName}`}
      </p>
      <p aria-live="polite" className="visually-hidden">
        {deletedPlantRef.current &&
          `${deletedPlantRef.current.name} har raderats från listan ${categoryName}`}
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
