import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
// import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import buttons from "../../styles/buttons.css";

const ProfileScreen = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
        navigate("/");
    } else {
      setFirstName(userInfo.firstName);
        setEmail(userInfo.email);
        setLastName(userInfo.lastName);
    }
  }, [navigate, userInfo]);

 

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ firstName,lastName, email, password }));
  };

  return (
    <MainScreen title="Profile">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
                          </Form.Group>
                          <br/>
              <Button className="editBtn" type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;