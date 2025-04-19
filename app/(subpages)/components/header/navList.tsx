import { NavLink } from "./navLink";

export const NavList = () => {
  return (
    <ul role="menubar">
      <li role="none">
        <NavLink href="/">Start</NavLink>
      </li>
      <li role="none">
        <NavLink href="/vaxtlista">Min Växtlista</NavLink>
      </li>
      <li role="none">
        <NavLink href="/odlingskalender">Odlingskalender</NavLink>
      </li>
    </ul>
  );
};