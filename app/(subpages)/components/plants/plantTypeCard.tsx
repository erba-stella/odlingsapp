"use client";

import React, { useState } from "react";
import styles from "./plantTypeCard.module.css";
import { PlantIcon } from "../icons/plantIcons";
import { PlantCardProps } from "@/lib/interfaces";

export const PlantTypeCard = ({
  plantType,
  icon,
  plants,
}: PlantCardProps): React.ReactElement => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <article className={styles.cardWrapper}>
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
            <PlantIcon type={icon} width="48" height="48" aria-hidden="true" />
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
            {plant.customName}
          </li>
        ))}
      </ul>
    </article>
  );
};