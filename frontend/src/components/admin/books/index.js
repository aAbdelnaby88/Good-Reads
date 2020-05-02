import React, { Component, useM } from "react";
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
  FormGroup,
  CustomInput,
} from "reactstrap";
import Select from "react-select";

import Table from "./BooksTable";

import { updateAdminProps } from "../../../actions/adminAction";

class Books extends Component {
  toggle = () => {
    this.props.updateAdminProps([
      {
        prop: "currentBook",
        value: { name: "" },
      },
      {
        prop: "isBookModal",
        value: !this.props.isModal,
      },
    ]);
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.props.updateAdminProps([{ prop: "currentBook." + name, value }]);
  };
  onSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    const { isModal, currentBook, categories, authors } = this.props;
    const { name, author, category, image } = currentBook;

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
            <ModalHeader toggle={this.toggle}>Book</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  placeholder="book name"
                  value={name}
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
                <Select
                  value={category}
                  placeholder="Select Category"
                  options={categories}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option._id}
                  onChange={(value) =>
                    this.props.updateAdminProps([
                      { prop: "currentBook.category", value },
                    ])
                  }
                />
              </FormGroup>
              <FormGroup>
                <Select
                  value={author}
                  placeholder="Select author"
                  options={authors}
                  getOptionLabel={({ firstname, lastname }) =>
                    `${firstname} ${lastname}`
                  }
                  getOptionValue={(option) => option._id}
                  onChange={(value) =>
                    this.props.updateAdminProps([
                      { prop: "currentBook.author", value },
                    ])
                  }
                />
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
  const { isBookModal, currentBook, categories, authors } = state.admin;
  return { isModal: isBookModal, currentBook, categories, authors };
};

export default connect(mapStateToProps, {
  updateAdminProps,
})(Books);
