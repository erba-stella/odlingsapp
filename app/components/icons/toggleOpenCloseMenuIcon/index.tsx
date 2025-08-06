
import styles from "./styles.module.css";

type IconStyle = "hamburger" | "plus";

interface IconParams {
  iconStyle?: IconStyle;
};

/*
  Animated icon for open/close menu buttons.
  Animation will be triggered if a parent element has aria-expanded="true"
  Use iconStyle "hamburger" for a hamburger icon, or "plus" for a + / x icon.
*/

export const ToggleOpenCloseIcon = ({ iconStyle = "plus" }: IconParams) => {
  const iconClasses: Record<IconStyle, string> = {
    hamburger: styles.hamburger,
    plus: styles.plus,
  };

  const iconClass = iconClasses[iconStyle] ?? "";
  return (
    <svg
      className={`${styles.icon} ${iconClass}`}
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
  );
};