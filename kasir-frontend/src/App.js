import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { ListCategories, ListResult, NavbarComponent, Menus } from "./Components";
import axios from 'axios';
import { API_URL } from './Utils/constants';
export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       makanans: []
    }
  }

  componentDidMount() {
    axios.get(API_URL + "products")
      .then(res => {
        const makanans = res.data;
        this.setState({ makanans });
      })
  }

  render() {
    const {makanans} = this.state;
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-3 px-2">
          <Row>
            <ListCategories />

            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {makanans.map(m => (
                  <Menus key={m.id} menus={m} />
                ))}
              </Row>
            </Col>

            <ListResult />
          </Row>
        </div>
      </div>
    );
  }
}
