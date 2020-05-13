import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class Categories extends Component {
  render() {
    const { categories } = this.props;
    return (
      <div>
        <h2>Categories</h2>
        <hr />
        <Row>
          {categories.map(({ _id, name }) => (
            <Col xs="6">
              <div>
                <Link to={"/categories/" + _id}>
                  <h3
                    style={{
                      color: "#b6e3e9",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {name}
                  </h3>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { categories } = state.categories;
  return { categories };
};

export default connect(mapStateToProps)(Categories);
