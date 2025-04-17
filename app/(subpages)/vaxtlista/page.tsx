import type { Metadata } from "next";
// import { Suspense } from "react";
import styles from "@/app/(subpages)/subpages.module.css";
// import { AddPlantForm } from "@/app/(subpages)/components/form/addPlantForm";
import { AddPlantForm } from "@/app/(subpages)/components/form/addPlantForm";
import { PlantList } from "@/app/(subpages)/components/plants/plantList";


export const metadata: Metadata = {
  title: "Min växtlista",
};

export default function VaxtlistaPage() {
  // Hämta plantor från API - för att få alla planttyper

 

  return (
    <main className={styles.main}>
      <h2>Min växtlista</h2>
      <section className={`${styles.vaxtlistaSection}`}>
        <PlantList />
      </section>
      <section className={`${styles.addPlantSection} ${styles.fullWidth}`}>
        <AddPlantForm />
        {/* <Suspense fallback={<div>Loading nice data...</div>}>
         
        </Suspense> */}
      </section>
    </main>
  );
}
