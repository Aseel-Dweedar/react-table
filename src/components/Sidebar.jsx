import { Link } from "react-router-dom";

const Sidebar = ({ navItems }) => {
  return (
    <div className="sidebar">
      {navItems.map((nav) => (
        <div
          key={nav.id}
          className={`nav-item side-nav-item ${nav.active ? "active-nav" : ""}`}
        >
          <Link to={nav.path}>{nav.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
