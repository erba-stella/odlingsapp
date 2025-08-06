import { NavLink } from "./NavLink";
import { PiCalendarCheckBold, PiCarrotBold, PiFarmBold } from "react-icons/pi";

export const NavList = () => {
  return (
    <ul role="menubar">
      <li role="none">
        <NavLink href="/">
          <PiFarmBold />
          <span>Start</span>
        </NavLink>
      </li>
      <li role="none">
        <NavLink href="/vaxtlista">
          <PiCarrotBold />
          <span>Växtbibliotek</span>
        </NavLink>
      </li>
      <li role="none">
        <NavLink href="/odlingskalender">
          <PiCalendarCheckBold />
          <span>Kalender</span>
        </NavLink>
      </li>
    </ul>
  );
};
