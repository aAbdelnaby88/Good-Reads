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
  FormGroup,
  CustomInput,
} from "reactstrap";
import Select from "react-select";

import Table from "./BooksTable";

import {
  updateAdminProps,
  addNewBook,
  updateBook,
} from "../../../actions/adminAction";

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
  onChangeImage = (e) => {
    const image = e.target.files[0];
    this.props.updateAdminProps([{ prop: "currentBook.image", value: image }]);
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { addNewBook, updateBook, currentBook } = this.props;
    currentBook._id
      ? updateBook(currentBook, currentBook.index)
      : addNewBook(currentBook);
  };
  render() {
    const { isModal, currentBook, categories, authors } = this.props;
    const { _id, name, author, category } = currentBook;
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
              {!_id && (
                <FormGroup>
                  <CustomInput
                    id="image"
                    type="file"
                    name="image"
                    placeholder="choose image"
                    onChange={this.onChangeImage}
                    /*                   value={image}
                     */
                  />
                </FormGroup>
              )}
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
                  getOptionLabel={({ firstName, lastName }) =>
                    `${firstName} ${lastName}`
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
  addNewBook,
  updateBook,
})(Books);
