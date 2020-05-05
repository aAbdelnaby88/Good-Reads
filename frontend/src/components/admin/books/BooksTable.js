import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Button } from "reactstrap";

import { updateAdminProps, deleteBook } from "../../../actions/adminAction";

class BooksTable extends Component {
  editBookModal = (book, index) => {
    book.index = index;
    this.props.updateAdminProps([
      { prop: "currentBook", value: book },
      {
        prop: "isBookModal",
        value: !this.props.isModal,
      },
    ]);
  };

  renderActions = ({ original, index }) => {
    return (
      <div>
        <Button
          onClick={this.editBookModal.bind(this, original, index)}
          color="primary"
          style={{ marginRight: 10, marginLeft: 10 }}
        >
          <i className="fa fa-edit" />
        </Button>
        <Button
          color="danger"
          onClick={() => {
            if (window.confirm("Are you sure?")) {
              this.props.deleteBook(original._id, index);
            }
          }}
        >
          <i className="fa fa-trash" />
        </Button>
      </div>
    );
  };
  columns = [
    { Header: "Id", accessor: "_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Image", accessor: "image" },
    { Header: "Category", accessor: "category.name" },
    {
      Header: "Author",
      Cell: (info) => {
        if (!info.original.author) return;
        const { firstName, lastName } = info.original.author;
        return firstName + " " + lastName;
      },
    },
    {
      Header: "Actions",
      Cell: this.renderActions.bind(this),
      sortable: false,
    },
  ];

  render() {
    const { books } = this.props;

    return (
      <ReactTable
        defaultPageSize="5"
        columns={this.columns}
        data={books}
        getTdProps={() => {
          return {
            style: {
              display: "flex",
              justifyContent: "center",
            },
          };
        }}
      />
    );
  }
}
const mapStateToProps = (state) => {
  const { books, isBookModal } = state.admin;
  return { books, isModal: isBookModal };
};

export default connect(mapStateToProps, {
  updateAdminProps,
  deleteBook,
})(BooksTable);
