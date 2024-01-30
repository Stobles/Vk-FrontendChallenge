import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { navLinks } from "@/app/consts";
import { NavigationLink } from "@/app/types";
import { Sidebar } from "@/components/Sidebar/Sidebar";

import { IoMenuSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const Navigation = ({ links }: { links: NavigationLink[] }) => {
  return (
    <nav className={styles.Nav}>
      <ul className={styles.List}>
        {links.map((link) => (
          <li key={link.name} className={styles.ListElement}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.Link} ${styles.Active}` : styles.Link
              }
              to={link.to}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const Header = () => {
  return (
    <header className={styles.Header}>
      <Navigation links={navLinks} />
      <Sidebar>
        <Sidebar.Trigger className={styles.Trigger}>
          <IoMenuSharp />
        </Sidebar.Trigger>
        <Sidebar.Root>
          <Sidebar.Header>
            <h2>Cat Pinterest</h2>
            <Sidebar.Trigger className={styles.Trigger}>
              <RxCross1 />
            </Sidebar.Trigger>
          </Sidebar.Header>
          <Sidebar.Content>
            {navLinks.map((route) => (
              <Sidebar.Item key={route.name} to={route.to}>
                {route.name}
              </Sidebar.Item>
            ))}
          </Sidebar.Content>
        </Sidebar.Root>
      </Sidebar>
    </header>
  );
};
