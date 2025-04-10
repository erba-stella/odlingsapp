// import Image from "next/image";
import styles from "./page.module.css";
import { PlantIcon } from "@/app/components/icons/plant_icons";

export default function Home() {
  return (
    <div className={`global-container ${styles.page}`}>
      <main className={styles.main}>
        <PlantIcon type="chili" aria-hidden="true" width="50" height="50" />
        <PlantIcon type="radish" aria-hidden="true" width="50" height="50" />
        <PlantIcon />
      </main>
    </div>
  );
}
