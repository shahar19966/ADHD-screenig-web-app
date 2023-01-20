import React,{useEffect} from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
} from "react-bootstrap";
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import "./Header.css";

export const Header = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {}, [userInfo]);

  return( <Navbar className="adhdNavbar" variant="dark" fixed="top" >
  <Container >
      <Navbar.Brand >
        <Link to='/' className="navLink">ADHD SCREENING</Link>
      </Navbar.Brand>
      {userInfo && (
        <>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto">
            </Nav>
            <Nav
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link className="navRight" href="/patients">Patients</Nav.Link>
              <NavDropdown className="navRight" title={`${userInfo.firstName}`} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>
                <NavDropdown.Item
                  onClick={logoutHandler}
                >
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </>
      )}
  </Container>
</Navbar>);
};
