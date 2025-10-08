"use client";

import { useState } from "react";
import styles from "./plantForm.module.css";
import { useEditPlantsStore } from "@/lib/store/plantsStore";
import { slug } from "@/lib/utils/textToSlug";
import { CustomPlant, PlantData } from "@/lib/interfaces";

import { PlantNameInput } from "./PlantNameInput";
import { PlantTypeSelector } from "./PlantTypeSelector";
import { ValidationMessages } from "./ValidationMessages";
import { ToggleSwitchSection } from "./ToggleSwitchSection";
import { SavedPlantsList } from "./SavedPlantsList";

export const AddPlantForm = () => {
  const [customName, setCustomName] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<PlantData | null>(null);
 const [savedPlants, setSavedPlants] = useState<CustomPlant[]>([]);
 
  const [validationErrorName, setValidationErrorName] = useState<string | null>(
    null
  );
  const [validationErrorPlant, setValidationErrorPlant] = useState<
    string | null
   >(null);
 

  const { savePlant, savePlantCategory } = useEditPlantsStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPlant || !customName) {
      setValidationErrorName(customName ? null : "Skriv växtens namn");
      setValidationErrorPlant(selectedPlant ? null : "Välj växttyp");
      return;
    }

    const created = new Date().toISOString();
    const id = `${slug(customName)}-${created}`;
    const newPlant: CustomPlant = {
      id,
      created,
      name: customName,
      categoryId: selectedPlant.id,
    };

    setSavedPlants([newPlant, ...savedPlants]);

    savePlant(newPlant);
    savePlantCategory(selectedPlant);

    // reset form
    setCustomName("");
    setSelectedPlant(null);
    setValidationErrorName(null);
    setValidationErrorPlant(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      // className={styles.addPlantForm}
      aria-labelledby="form-heading"
    >
      <h3 id="form-heading">Lägg till ny växt</h3>

      <PlantNameInput value={customName} onChange={setCustomName} />

      <PlantTypeSelector
        selectedPlant={selectedPlant}
        onSelect={setSelectedPlant}
      />

      <ToggleSwitchSection />

      <fieldset className={styles.sectionSavePlant}>
        <ValidationMessages
          nameError={validationErrorName}
          plantError={validationErrorPlant}
        />
        <button type="submit">Spara växt</button>
      </fieldset>

      <SavedPlantsList plants={savedPlants} />
    </form>
  );
};