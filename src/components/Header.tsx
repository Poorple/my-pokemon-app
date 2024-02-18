import { Link } from "react-router-dom";
import "./styles/header-style.css";

const Header = () => {
  return (
    <nav>
      <h1 onClick={() => window.location.reload()}>
        <Link to="/">Pokédex</Link>
      </h1>
      <ul>
        <li>
          <Link to="/comparison">Compare</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
