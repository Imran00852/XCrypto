import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav>
      <Link to={"/"}>Home</Link>
      <Link to={"/exchanges"}>Exchanges</Link>
      <Link to={"/coin"}>Coins</Link>
    </nav>
  );
};

export default Header;
