import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  CustomInput,
  FormGroup,
} from "reactstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./customDatePickerWidth.css";

import Table from "./AuthorsTable";

import { updateAdminProps } from "../../../actions/adminAction";

class Authors extends Component {
  toggle = () => {
    this.props.updateAdminProps([
      {
        prop: "currentAuthor",
        value: { dob: new Date() },
      },
      {
        prop: "isAuthorModal",
        value: !this.props.isModal,
      },
    ]);
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.props.updateAdminProps([{ prop: "currentAuthor." + name, value }]);
  };
  onSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    const { isModal, currentAuthor } = this.props;
    const { firstname, lastname, dob, image } = currentAuthor;
    return (
      <div>
        <Row>
          <Col
            sm="12"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "20px",
            }}
          >
            <Button color="success" onClick={this.toggle}>
              <i className="fa fa-plus" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Table />
          </Col>
        </Row>

        <Modal isOpen={isModal} toggle={this.toggle}>
          <Form onSubmit={this.onSubmit} method="POST">
            <ModalHeader toggle={this.toggle}>Author</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={firstname}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <CustomInput
                  id="image"
                  type="file"
                  name="image"
                  placeholder="choose image"
                  onChange={this.onChange}
                  value={image}
                />
              </FormGroup>
              <FormGroup>
                <div className="customDatePickerWidth">
                  <DatePicker
                    selected={dob}
                    name="dob"
                    dateFormat="dd/MM/yyyy"
                    onChange={(value) =>
                      this.props.updateAdminProps([
                        { prop: "currentAuthor.dob", value },
                      ])
                    }
                  />
                </div>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isAuthorModal, currentAuthor } = state.admin;
  return { isModal: isAuthorModal, currentAuthor };
};

export default connect(mapStateToProps, {
  updateAdminProps,
})(Authors);
