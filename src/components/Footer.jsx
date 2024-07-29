import { Avatar } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return <footer className="footer">
    <div className="left">
      <h2>About us</h2>
      <p>We are the best crypto app in India.We provide our guidance at very cheap price.</p>
    </div>
    <div className="right">
      <Avatar/>
      <h3>Our Founder</h3>
    </div>
  </footer>;
};

export default Footer;
