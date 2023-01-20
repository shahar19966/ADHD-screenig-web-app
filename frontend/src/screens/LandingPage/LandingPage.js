import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/patients");
    }
  }, [navigate]);

  return (
    <div className="landingMain">
      <div className="intro-text">
        <h1 className="welcomeTitle">Welcome</h1>
        {/* <p className="subtitle">ADHD SCREENING PLATFORM</p> */}
        <div className="buttonContainer">
          <a href="/register">
            <Button size="lg" className="SignUpBtn welcomeBtn">
              Sign up
            </Button>
          </a>
          <a href="/login">
            <Button size="lg" className="LoginBtn welcomeBtn">
              Login
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
