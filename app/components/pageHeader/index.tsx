import styles from "./pageHeader.module.css";
import cn from "@/lib/utils/addClassNames";
import { NavList } from "./NavList";
import { MobileNavToggleMenu } from "./MobileNavToggleMenu";
import { LogoText } from "../icons/logoText";

export const PageHeader = ({ className = "" }: { className?: string }) => {
  return (
    <header id="page-header" className={cn(className, styles.header)}>
      <h1>
        <span className="visually-hidden">SåPlanera</span>
        <LogoText aria-hidden="true" className={styles.logotext} />
      </h1>

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