import styles from "@/app/(subpages)/subpages.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Odlingskalender",
};

export default function OdlingskalenderPage() {
  return <main className={styles.main}>ODLINGSKALENDER-SIDAN</main>;
}
