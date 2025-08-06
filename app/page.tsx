import styles from "./page.module.css";
import { SmoothScrollLink } from "@/app/components/links/smoothScrollLink";
import { Logo } from "@/app/components/icons/logoIcon";
import Link from "next/link";

export default function Home() {
  return (
    <div className={`global-container ${styles.page}`}>
      <main className={styles.main}>
        {/* Intro section */}
        <div
          className={`
            ${styles.sectionPageIntro} 
            `}
        >
          {/* Logo image */}
          <Logo />

          {/* Page intro */}
          <section
            className={`
            ${styles.textSection}
            ${styles.pageIntroText} 
            `}
          >
            <h2>Håll koll på dina sådder!</h2>
            <p>
              Här kan du lägga till dina växter och hålla koll på när de ska
              sås, planteras ut och skördas.
            </p>
          </section>
        </div>

        {/* Scroll link */}
        <div id="getStarted" className={styles.scrollLinkWrapper}>
          <SmoothScrollLink targetId="getStarted" className={styles.scrollLink}>
            <em>
              Kom igång!
              <svg className={styles.arrowDown} viewBox="0 0 100 100">
                <path d="M78 36 50 64 22 35a2 2 0 0 0-3 3l29 30a2 2 0 0 0 2 0h2l29-30a2 2 0 1 0-3-2z" />
              </svg>
            </em>
          </SmoothScrollLink>
        </div>

        <section
          className={`
            ${styles.section}
            ${styles.sectionGetStarted} 
            `}
        >
          <h2>Var odlar du?</h2>
          <p>
            Ange odlingsort för att se lokalt anpassade tider för sådd och
            utplantering.
          </p>
          <label>
            Ort
            <input type="text" />
          </label>

          <h2>Spara dina växter</h2>
          {/* <p>
            Lorem ipsum, dolor sit amet consec tetur adipisicing elit. Nostrum
            nisi facere ratione eligendi, voluptatem voluptate ipsum earum illo
            doloribus?
          </p> */}

          <Link href="/vaxtlista" className={`${styles.button}`}>
            Skapa Växtlista
          </Link>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}