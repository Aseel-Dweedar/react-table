import { Link, useNavigate } from "react-router-dom";

const Header = ({ navItems }) => {
  const navigate = useNavigate();

  return (
    <header className="header d-flex align-items-center w100">
      <button
        className="transparent-btn cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <img src="/back-btn.png" alt="back button"></img>
      </button>
      <div className="d-flex justify-content-center flex-grow">
        {navItems.map((nav) => (
          <div
            key={nav.id}
            className={`nav-item head-nav-item ${
              nav.active ? "active-nav" : ""
            }`}
          >
            <Link to={nav.path}>{nav.name}</Link>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
