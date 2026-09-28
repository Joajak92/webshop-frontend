import { Link } from "react-router";

const Header = () => {
  return (
    <header>
      <h1>Webshop</h1>
      <nav>
        <Link to="/">Hem</Link>
        <br/>
        <Link to="/products">Produkter</Link>
      </nav>
    </header>
  );
};
export default Header;
