import { Link } from "react-router-dom";

const CoinCard = ({ name, img, symbol, id, price, currencySymbol = "₹" }) => {
  return (
    <Link to={`/coin/${id}`} className="card">
      <img src={img} alt="img" style={{ width: "2rem", height: "2rem" }} />
      <h3>{symbol}</h3>
      <p>{name}</p>
      <p>{price ? `${currencySymbol}${price}` : "NA"}</p>
    </Link>
  );
};

export default CoinCard;
