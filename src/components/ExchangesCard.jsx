const ExchangesCard = ({ name, img, rank, url }) => {
  return (
    <a className="card" href={url} target={"blank"}>
      <img src={img} alt="img" />
      <h3>{rank}</h3>
      <p>{name}</p>
    </a>
  );
};

export default ExchangesCard;
