import React from "react";
import { Card, Col } from "react-bootstrap";
import { numberWithCommas } from "../Utils/Utils";

function Menus({menus, masukKeranjang}) {
  return (
    <Col md={4} xs={6} className="mb-4" style={{ cursor: 'pointer' }}>
      <Card className="shadow" onClick={() => masukKeranjang(menus)}>
        <Card.Img variant="top" src={"assets/images/"+ menus.category.nama.toString() + "/" + menus.gambar} />
        <Card.Body>
          <Card.Title>{menus.nama} <strong>({menus.kode})</strong></Card.Title>
          <Card.Text>
            Rp. {numberWithCommas(menus.harga)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Menus;
