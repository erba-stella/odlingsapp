import { CustomPlant } from "@/lib/interfaces";
import styles from "./plantForm.module.css";

interface Props {
  plants: CustomPlant[];
}

export const SavedPlantsList = ({ plants }: Props) => {
  if (plants.length === 0) return null;

  return (
    <section className={styles.sectionSaved}>
      <h4>Nyligen sparat:</h4>
      <ul>
        {plants.map((sp) => (
          <li key={sp.created}>{`${sp.name} (${sp.categoryId})`}</li>
        ))}
      </ul>
    </section>
  );
};