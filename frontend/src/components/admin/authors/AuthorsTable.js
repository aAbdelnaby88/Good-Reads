import React, { Component, useM } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Button } from "reactstrap";

import { updateAdminProps } from "../../../actions/adminAction";

class AuthorsTable extends Component {
  editAuthorModal = (category) => {
    this.props.updateAdminProps([
      { prop: "currentAuthor", value: category },
      {
        prop: "isAuthorModal",
        value: !this.props.isModal,
      },
    ]);
  };

  renderActions = (info) => {
    return (
      <div>
        <Button
          onClick={this.editAuthorModal.bind(this, info.original)}
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
    { Header: "Firstname", accessor: "firstname" },
    { Header: "Lastname", accessor: "lastname" },
    { Header: "Image", accessor: "image" },
    { Header: "Date of birth", Cell: (info) => info.original.dob.toDateString() },

    {
      Header: "Actions",
      Cell: this.renderActions.bind(this),
      sortable: false,
    },
  ];

  render() {
    const { authors } = this.props;

    return (
      <ReactTable
        pageSize={10}
        columns={this.columns}
        data={authors}
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
  const { authors, isAuthorModal } = state.admin;
  return { authors, isModal: isAuthorModal };
};

export default connect(mapStateToProps, {
  updateAdminProps,
})(AuthorsTable);
