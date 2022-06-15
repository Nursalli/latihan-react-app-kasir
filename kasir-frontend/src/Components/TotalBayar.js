import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../Utils/Utils";
import axios from 'axios';
import { API_URL } from "../Utils/constants";

export default class TotalBayar extends Component {
    pesan = (totalHarga) => {
        const pesanan = {
            total_bayar: totalHarga,
            menus: this.props.keranjangs
        }

        axios.post(API_URL + "pesanans", pesanan)
            .then((res) => {
                window.location="/sukses"
            })
    }   

  render() {
    const { keranjangs } = this.props;
    const totalHarga = keranjangs.reduce((result, k) => {
      return result + k.total_harga;
    }, 0);

    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <p>
              Total Bayar:{" "}
              <strong className="float-end me-2">
                {numberWithCommas(totalHarga)}
              </strong>{" "}
            </p>
            <div className="d-grid gap-2">
              <Button variant="primary" className="mt-1 mb-3" size="lg" onClick={ () => this.pesan(totalHarga)}>
                Bayar
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
