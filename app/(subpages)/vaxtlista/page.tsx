import type { Metadata } from "next";
// import { Suspense } from "react";
import styles from "@/app/(subpages)/subpages.module.css";
// import { AddPlantForm } from "@/app/(subpages)/components/form/addPlantForm";
import { AddPlantForm } from "@/app/(subpages)/components/form/addPlantForm";
import { PlantTypeCard } from "@/app/(subpages)/components/plants/plantTypeCard"

export const metadata: Metadata = {
  title: "Min växtlista",
};

export default function VaxtlistaPage() {

  {
    /* Plant card test data */
  }
  const plants = [
    {
      created: "2024-06-11",
      customName: "Super Söt",
    },
    {
      created: "2024-01-01",
      customName: "Snabbaste lilla gurkan ever",
    },
    {
      created: "2024-08-29",
      customName: "Giant mastodont",
    },
    {
      created: "2024-02-16",
      customName: "Gardener's delight",
    },
  ];

  return (
    <main className={styles.main}>
      <h2>Min växtlista</h2>
      <section className={`${styles.vaxtlistaSection}`}>
        {/* Plant card test */}
          <PlantTypeCard plantType="Tomater" icon="tomato" plants={plants} />
          <PlantTypeCard plantType="Huvudkål" icon="cabbage" plants={plants} />
          <PlantTypeCard plantType="Betor" icon="beet" plants={plants} />
          <PlantTypeCard plantType="Melon" icon="melon" plants={plants} />
          <PlantTypeCard plantType="Pak-Choi" icon="pak-choi" plants={plants} />
        
      </section>
      <section className={`${styles.addPlantSection} ${styles.fullWidth}`}>
        <AddPlantForm />
        {/* <Suspense fallback={<div>Loading nice data...</div>}>
         
        </Suspense> */}
      </section>
    </main>
  );
}