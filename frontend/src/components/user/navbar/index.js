import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

class MainNavbar extends Component {
  render() {
    const { email, password } = this.props;
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/dashboard">
          Good Reads
        </NavbarBrand>

        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/categories" tag={Link}>
                Categories
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <Nav className="ml-auto" navbar></Nav>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => {
  const {} = state;
  return {};
};

export default connect(mapStateToProps)(MainNavbar);
