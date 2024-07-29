import { useEffect, useState } from "react";
import axios from "axios";

import CoinCard from "./CoinCard";
import Loader from "./Loader";
import Error from "./Error";
import { HStack, Radio, RadioGroup } from "@chakra-ui/react";

const Coin = () => {
  const apiUrl = "https://api.coingecko.com/api/v3";

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, page]);

  if (error) return <Error msg={"Error while fetching coins..."} />;

  return (
    <>
      <RadioGroup
        value={currency}
        onChange={setCurrency}
        opacity={loading ? 0 : 1}
      >
        <HStack>
          <Radio value="inr">₹</Radio>
          <Radio value="eur">€</Radio>
          <Radio value="usd">$</Radio>
        </HStack>
      </RadioGroup>
      <section className="section">
        {loading ? (
          <Loader />
        ) : (
          coins.map((item) => (
            <CoinCard
              key={item.id}
              id={item.id}
              name={item.name}
              symbol={item.symbol}
              img={item.image}
              price={item.current_price}
              currencySymbol={currencySymbol}
            />
          ))
        )}
      </section>
      <div className="btn" style={{ opacity: loading ? 0 : 1 }}>
        {btns.map((item, index) => (
          <button onClick={() => changePage(index + 1)}>{index + 1}</button>
        ))}
      </div>
    </>
  );
};

export default Coin;
