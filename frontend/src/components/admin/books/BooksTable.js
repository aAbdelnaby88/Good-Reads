import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Button } from "reactstrap";

import { updateAdminProps } from "../../../actions/adminAction";

class BooksTable extends Component {
  editBookModal = (book) => {
    this.props.updateAdminProps([
      { prop: "currentBook", value: book },
      {
        prop: "isBookModal",
        value: !this.props.isModal,
      },
    ]);
  };

  renderActions = (info) => {
    return (
      <div>
        <Button
          onClick={this.editBookModal.bind(this, info.original)}
          color="primary"
          style={{ marginRight: 10, marginLeft: 10 }}
        >
          <i className="fa fa-edit" />
        </Button>
        <Button
          color="danger"
          onClick={() => {
            if (window.confirm("Are you sure?")) {
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
    { Header: "Author", accessor: "author.firstname" },
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
        pageSize={10}
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
})(BooksTable);
