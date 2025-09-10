import styles from "./plantForm.module.css";
import { ToggleSwitch } from "@/app/components/toggleSwitch";

export const ToggleSwitchSection = () => (
  <div className={`${styles.checkboxGroup} ${styles.checkboxToggle}`}>
    <label>
      i såplanering
      <ToggleSwitch defaultChecked="true" />
    </label>
  </div>
);