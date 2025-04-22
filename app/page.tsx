import styles from "./page.module.css";
import { SmoothScrollLink } from "@/app/components/ui/links/smoothScrollLink";
import { LogoIcon } from "@/app/components/icons/logoIcon";
import Link from "next/link";

export default function Home() {
  return (
    <div className={`global-container ${styles.page}`}>
      <main className={styles.main}>
        
        {/* Intro section */}
        <div className={styles.sectionPageIntro}>
          <div className={styles.logo}>
            <LogoIcon aria-hidden="true" />
            <h1>SåPlanera</h1>
          </div>

          <section>
            <h2>Håll koll på dina sådder!</h2>
            <ul>
              <li>
                Spara dina plantor dolor sit amet consectetur adipisicing elit.
              </li>
              <li>Se tider för sådd och utplantering i ditt område</li>
            </ul>
          </section>

          <SmoothScrollLink targetId="getStarted" className={styles.anchorLink}>
            <em>KOM IGÅNG</em>
            <svg viewBox="0 0 1024 1024">
              <path d="m903 256 57 50-448 462L64 306l57-50 391 403z" />
            </svg>
          </SmoothScrollLink>
        </div>

        <section className={styles.sectionGetStarted} id="getStarted">
          <h2>Var odlar du?</h2>
          <p>
            Lorem eligendi, animi asperiores voluptatem voluptate ipsum ea earum
            illo doloribus:
          </p>
          <label>
            Ort
            <input type="text" />
          </label>

          <h2>Spara dina växter</h2>
          <p>
            Lorem ipsum, dolor sit amet consec tetur adipisicing elit. Nostrum
            nisi facere ratione eligendi, voluptatem voluptate ipsum earum illo
            doloribus?
          </p>

          <Link href="/vaxtlista" className={`${styles.button}`}>
            Skapa Växtlista
          </Link>
        </section>
      </main>
    </div>
  );
}