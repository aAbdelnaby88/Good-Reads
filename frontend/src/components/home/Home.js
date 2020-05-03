import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import NavbarForm from "./NavbarForm";
import RegisterForm from "./RegisterForm";
import HomeContent from "./HomeContent";
import { APP_NAME } from "../../constants";

export default class Home extends Component {
  componentDidMount() {
    document.title = `Home - ${APP_NAME}`;
  }
  render() {
    return (
      <Container>
        <NavbarForm />
        <Row>
          <Col xs="6">
            <HomeContent />
          </Col>
          <Col xs="6">
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    );
  }
}
