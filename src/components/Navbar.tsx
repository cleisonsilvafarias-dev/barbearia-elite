import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <Link
        to="/"
        className="logo"
      >
        <span>💈</span>
        Barbearia Elite
      </Link>


      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/agendamento">
          Agendamento
        </Link>

        <Link to="/login">
          Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;