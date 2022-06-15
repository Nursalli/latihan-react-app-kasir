import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../Utils/constants';
export default class Sukses extends Component {
  componentDidMount() {
    axios.get(API_URL + "keranjangs")
      .then((res) => {
        const data = res.data
        data.map((d) => {
          return axios.delete(API_URL+"keranjangs/"+ d.id)
                .then((res) => {
                  console.log(res);
                })
        })
      })
  }

  render() {
    return (
      <div className="mt-3 text-center">
        <Image src="assets/images/sukses.png" width={500} />
        <h3>Sukses Pesan</h3>
        <p>Terima Kasih Sudah Memesan!</p>
        <Button variant="primary" as={Link} to="/">
            Kembali
        </Button>
      </div>
    )
  }
}
