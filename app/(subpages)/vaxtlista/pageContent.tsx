"use client";
import { usePlantsStore } from "@/lib/store/plantsStore";
import { PlantListSection } from "./plantListSection";
import { Loader } from "@/app/components/ui/loader";
import { AddPlantCategoryForm } from "@/app/components/addPlantCategoryForm";

export const PageContent = () => {
 const { getPlantCategories } = usePlantsStore();
  const categories = getPlantCategories();
  
  return (
    <>
      <section>
        <AddPlantCategoryForm />
      </section>

      {categories && categories.length > 0 ? (
        categories.map((category) => (
          <PlantListSection
            key={category.id}
            categoryId={category.id}
            categoryName={category.name}
            categoryIcon={category.icon}
          />
        ))
      ) : (
        <Loader />
      )}
    </>
  );
};
