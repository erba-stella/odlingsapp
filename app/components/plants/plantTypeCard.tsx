"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./plantTypeCard.module.css";
import { PlantIcon } from "../icons/plantIcons";
import { PlantModal } from "./plantModal";
import { PlantCardProps, CustomPlant } from "@/lib/interfaces";

export const PlantTypeCard = ({
  plantType,
  plants,
}: PlantCardProps): React.ReactElement => {
  // Expand list of plants/varieties
  const [expanded, setExpanded] = useState(false);
  // Select plant (open in modal for details)
  const [selectedPlant, setSelectedPlant] = useState<CustomPlant | null>(null);
  
  // console.log("plants", plants);
  // console.log("plant Icon", plants[0]?.linkedTo.icon_name);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const handleOpenModal = (plant: CustomPlant) => {
    setSelectedPlant(plant);
    const params = new URLSearchParams(searchParams.toString());
    params.set("plant", plant.created);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleCloseModal = () => {
    setSelectedPlant(null);
  };

  useEffect(() => {
    const plantIdFromUrl = searchParams.get("plant");
    if (plantIdFromUrl && !selectedPlant) {
      const match = plants.find((p) => p.created === plantIdFromUrl);
      if (match) {
        setSelectedPlant(match);
      }
    }
  }, [searchParams, plants, selectedPlant]);


  return (
    <>
      <article className={styles.cardWrapper} id={plants[0].linkedTo.id}>
        <div
          className={`${styles.card} ${expanded ? styles.expanded : ""}`}
          onClick={handleToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggle();
            }
          }}
          aria-expanded={expanded}
        >
          <header className={styles.topRow}>
            <span className={styles.iconWrapper}>
              <PlantIcon
                type={plants[0].linkedTo.icon_name}
                width="48"
                height="48"
                aria-hidden="true"
              />
            </span>
            <hgroup className={styles.content}>
              <h3 className={styles.title}>{plantType}</h3>
              <p className={styles.varietyCount}>
                {plants.length} sorter{" "}
                <span aria-hidden="true">{expanded ? "▲" : "▼"}</span>
              </p>
            </hgroup>
          </header>
        </div>

        <ul
          className={styles.varietyList}
          data-expanded={expanded}
          aria-hidden={!expanded}
          style={
            {
              "--num-list-items": `${plants.length}`,
            } as React.CSSProperties
          }
        >
          {plants.map((plant) => (
            <li key={plant.created} className={styles.varietyItem}>
              <button
                type="button"
                className={styles.varietyButton}
                onClick={() => handleOpenModal(plant)}
              >
                {plant.customName}
              </button>
            </li>
          ))}
        </ul>
      </article>
      {selectedPlant && (
        <PlantModal plant={selectedPlant} onClose={handleCloseModal} />
      )}
    </>
  );
};
