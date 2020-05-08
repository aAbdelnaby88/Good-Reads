import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Form,
  Input,
  NavbarToggler,
} from "reactstrap";
import { Link } from "react-router-dom";

class MainNavbar extends Component {
  constructor() {
    super();
    this.state = { isOpen: false };
  }
  render() {
    const toggle = () => this.setState({ isOpen: !this.state.isOpen });

    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/dashboard">
          Good Reads
        </NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/categories" tag={Link}>
                Categories
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/books" tag={Link}>
                Books
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/authors" tag={Link}>
                Authors
              </NavLink>
            </NavItem>
            <NavItem className="offset-md-1  col-8"  >
              <Form>
                <Input size="40" type="text" placeholder="Type book name" />
              </Form>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar></Nav>
        </Collapse>
        <NavbarToggler onClick={toggle} />
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => {
  const {} = state;
  return {};
};

export default connect(mapStateToProps)(MainNavbar);
