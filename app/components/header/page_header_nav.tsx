const NavDesktop = () => {

    return (
        <nav>
            <ul>
                <li>link desktop</li>
                <li>link desktop</li>
                <li>link desktop</li>
            </ul>
        </nav>
    )  
}

const NavMobile = () => {
  return (
    <button>
      MENU MOBIL
    </button>
  );
};

export const HeaderNav = () => {
    return (
      <>
        <NavDesktop />
        <NavMobile />
      </>
    );
};