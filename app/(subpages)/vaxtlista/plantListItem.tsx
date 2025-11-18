"use client";

import React, { useState } from "react";
import styles from "./plantListItem.module.css";
import { PlantIcon } from "@/app/components/icons/plantIcons";
import Link from "next/link";
import {
  useSetPlants,
  usePlantsInCategory,
  //usePlantById,
} from "@/lib/store/plantsStore";

// swapy
// https://www.youtube.com/watch?v=f6E_PMV5NKk

type Props =  { name: string; id: string, icon: string };

export const PlantListItem = ({
  category,
}: {
  category: Props;
  }) => {
    const setPlants = useSetPlants();
    const plants = usePlantsInCategory(category.id);
    const sorter = plants.length === 1 ? "sort" : "sorter";

    const newPlant = {
      id: crypto.randomUUID(),
      customName: `Plant ${Math.random()}`,
      created: new Date().toISOString(),
      linkedTo: {
        id: category.id,
        name_sv: category.name,
        name_latin: "helooo",
        alias: ["superplant"],
        icon_name: category.icon,
        category: "plant",
        tags: [], // Add an empty array or appropriate tags here
      },
    };

  const [expanded, setExpanded] = useState(true);

  // Dragging state for plantt list item
  const draggedPlant = React.useRef<number>(0);
  const draggedOverPlant = React.useRef<number>(0);


    const handleToggle = () => {
      setExpanded((prev) => !prev);
    };

    const addPlant = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setPlants((prev) => [...prev, newPlant]);
    };

    const removePlant = (id: string) => {
      setPlants((prev) => {
        const filtered = prev.filter((plant) => plant.id !== id);
        return [...filtered];
      });
    };
  
  // Drag plant item
  const handleSortPlants = () => {
    if (draggedPlant.current === draggedOverPlant.current) return;

    setPlants((prev) => {
      const plantsClone = [...prev];
      const movedPlant = plants[draggedPlant.current];
      plantsClone[draggedPlant.current] = plantsClone[draggedOverPlant.current];
      plantsClone[draggedOverPlant.current] = movedPlant;
      return [...plantsClone];
    });

    draggedPlant.current = 0;
    draggedOverPlant.current = 0;
  };

    return (
      <>
        <article className={styles.cardWrapper} id={category.id}>
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
                  type={category.icon}
                  width="48"
                  height="48"
                  aria-hidden="true"
                />
              </span>
              <hgroup className={styles.content}>
                <h3 className={styles.title}>{category.name}</h3>
                <p className={styles.varietyCount}>
                  {`${plants.length} ${sorter}`}
                  <span aria-hidden="true">{expanded ? "▲" : "▼"}</span>
                </p>
              </hgroup>
              <button onClick={addPlant}>Add</button>
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
            {plants.map((plant, index) => (
              <li
                key={`${plant.created}-${index}`}
                className={styles.varietyItem}
                draggable
                onDragStart={() => (draggedPlant.current = index)}
                onDragEnter={() => (draggedOverPlant.current = index)}
                onDragEnd={handleSortPlants}
                onDragOver={(e) => e.preventDefault()}
              >
                {plant.customName}
                <Link
                  href={`./plant/${plant.id}`}
                  className={styles.varietyButton}
                  passHref
                >
                 link {/* {plant.customName} */}
                </Link>
                <button
                  onClick={() => {
                    removePlant(plant.id);
                  }}
                >
                  {`: - remove X`}
                </button>
              </li>
            ))}
          </ul>
        </article>
      </>
    );
  };