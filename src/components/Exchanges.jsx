import { useEffect, useState } from "react";
import axios from "axios";

import ExchangesCard from "./ExchangesCard";
import Loader from "./Loader";
import Error from "./Error";

const Exchanges = () => {
  const apiUrl = "https://api.coingecko.com/api/v3";

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  if (error) return <Error msg={"Error while fetching exchanges..."} />;

  return (
    <section className="section">
      {loading ? (
        <Loader />
      ) : (
        exchanges.map((item) => (
          <ExchangesCard
            key={item.id}
            name={item.name}
            rank={item.trust_score_rank}
            img={item.image}
            url={item.url}
          />
        ))
      )}
    </section>
  );
};

export default Exchanges;
