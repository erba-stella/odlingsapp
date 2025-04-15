import type { Metadata } from "next";
// import { Suspense } from "react";
import styles from "@/app/(subpages)/subpages.module.css";
// import { AddPlantForm } from "@/app/(subpages)/components/form/addPlantForm";
import { AddPlantForm } from "@/app/(subpages)/components/form/addPlantForm";

export const metadata: Metadata = {
  title: "Min växtlista",
};

export default function VaxtlistaPage() {

  return (
    <main className={styles.main}>
      <h2>Min växtlista</h2>
      <section className={`${styles.vaxtlistaSection}`}>
        <article>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis a
            quisquam aperiam saepe earum numquam sunt eos facilis explicabo
            itaque ut dolor, accusamus libero? Velit aut asperiores praesentium
            quisquam possimus.
          </p>
        </article>
        <article>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis a
            quisquam aperiam saepe earum numquam sunt eos facilis explicabo
            itaque ut dolor, accusamus libero? Velit aut asperiores praesentium
            quisquam possimus.
          </p>
        </article>
      </section>
      <section className={`${styles.addPlantSection} ${styles.fullWidth}`}>
        <AddPlantForm />
        {/* <Suspense fallback={<div>Loading nice data...</div>}>
         
        </Suspense> */}
      </section>
    </main>
  );
}