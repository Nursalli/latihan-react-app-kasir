import React, { Component } from "react";
import { ListGroup, Badge, Col, Row } from "react-bootstrap";
import { numberWithCommas } from '../Utils/Utils';

export default class ListResult extends Component {
  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3}>
        <h4>
          <strong>Hasil Pesanan</strong>
        </h4>
        <hr />
        <ListGroup>
          {keranjangs && keranjangs.map((k) => (
            <ListGroup.Item key={k.id}>
              <Row>
                <Col xs={2}>
                  <Badge pill bg="success">{k.jumlah}</Badge>
                </Col>
                <Col>
                  <h5>{k.product.nama}</h5>
                  <p>Rp. {numberWithCommas(k.product.harga)}</p>
                </Col>
                <Col>
                  <strong className="float-end">Rp. {numberWithCommas(k.total_harga)}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    );
  }
}
