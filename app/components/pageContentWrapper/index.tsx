import styles from './pageContentWrapper.module.css';
type Props = {
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
};

export const PageContentWrapper = ({ title, intro, children }: Props) => {
 return (
   <main className={styles.main}>
     <div className={styles.intro}>
       <h2 id="main-content">{title}</h2>
       {intro ? intro : null}
     </div>
     <div className={styles.content}>{children}</div>
   </main>
 );
};