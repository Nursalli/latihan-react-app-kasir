import React, { Component } from "react";
import { Col } from "react-bootstrap";

export default class ListResult extends Component {
  render() {
    return (
      <Col md={3}>
        <h4>
          <strong>Hasil Pesanan</strong>
        </h4>
        <hr />
      </Col>
    );
  }
}
