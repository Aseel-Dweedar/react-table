import { Link } from "react-router-dom";

const Header = ({ navItems }) => {
  return (
    <header className="header d-flex align-items-center justify-content-center">
      <div className="navbar">
        {navItems.map((nav) => (
          <div className="nav-item head-nav-item">
            <Link to={nav.path}>{nav.name}</Link>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
