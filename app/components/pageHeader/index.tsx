import styles from "./pageHeader.module.css";
import cx from "classnames";
import { NavList } from "./NavList";
import { MobileNavToggleMenu } from "./MobileNavToggleMenu";

export const PageHeader = ({
 className = "",
}: {
  className?: string;
}) => {
  return (
    <header id="page-header" className={cx(className, styles.header)}>
      {/* Mobile */}
      <MobileNavToggleMenu />

      <h1>SåPlanera</h1>

      {/* Visually hidden link for skip navigation */}
      <a className={styles.skipLink} href="#main-content">
        <span>Till innehållet</span>
      </a>

      {/* Desktop */}
      <nav aria-label="Main" className={cx(styles.navmenu, styles.desktop)}>
        <NavList />
      </nav>  
    </header>
  );
};