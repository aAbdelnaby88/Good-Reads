import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col,Jumbotron } from "reactstrap";
import { Link } from "react-router-dom";

class Categories extends Component {
  render() {
    const { categories } = this.props;
    console.log("cc", Object.keys(categories));
    return (
      <div>
        
        <h2
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Categories
        </h2>
        <hr />
        <Row>
          {Object.keys(categories).map((_id) => (
            <Col key={_id} xs="6">
              <div>
                <Link to={"/categories/" + _id}>
                  <h3
                    style={{
                      color: "#b6e3e9",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {categories[_id].name}
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
  const { categoriesList } = state.categories;
  return { categories: categoriesList };
};

export default connect(mapStateToProps)(Categories);
