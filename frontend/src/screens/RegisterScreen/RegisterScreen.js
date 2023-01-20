import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";
import { register } from "../../actions/userActions";
import buttons from "../../styles/buttons.css";
import { useDispatch, useSelector } from "react-redux";

const registerScreen = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      console.log("hi");
      navigate("/patients");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else dispatch(register(firstName, lastName, email, password));
    /*if (password !== confirmpassword)
    {
      setMessage("Password Do not Match");
    } else {
      setMessage(null);

    
      try {
        const config = {
            headers: {
                "Content-type":"application/json"
            }
        }
        setLoading(true)
        const { data } = await axios.post("/api/users",
            {
              firstName,
              lastName,
              email,
              password
            },
            config
        
        );
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false)
    } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
    }*/
  };

  return (
    <MainScreen title="Register">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="first name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="form-control-reg"
              type="firstName"
              value={firstName}
              placeholder="Enter first name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="last name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="form-control-reg"
              type="lastName"
              value={lastName}
              placeholder="Enter last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="form-control-reg"
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="form-control-reg"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="input-reg" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="form-control-reg"
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button className="mainBtn" variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default registerScreen;
