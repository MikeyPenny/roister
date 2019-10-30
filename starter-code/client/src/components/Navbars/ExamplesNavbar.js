import React from "react";
import {getUser, logout} from "../../auth/auth";
import {Link} from "react-router-dom";
import {
  Collapse,
  Button,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

function handleLogout(){
  logout()
}

function ExamplesNavbar(props) {
  var user = getUser();

  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen
      ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) 
      : null}
      <Navbar className={`fixed-top ${navbarColor} ${props.className}`} color="info" expand="lg">
        <Container>
          <div className="navbar-translate">
          <Link to="/Login">
            <Button 
              target="_blank" 
              id="navbar-brand" 
              color="primary">
              Roister
              </Button>
          </Link>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
            <>{user
            ? <>
              <NavItem>
                <NavLink href="/createprofile">
                  Profile
              </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/createproject">
                  Create Project
              </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/">
                  About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={()=> handleLogout()}>
                Logout
              </NavLink>
            </NavItem>
              </>
            : <>
              <NavItem>
              <NavLink href="/">
                  Contact
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">
                  About Us
                </NavLink>
              </NavItem>
              </>
            }</>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ExamplesNavbar;
