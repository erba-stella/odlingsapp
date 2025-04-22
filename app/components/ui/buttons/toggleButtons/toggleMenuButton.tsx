import styles from "./toggleMenuButton.module.css";
import { ToggleMenuButtonWrapper } from "./toggleMenuButtonWrapper";

type IconStyle = "hamburger" | "plus";

interface IconParams {
  iconStyle?: IconStyle;
};

interface ButtonParams extends IconParams {
  controls: string;
  label: string;
  onClickAction?: () => void;
};

export const ToggleOpenCloseIcon = ({
  iconStyle ="plus",
}: IconParams) => {

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

export const ToggleMenuButton = ({
  iconStyle,
  controls,
  label,
  onClickAction,
}: ButtonParams) => {
  return (
    <>
      <ToggleMenuButtonWrapper
        onClickAction={onClickAction}
        aria-controls={controls}
        aria-haspopup="menu"
        aria-label={label}
      >
        <ToggleOpenCloseIcon iconStyle={iconStyle} />
      </ToggleMenuButtonWrapper>
    </>
  );
};