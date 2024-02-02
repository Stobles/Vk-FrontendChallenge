import {
  useState,
  createContext,
  useContext,
  HTMLProps,
  useEffect,
} from "react";
import { NavLink, NavLinkProps, useLocation } from "react-router-dom";

import styles from "./Sidebar.module.scss";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  }, [pathname]);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// "fixed right-0 top-0 w-full xs:w-[300px] h-screen bg-background z-[999] px-4 shadow-sidebar transition-transform ", context?.isOpen ? "translate-x-0" : "translate-x-[120%]"

Sidebar.Root = function Root({ children }: { children?: React.ReactNode }) {
  const context = useContext(SidebarContext);
  return (
    <aside
      className={
        context?.isOpen ? `${styles.Sidebar} ${styles.Open}` : styles.Sidebar
      }
    >
      {children}
    </aside>
  );
};

// flex text-xl font-semibold py-6

Sidebar.Header = function Header({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className ? `${styles.Header} ${className}` : styles.Header}
    >
      {children}
    </div>
  );
};

Sidebar.Item = function Item({
  children,
  to,
}: NavLinkProps &
  HTMLProps<HTMLAnchorElement> & {
    children?: React.ReactNode;
  }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${styles.Link} ${styles.Active}` : styles.Link
      }
    >
      {children}
    </NavLink>
  );
};

Sidebar.Content = function Content({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <div className={styles.Content}>{children}</div>;
};

Sidebar.Trigger = function Trigger({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const context = useContext(SidebarContext);
  return (
    <button
      className={className ? `${styles.Trigger} ${className}` : styles.Trigger}
      onClick={context?.toggleSidebar}
    >
      {children}
    </button>
  );
};
