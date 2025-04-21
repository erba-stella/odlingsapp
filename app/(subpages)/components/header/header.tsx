import styles from "@/app/(subpages)/subpages.module.css"
import headerStyles from "./header.module.css";
import { ToggleMenuButton } from "../ui/buttons/toggleButtons/toggleMenuButton";
import { NavList } from "./navList";

export const PageHeader = () => {
  return (
    <>
      <header className={`${styles.header} ${headerStyles.header}`}>
        <div className={headerStyles.headerContentContainer}>
          <h1>SåPlanera</h1>
          {/*  Menu Desktop */}
          <nav
            aria-label="Main"
            className={`${headerStyles.navmenu} ${headerStyles.desktop}`}
          >
            <NavList />
          </nav>
          <ToggleMenuButton
            controls="navToggleMenu"
            iconStyle="hamburger"
            label="Meny"
          />
        </div>
      </header>

      {/* Mobile Nav Toggle Menu */}
      <div
        id="navToggleMenu"
        className={`${styles.navToggleMenu} ${headerStyles.navToggleMenu}`}
      >
        <nav
          aria-label="Main"
          className={`${headerStyles.navmenu} ${headerStyles.mobile}`}
        >
          <NavList />
        </nav>
      </div>
    </>
  );
};