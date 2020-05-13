import React, { Component } from "react";
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
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

import { HOST } from "../../../utils";
import { logoutUser } from "../../../actions/loginActions";

class MainNavbar extends Component {
  constructor() {
    super();
    this.state = { isOpen: false };
  }
  render() {
    const { image } = this.props.user;
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
            <NavItem className="offset-md-1  col-8">
              <Form>
                <Input size="40" type="text" placeholder="Type book name" />
              </Form>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <img
                src={`${HOST}/images/${image}`}
                style={{ width: "50px", height: "40px" }}
                className="rounded-circle"
              />
            </NavItem>
            <NavItem className="offset-md-1  col-12">
              <Button onClick={this.props.logoutUser}>
                <i className="fa fa-sign-out"></i>
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
        <NavbarToggler onClick={toggle} />
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => {
  const { user } = state.login;
  return { user };
};

export default connect(mapStateToProps, { logoutUser })(MainNavbar);
