import Header from "./Header";
import Sidebar from "./Sidebar";

const navItems = [
  {
    name: "Posts",
    path: "/posts",
  },
  {
    name: "Comments",
    path: "/posts/1",
  },
];

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper d-flex flex-direction-column">
      <Header navItems={navItems} />
      <main className="d-flex flex-grow">
        <Sidebar navItems={navItems} />
        <div className="main-container">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
