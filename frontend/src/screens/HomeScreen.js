import React from "react";
import { Card, Button, Container, Image } from "react-bootstrap";

const HomeScreen = () => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Image
          src="https://krugercorp.com/wp-content/uploads/2022/02/KRUGER-icon-naranja-03.png"
          fluid={true}
        ></Image>
        <h1 style={{ fontSize: "4.8rem", marginTop: "5rem" }}>Bienvenido</h1>
      </div>
    </>
  );
};

export default HomeScreen;
