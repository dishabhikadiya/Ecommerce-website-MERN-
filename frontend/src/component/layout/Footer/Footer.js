import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App For Android and IOS mobile phone</p>
        <img src="https://cdn.shopify.com/s/files/1/0620/5082/8457/files/app-icon-01.png?v=1654931267" />
        <img src="https://cdn.shopify.com/s/files/1/0620/5082/8457/files/app-icon-02.png?v=1654931286" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High quality is our first Priority</p>
        <p>copyrights 2023 Appmixo&copy;</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="">Instagram</a>
        <a href="">Youtube</a>
        <a href="">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
