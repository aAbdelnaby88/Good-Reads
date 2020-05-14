import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import {
  Row,
  Col,
  Media,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import Rating from "react-star-ratings";

import { HOST } from "../../../utils";
import { getBook, submitRate, updateRate } from "../../../actions/booksActions";
export class Book extends Component {
  componentDidMount() {
    const _id = this.props.match.params.id;
    this.props.getBook(_id);
  }
  render() {
    const {
      _id,
      name,
      author,
      category,
      image,
      myRate,
      rates,
    } = this.props.book;

    let userRateIndex = -1;
    let rate = rates
      ? rates.reduce((sum, rate, index) => {
          if (myRate && myRate._id === rate._id) userRateIndex = index;
          return sum + rate.value;
        }, 0)
      : 0;
    rate /= rates ? rates.length : 1;
    return (
      <div>
        <Row>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            xs="3"
          >
            <Media
              object
              width="100%"
              height="300px"
              src={`${HOST}/images/${image}`}
              alt={name}
            />
            <div style={{ width: "80%" }}>
              <Select
                options={["want to read", "reading", "read"]}
                getOptionLabel={(label) => label}
              />
            </div>
            <Rating
              rating={myRate ? myRate.value : 0}
              starHoverColor="#ffe680"
              starRatedColor="#ffe680"
              changeRating={(value) => {
                myRate
                  ? this.props.updateRate(myRate._id, value, userRateIndex)
                  : this.props.submitRate(_id, value);
              }}
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="5px"
            />
          </Col>
          <Col xm="8">
            <h2>
              Title:{" "}
              <i
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {name}
              </i>
            </h2>
            <h5>
              By:{" "}
              {author && (
                <Link to={`/authors/${author._id}`}>
                  {author.firstName + " " + author.lastName}
                </Link>
              )}
            </h5>
            <h5 style={{ fontWeight: "bold", textTransform: "uppercase" }}>
              {category && (
                <Link to={`/categories/${category._id}`}>{category.name}</Link>
              )}
            </h5>
            <Rating
              rating={rate ? rate : 0}
              starRatedColor="#ffe680"
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="5px"
            />

            <p>
              {rate} - {rates ? rates.length : 0} ratings
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <CardTitle style={{ fontWeight: "bold" }}>
                    <h4>Muhammad Alsaied</h4>
                  </CardTitle>
                  <Button className="btn btn-danger">
                    <i className="fa fa-trash"></i>
                  </Button>
                </div>
                <CardSubtitle style={{ textDecoration: "underline" }}>
                  {new Date().toDateString()}
                </CardSubtitle>

                <br />
                <CardText style={{ textTransform: "capitalize" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent condimentum purus ligula, quis porta diam fringilla
                  vel. Mauris quis diam a quam maximus mattis ornare et purus.
                  Interdum et malesuada fames ac ante ipsum primis in faucibus.
                  Proin ac sagittis urna, vitae interdum metus. Praesent in
                  lacus augue. Ut diam lorem, porta quis imperdiet sit amet,
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const book = state.books.currentBook;

  return { book };
};

export default connect(mapStateToProps, { getBook, submitRate, updateRate })(
  Book
);
