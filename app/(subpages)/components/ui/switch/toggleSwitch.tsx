import styles from "./toggleSwitch.module.css"

export const ToggleSwitch = ({ ...props }) => {

 return (
   <div className={styles.toggleSwitch}>
     <input type="checkbox" {...props} />
     <span className={styles.slider}></span>
   </div>
 );
}


