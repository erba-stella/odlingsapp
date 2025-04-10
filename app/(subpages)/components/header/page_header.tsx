import styles from "@/app/(subpages)/subpages.module.css"
import { NavToggleButton } from "./nav_toggle_button"
import { NavList } from "./nav_list";


export const PageHeader = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContentContainer}>
          <h1>PAGE HEADER</h1>
          {/*  Menu Desktop */}
          <nav
            aria-label="Main"
            className={`${styles.navmenu} ${styles.desktop}`}
          >
            <NavList />
          </nav>

          <NavToggleButton>
            <svg
              className={styles.navToggleIcon}
              width="40px"
              height="40px"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M 20,29 H 80" />
              <path d="M 20,50 H 80" />
              <path d="M 20,50 H 80" />
              <path d="M 20,71 H 80" />
            </svg>
          </NavToggleButton>
          
        </div>
      </header>

      {/* Mobile Nav Toggle Menu */}

      <div className={styles.navToggleMenu}>
        <nav aria-label="Main" className={`${styles.navmenu} ${styles.mobile}`}>
          <NavList />
        </nav>
      </div>
    </>
  );
};