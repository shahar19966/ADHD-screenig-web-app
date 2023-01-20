import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPatientAction } from "../../actions/patientsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import buttons from "../../styles/buttons.css";

function CreatePatient() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [firstName, setFirstName] = useState("");
  const [category, setCategory] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gander, setGander] = useState("male");
  const [email, setEmail] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [report, setReport] = useState("");
  const [medicines, setMedicines] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const patientCreate = useSelector((state) => state.patientCreate);
  const { loading, error, patient } = patientCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setDateOfBirth("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setMedicines("");
    setGander("");
    setRecommendation("");
    setReport("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createPatientAction(
        firstName,
        lastName,
        id,
        dateOfBirth,
        gander,
        email,
        recommendation,
        medicines
      )
    );
    if (!firstName || !lastName || !id || !dateOfBirth || !gander || !email)
      return;

    resetHandler();
    navigate("/patients");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Patient">
      <Card>
        <Card.Header>ADD NEW PATIENT</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>First Name </Form.Label>
              <Form.Control
                type="firstName"
                value={firstName}
                placeholder="Enter first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name </Form.Label>
              <Form.Control
                type="lastName"
                value={lastName}
                placeholder="Enter last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>ID </Form.Label>
              <Form.Control
                type="id"
                value={id}
                placeholder="Enter ID"
                onChange={(e) => setId(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Gender </Form.Label>

              <Form.Select
                className="from-select"
                style={{ margin: 10 }}
                type="gander"
                value={gander}
                placeholder="Enter gender"
                onChange={(e) => setGander(e.target.value)}
              >
                <option>male</option>
                <option>female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                style={{ width: 130 }}
                type="date"
                selected={dateOfBirth}
                placeholder="Enter the date"
                format="YYYY-MM-DD"
                onChange={(e) => {
                  setDateOfBirth(e.target.valueAsDate);

                  console.log(dateOfBirth);
                }}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <br />
            {loading && <Loading size={50} />}
            <Button type="submit" className="mainBtn" variant="primary">
              Add
            </Button>
            <Button className="mx-2 secondBtn" onClick={resetHandler}>
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreatePatient;
