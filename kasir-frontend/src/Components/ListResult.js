import axios from "axios";
import React, { Component } from "react";
import { ListGroup, Badge, Col, Row, Card } from "react-bootstrap";
import { API_URL } from "../Utils/constants";
import { numberWithCommas } from "../Utils/Utils";
import ModalComponent from "./ModalComponent";
import TotalBayar from "./TotalBayar";
import swal from "sweetalert";

export default class ListResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (keranjangs) => {
    this.setState({
      showModal: true,
      keranjangDetail: keranjangs,
      jumlah: keranjangs.jumlah,
      totalHarga: keranjangs.total_harga,
      keterangan: keranjangs.keterangan,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  handleTambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  handleKurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeKeterangan = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handlerSubmit = (event) => {
    event.preventDefault();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getUpdateKeranjang();
        swal({
          title: "Sukses Update Keranjang!",
          text: data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      });
  };

  handlerHapusPesanan = (id) => {
    this.setState({
      showModal: false,
    });

    axios.delete(API_URL + "keranjangs/" + id).then((res) => {
      this.props.getUpdateKeranjang();
      swal({
        title: "Sukses Hapus Keranjang!",
        text: this.state.keranjangDetail.product.nama,
        icon: "error",
        button: false,
        timer: 1500,
      });
    });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className="mt-2">
        <h4>
          <strong>Hasil Pesanan</strong>
        </h4>
        <hr />
            {keranjangs.length !== 0 && (
              <Card className="overflow-auto hasil">
              <ListGroup variant="flush">
              {keranjangs.map((k) => (
                <ListGroup.Item key={k.id} onClick={() => this.handleShow(k)}>
                  <Row>
                    <Col xs={2}>
                      <Badge pill bg="success">
                        {k.jumlah}
                      </Badge>
                    </Col>
                    <Col>
                      <h5>{k.product.nama}</h5>
                      <p>Rp. {numberWithCommas(k.product.harga)}</p>
                    </Col>
                    <Col>
                      <strong className="float-end">
                        Rp. {numberWithCommas(k.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

            <ModalComponent
              handleClose={this.handleClose}
              {...this.state}
              handleTambah={this.handleTambah}
              handleKurang={this.handleKurang}
              changeKeterangan={this.changeKeterangan}
              handlerSubmit={this.handlerSubmit}
              totalHarga={this.state.totalHarga}
              handlerHapusPesanan={this.handlerHapusPesanan}
            />
            </ListGroup> 
           </Card> 
          )}

        <TotalBayar keranjangs={keranjangs} />
      </Col>
    );
  }
}
