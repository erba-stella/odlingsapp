import type { Metadata } from "next";
import { Suspense } from "react";
import{ Loader } from "@/app/components/ui/loader"
import { PageLayoutWrapper } from "@/app/components/pageLayoutWrapper";
import { PageContent } from "./pageContent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Växtlista",
};

export default function VaxtlistaPage() {

  return (
    <PageLayoutWrapper
      title="Mitt Växtbibliotek"
      intro={
        <p>
          Här kan du lägga till dina växter och hålla koll på när de ska sås,
          planteras ut och skördas.
        </p>
      }
      sidePanel={
        <div>Placeholder</div>
      }
      contentStyles={styles.contentWrapper}
    >
      <Suspense fallback={<Loader />}>
        <PageContent />
      </Suspense>
    </PageLayoutWrapper>
  );
}