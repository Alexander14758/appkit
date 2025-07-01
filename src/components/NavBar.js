import { Link } from "react-router-dom";
import "./NavBar1.css";

function NavBar() {
  return (
    <nav>
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/FAQ" className="nav-link">
        FAQ
      </Link>
      <Link to="/GUILD" className="nav-link">
        GUILD
      </Link>
      <div className="animation start-home"></div>
    </nav>
  );
}

export default NavBar;
