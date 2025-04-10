import styles from "@/app/(subpages)/subpages.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Min växtlista",
};

export default function OdlingskalenderPage() {
  return <main className={styles.main}>VÄXTLISTA-SIDAN</main>;
}