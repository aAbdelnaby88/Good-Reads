import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import { Link } from "react-router-dom";
import { HOST } from "../../../utils";

export default function Book({ _id, name, image, author }) {
  return (
    <Card>
      <Link to={`/books/${_id}`}>
        <CardImg top height="300p" src={`${HOST}/images/${image}`} alt={name} />
      </Link>
      <CardBody>
        <CardTitle>
          Name: <Link to={`/books/${_id}`}>{name}</Link>
        </CardTitle>
        <CardSubtitle>
          By:{" "}
          <Link to={`/authors/${author._id}`}>
            {author.firstName + " " + author.lastName}
          </Link>
        </CardSubtitle>
      </CardBody>
    </Card>
  );
}
