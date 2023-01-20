import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        bottom: 0,
        justifyContent: "center",
        background: "#475c5b",
        fontFamily: 'oswald',
        color: 'white',
        position: "fixed"       
      }}
    >
      <Container>
        <Row>
          <Col className="text-center">Copyright &copy; Shahar & Or</Col>
        </Row>
      </Container>
    </footer>
  );
};
