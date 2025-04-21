// import Image from "next/image";
import styles from "./page.module.css";
// import seedImage from "@/public/seed.svg";
import Link from "next/link";
// import { PlantIcon } from "@/app/(subpages)/components/icons/plantIcons";

export default function Home() {
  return (
    <div className={`global-container ${styles.page}`}>
      <main className={styles.main}>
        {/* Intro section */}
        <div className={styles.sectionPageIntro}>
          <div className={styles.logo}>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#965353"
                d="M505 277H391c-4 0-9 2-12 5L261 401a7 7 0 0 1-10 0L133 282c-3-3-8-5-12-5H7c-4 0-7 3-7 7v221c0 4 3 7 7 7h498c4 0 7-3 7-7V284c0-4-3-7-7-7z"
              />
              <path
                fill="#9ed36a"
                d="M391 277c-4 0-9 2-12 5l-38 38h171v-36c0-4-3-7-7-7H391zm-220 43-38-38c-3-3-8-5-12-5H7c-4 0-7 3-7 7v36h171z"
              />
              <path
                fill="#dbada2"
                d="M389 67 239 3a32 32 0 1 0-25 59l90 37 85-32z"
              />
              <g fill="#eac6bb">
                <path d="M64 79c0 11 10 21 21 21h164V57H85c-11 0-21 10-21 22zm-21 53c0 12 9 21 21 21h163v-42H64c-12 0-21 9-21 21zm21 53c0 12 10 22 21 22h164v-43H85c-11 0-21 10-21 21zm43 54c0 11 9 21 21 21h163v-43H128c-12 0-21 10-21 22z" />
                <path d="M347 57H215v43a5 5 0 1 1 0 11v42a5 5 0 0 1 0 11v43a5 5 0 1 1 0 10v43h132a101 101 0 1 0 0-203z" />
              </g>
              <path
                fill="#7f4545"
                d="M416 384a11 11 0 1 1-21 0 11 11 0 0 1 21 0zm42 75a11 11 0 1 1-21 0 11 11 0 0 1 21 0zm-95 0a11 11 0 1 1-22 0 11 11 0 0 1 22 0zm-96 0a11 11 0 1 1-22 0 11 11 0 0 1 22 0zM96 384a11 11 0 1 0 21 0 11 11 0 0 0-21 0zm-43 75a11 11 0 1 0 22 0 11 11 0 0 0-22 0zm96 0a11 11 0 1 0 22 0 11 11 0 0 0-22 0z"
              />
              <path
                fill="#fecd57"
                d="M256 281c-17 0-32 21-32 39a32 32 0 0 0 64 0c0-18-15-39-32-39z"
              />
            </svg>
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
          <a className={styles.anchorLink} href="#getGoing">
            <em>KOM IGÅNG</em>
            <svg viewBox="0 0 1024 1024">
              <path d="m903 256 57 50-448 462L64 306l57-50 391 403z" />
            </svg>
          </a>
        </div>

        <section className={styles.sectionGetGoing} id="getGoing">
          <h2>Var odlar du?</h2>
          <p>
            Lorem eligendi, animi asperiores voluptatem voluptate
            ipsum ea earum illo doloribus:
          </p>
          <label>
            Ort
            <input type="text" />
          </label>

          <h2>Spara dina växter</h2>
          <p>
            Lorem ipsum, dolor sit amet consec tetur adipisicing elit. Nostrum
            nisi facere ratione eligendi, voluptatem voluptate
            ipsum earum illo doloribus?
          </p>

          <Link href="/vaxtlista" className={`${styles.button}`}>
            Skapa Växtlista
          </Link>
        </section>

        {/* <PlantIcon type="chili" aria-hidden="true" width="50" height="50" />
        <PlantIcon type="radish" aria-hidden="true" width="50" height="50" />
        <PlantIcon /> */}
      </main>
    </div>
  );
}