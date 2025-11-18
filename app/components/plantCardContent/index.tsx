import { RiDeleteBin6Line } from "react-icons/ri";
import { usePlantsStore } from "@/lib/store/plantsStore";
import styles from "./plantCardContent.module.css";
import { TbEdit } from "react-icons/tb";
import Link from "next/link";
import { useState } from "react";

type Props = {
  id: string;
  onDelete: () => void;
};

// TODO: plant card component
export const PlantCardContent = ({ id, onDelete }: Props) => {
  const [editable, setEditable] = useState<boolean>(false);

  const { getPlant } = usePlantsStore();
  const plant = getPlant(id);
  if (!plant) return;

  return (
    <div className={styles.contentWrapper}>
      <Link
        href={`./plant/${plant.id}`}
        className={styles.varietyButton}
        passHref
      >
        {plant.name}
      </Link>

      <button
        onClick={() => {
          setEditable((prev) => !prev);
        }}
      >
        <TbEdit aria-hidden={true} />
      </button>
      {editable ? (
        <div>
          <button onClick={onDelete}>
            <RiDeleteBin6Line aria-hidden={true} />
          </button>
        </div>
      ) : null}
    </div>
  );
};
