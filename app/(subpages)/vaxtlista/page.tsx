import type { Metadata } from "next";
import { Suspense } from "react";
import styles from "@/app/(subpages)/subpages.module.css";
import { AddPlantForm } from "@/app/(subpages)/components/form/addPlantForm";
import { PlantList } from "@/app/(subpages)/components/plants/plantList";
import { ToggleMenuButton } from "@/app/(subpages)/components/ui/buttons/toggleButtons/toggleMenuButton"
import{ Loader } from "@/app/(subpages)/components/ui/loader"


export const metadata: Metadata = {
  title: "Växtlista",
};

export default function VaxtlistaPage() {
  // Hämta plantor från API - för att få alla planttyper

  return (
    <main className={styles.main}>
      <div className={styles.sectionPageIntro}>
        <h2>Min Växtlista</h2>
        <section>
          <p>Det här är en kort introduktion till innehållet på sidan.</p>
        </section>
      </div>

      <section
        className={`${styles.sectionPageMainContent}`}
        id="form-container"
      >
        <Suspense fallback={<Loader />}>
          <PlantList />
        </Suspense>
      </section>

      <section
        id="form-container"
        className={`${styles.sectionFormContainer} ${styles.fullWidth}`}
      >
        <ToggleMenuButton
          controls="form-container"
          iconStyle="plus"
          label="Spara växt"
        />
        <Suspense fallback={<Loader />}>
          <AddPlantForm />
        </Suspense>
      </section>
    </main>
  );
}