// Wrapper for consistent page layout
// This component is used to wrap the main content of a page, including an optional side panel and intro section.
import styles from "./pageLayoutWrapper.module.css";
type Props = {
  title: string;
  intro?: React.ReactNode;
  sidePanel?: React.ReactNode;
  children: React.ReactNode;
  contentStyles?: string;
};

export const PageLayoutWrapper = (props: Props) => {
  const {
    title,
    intro,
    sidePanel,
    children,
    contentStyles = styles.content, // Default content styles
  } = props;

  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <h2 id="main-content">{title}</h2>
        {intro ? intro : null}
      </div>
      {sidePanel ? (
        <aside className={styles.sidePanel}>{sidePanel}</aside>
      ) : null}
      <div className={`${styles.contentArea} ${contentStyles}`}>
        {children}
      </div>
    </main>
  );
};
