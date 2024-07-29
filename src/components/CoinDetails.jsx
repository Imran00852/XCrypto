import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import arrowDown from "../assets/arrow.png";
import arrowUp from "../assets/arrows.png";
import Chart from "./Chart.jsx";
import { Button } from "@chakra-ui/react";

const CoinDetails = () => {
  const apiUrl = "https://api.coingecko.com/api/v3";

  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [chartArr, setChartArr] = useState([]);
  const [days, setDays] = useState("24h");

  const params = useParams();
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "365d":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${apiUrl}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArr(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <Error msg={"Error while fetching coin details..."} />;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="main">
          {/* chart */}
          <div className="chart">
            <Chart arr={chartArr} currency={currencySymbol} days={days} />
          </div>

          <div className="btnss">
            {btns.map((item) => (
              <Button key={item} onClick={() => switchChartStats(item)}>
                {item}
              </Button>
            ))}
          </div>

          {/* switch currrency */}
          <div className="radioBtns">
            <input
              type="radio"
              value="inr"
              checked={currency === "inr"}
              id="inr"
              name="radio"
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
            />
            <label htmlFor="inr">₹</label>
            <input
              type="radio"
              name="radio"
              id="eur"
              value="eur"
              onChange={(e) => setCurrency(e.target.value)}
            />
            <label htmlFor="eur">€</label>
            <input
              type="radio"
              name="radio"
              id="usd"
              value="usd"
              onChange={(e) => setCurrency(e.target.value)}
            />
            <label htmlFor="usd">$</label>
          </div>

          {/* coin details */}
          <div className="details">
            <p>
              Last updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </p>
            <div>
              <img src={coin.image.large} alt="" />
              <h2>{coin.name}</h2>
              <p>
                {currencySymbol} {coin.market_data.current_price[currency]}
              </p>
              <div style={{ display: "flex" }}>
                {coin.market_data.price_change_percentage_24h > 0 ? (
                  <img
                    src={arrowUp}
                    alt=""
                    style={{ width: "1rem", height: "1.5rem" }}
                  />
                ) : (
                  <img
                    src={arrowDown}
                    alt=""
                    style={{ width: "1rem", height: "1.5rem" }}
                  />
                )}

                <span style={{ opacity: "0.4" }}>
                  {coin.market_data.price_change_percentage_24h}
                </span>
              </div>

              {/* badge/rank */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2rem",
                  height: "2rem",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "0.2rem",
                  cursor: "pointer",
                  fontWeight: "800",
                }}
              >
                {`#${coin.market_cap_rank}`}
              </div>
              {/* custom progress bar */}
              <CustomBar
                high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
                low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`}
              />
              <div className="items">
                <Item
                  title={"Max Supply"}
                  value={coin.market_data.max_supply}
                />
                <Item
                  title={"Circulating Supply"}
                  value={coin.market_data.circulating_supply}
                />
                <Item
                  title={"Market Cap"}
                  value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`}
                />
                <Item
                  title={"All Time Low"}
                  value={`${currencySymbol} ${coin.market_data.atl[currency]}`}
                />
                <Item
                  title={"All Time High"}
                  value={`${currencySymbol} ${coin.market_data.ath[currency]}`}
                />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};
const Item = ({ title, value }) => {
  return (
    <div>
      <p style={{ fontFamily: "Bebas Neue" }}>{title}</p>
      <p style={{ opacity: "0.5", fontSize: "1rem" }}>{value}</p>
    </div>
  );
};
const CustomBar = ({ low, high }) => {
  return (
    <div className="progressBar">
      <progress value="0.5" />
      <div className="badges">
        <div className="low">{low}</div>
        <p>24H Range</p>
        <div className="high">{high}</div>
      </div>
    </div>
  );
};
export default CoinDetails;
