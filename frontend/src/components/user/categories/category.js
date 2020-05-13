import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardImg,
  Jumbotron,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";

import { HOST } from "../../../utils";
import { getCategory } from "../../../actions/categoriesActions";

class Category extends Component {
  componentDidMount() {}
  render() {
    const { category } = this.props;

    if (!category) return <div></div>;

    const { name, books } = category;
    return (
      <div>
        <Jumbotron
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#ffffe6",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {name}
          </h2>
        </Jumbotron>
        <Row>
          {books &&
            books.map(({ _id, name, author, image }, index) => (
              <Col style={{ marginBottom: "20px" }} key={_id} xs="3">
                <Card>
                  <Link to={`/books/${_id}`}>
                    <CardImg
                      top
                      height="300p"
                      src={`${HOST}/images/${image}`}
                      alt={name}
                    />
                  </Link>
                  <CardBody>
                    <CardTitle>
                      Name: <Link to={`/books/${_id}`}>{name}</Link>
                    </CardTitle>
                    <CardSubtitle>
                      Auther:{" "}
                      <Link to={`/authors/${author._id}`}>
                        {author.firstName + " " + author.lastName}
                      </Link>
                    </CardSubtitle>
                  </CardBody>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const category = state.categories.categoriesList[ownProps.match.params.id];
  return { category };
};

export default connect(mapStateToProps, { getCategory })(Category);
