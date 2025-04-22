// a simple and cute css loader from https://css-loaders.com/blob/

import styles from "./loader.module.css"

export const Loader = () => {
 return (
   <div className={styles.loaderWrapper}>
   <div className={styles.loader}></div>
   </div>
 );
}