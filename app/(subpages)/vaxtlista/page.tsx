import type { Metadata } from "next";
// import { Suspense } from "react";
import styles from "@/app/(subpages)/subpages.module.css";
import s from "@/app/(subpages)/vaxtlista/vaxtlista.module.css";
import { AddPlantForm } from "@/app/(subpages)/components/form/addPlantForm";

export const metadata: Metadata = {
  title: "Min växtlista",
};

export default function VaxtlistaPage() {

  return (
    <main className={styles.main}>
      <section className={s.addPlantSection}>
        <h2>Lägg till en växt i din växtlista</h2>
        <AddPlantForm /> 
        {/* <Suspense fallback={<div>Loading nice data...</div>}>
         
        </Suspense> */}
      </section>
    </main>
  );
}