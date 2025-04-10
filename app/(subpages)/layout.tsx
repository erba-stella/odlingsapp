
import { PageHeader } from "@/app/(subpages)/components/header/page_header"
import styles from "./subpages.module.css"

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`global-container ${styles.page}`}>
      <PageHeader />
      {children}
    </div>
  );
}