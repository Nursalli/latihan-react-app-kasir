import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../Utils/constants";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCoffee, faCheese } from "@fortawesome/free-solid-svg-icons";

const Icons = (({nama}) => {
  if(nama === 'Makanan') {
    return <FontAwesomeIcon icon={faUtensils} className="me-2" />
  }
  if(nama === 'Minuman') {
    return <FontAwesomeIcon icon={faCoffee} />
  }
  if(nama === 'Cemilan') {
    return <FontAwesomeIcon icon={faCheese} className="me-1" />
  }
})
export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios.get(API_URL + "categories")
      .then((res) => {
      const categories = res.data;
      this.setState({
        categories,
      });
    });
  }

  render() {
    const { categories } = this.state;
    const { ubahCategory, pilihCategory } = this.props;
    return (
      <Col md={2}>
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories && categories.map(c => (
            <ListGroup.Item 
            key={c.id}
            onClick={() => ubahCategory(c.nama)}
            className={ pilihCategory === c.nama && 'category-aktif'}
            style={ { cursor: 'pointer' } }> 
             <h5><Icons nama={c.nama} /> { c.nama }</h5> </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    );
  }
}
