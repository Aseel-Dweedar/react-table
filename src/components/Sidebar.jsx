import { Link } from "react-router-dom";

const Sidebar = ({ navItems }) => {
  return (
    <div className="sidebar">
      {navItems.map((nav) => (
        <div className="nav-item side-nav-item">
          <Link to={nav.path}>{nav.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
