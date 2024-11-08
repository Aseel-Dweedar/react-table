import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocation, Outlet } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  const [navItems, setNavItems] = useState([
    {
      id: 1,
      name: "Posts",
      path: "/posts",
    },
    {
      id: 2,
      name: "Comments",
      path: "/comments",
    },
  ]);

  useEffect(() => {
    setNavItems(
      navItems.map((navItem) => ({
        ...navItem,
        active: pathname.includes(navItem.path),
      }))
    );
  }, [pathname]);

  return (
    <div className="layout-wrapper d-flex flex-direction-column">
      <Header navItems={navItems} />
      <main className="d-flex flex-grow">
        <Sidebar navItems={navItems} />
        <div className="main-container w100">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
