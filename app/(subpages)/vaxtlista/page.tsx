import type { Metadata } from "next";
import { Suspense } from "react";
import styles from "@/app/(subpages)/subpages.module.css";
import { PlantList } from "@/app/(subpages)/vaxtlista/plantList";
import{ Loader } from "@/app/components/ui/loader"
import { PageContentWrapper } from "@/app/components/pageContentWrapper";

export const metadata: Metadata = {
  title: "Växtlista",
};

export default function VaxtlistaPage() {

  return (
    <PageContentWrapper
      title="Min Växtlista"
      intro={
        <p>
          Här kan du lägga till dina växter och hålla koll på när de ska sås,
          planteras ut och skördas.
        </p>
      }
    >
        <section
          className={`${styles.sectionPageMainContent}`}
          id="form-container"
        >
          <Suspense fallback={<Loader />}>
            <PlantList />
          </Suspense>
        </section>
     
    </PageContentWrapper>
  );
}