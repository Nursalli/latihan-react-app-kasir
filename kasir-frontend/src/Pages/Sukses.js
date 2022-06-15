import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Sukses extends Component {
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
