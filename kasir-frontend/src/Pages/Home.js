import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import {
  ListCategories,
  ListResult,
  Menus,
} from "../Components";
import axios from "axios";
import { API_URL } from "../Utils/constants";
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      pilihCategory: "Makanan",
      keranjangs: []
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.pilihCategory)
      .then((res) => {
        const products = res.data;
        this.setState({ products });
      });

    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      });
  }

  componentDidUpdate(prevState){
    if(this.state.keranjangs !== prevState.keranjangs){
      axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      });
    }
  }

  ubahCategory = (value) => {
    this.setState({
      pilihCategory: value,
      products: [],
    });

    axios.get(API_URL + "products?category.nama=" + value).then((res) => {
      const products = res.data;
      this.setState({ products });
    });
  };

  masukKeranjang = (value) => {
    axios.get(API_URL + "keranjangs?product.id=" + value.id).then((res) => {
      if (res.data.length === 0) {
        const data = {
          jumlah: 1,
          total_harga: value.harga,
          product: value
        }

        axios.post(API_URL + "keranjangs", data).then((res) => {
          swal({
            title: "Sukses Masuk Keranjang!",
            text: value.nama,
            icon: "success",
            button: false,
            timer: 1500
          });
        });
      } else {
        const data = {
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value
        }

        axios.put(API_URL + "keranjangs/"+ res.data[0].id, data).then((res) => {
          swal({
            title: "Sukses Masuk Keranjang!",
            text: data.product.nama,
            icon: "success",
            button: false,
            timer: 1500
          });
        });
      }
    });
  };

  render() {
    const { products, keranjangs } = this.state;
    return (
      <div className="App">
        <div className="mt-3 px-2">
          <Row>
            <ListCategories
              ubahCategory={this.ubahCategory}
              pilihCategory={this.state.pilihCategory}
            />

            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {products.map((m) => (
                  <Menus key={m.id} menus={m} masukKeranjang={this.masukKeranjang} />
                ))}
              </Row>
            </Col>

            <ListResult keranjangs={keranjangs} />
          </Row>
        </div>
      </div>
    );
  }
}
