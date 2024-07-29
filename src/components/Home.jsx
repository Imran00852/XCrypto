import img from "../assets/btc.png";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <div className="home">
      <motion.div
        style={{
          height: "100vh",
        }}
        animate={{ translateY: "20px" }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img src={img} alt="" />
      </motion.div>

      <p>CRYPTO APP</p>
    </div>
  );
};

export default Home;
