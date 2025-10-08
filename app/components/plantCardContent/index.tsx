import { RiDeleteBin6Line } from "react-icons/ri";
import { ChangeEvent } from "react";
import { usePlantsStore, useEditPlantsStore } from "@/lib/store/plantsStore";
import styles from "./plantCardContent.module.css";
import { TbEdit } from "react-icons/tb";
import { useDebounce } from "@/lib/hooks/useDebounce";
import Link from "next/link";

type Props = {
  id: string;
  onDelete: () => void;
};

export const PlantCardContent = ({ id, onDelete }: Props) => {
  const { getPlant } = usePlantsStore();
  const { savePlant } = useEditPlantsStore();
  const debounce = useDebounce();

  const plant = getPlant(id);
  if (!plant) return;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      console.log("save plant debounce", e);
      savePlant({ ...plant, name: e.target.value });
    }, 1200);
  };

  return (
    <div className={styles.contentWrapper}>
      <input
        type="text"
        defaultValue={plant.name}
        onChange={handleNameChange}
      />
      <TbEdit />
      <button onClick={onDelete}>
        <RiDeleteBin6Line />
      </button>
      <Link
        href={`./plant/${plant.id}`}
        className={styles.varietyButton}
        passHref
      >xx</Link>
    </div>
  );
};
