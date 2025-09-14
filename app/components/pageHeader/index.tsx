import styles from "./pageHeader.module.css";
import cn from "@/lib/utils/classNames"
import { NavList } from "./NavList";
import { MobileNavToggleMenu } from "./MobileNavToggleMenu";

export const PageHeader = ({
 className = "",
}: {
  className?: string;
}) => {
  return (
    <header id="page-header" className={cn(className, styles.header)}>
      <h1>SåPlanera</h1>

      {/* Visually hidden link for skip navigation */}
      <a className={styles.skipLink} href="#main-content">
        <span>Till innehållet</span>
      </a>

      {/* Desktop */}
      <nav aria-label="Main" className={cn(styles.navmenu, styles.desktop)}>
        <NavList />
      </nav>

      {/* Mobile */}
      <MobileNavToggleMenu />
    </header>
  );
};