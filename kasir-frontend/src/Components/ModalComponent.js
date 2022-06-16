import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../Utils/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

function ModalComponent({
  handleClose,
  keranjangDetail,
  showModal,
  jumlah,
  keterangan,
  handleTambah,
  handleKurang,
  changeKeterangan,
  handlerSubmit,
  totalHarga,
  handlerHapusPesanan
}) {
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetail.product.nama} {" "}
            <strong>(Rp. {keranjangDetail.product.harga})</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(event) => handlerSubmit(event)}>
            <Form.Group className="mb-3" controlId="totalHarga">
              <Form.Label>Total Harga: </Form.Label>
              <br />
              <strong>Rp. {numberWithCommas(totalHarga)}</strong>
            </Form.Group>
            <Form.Group className="mb-3" controlId="jumlahPesanan">
              <Form.Label>Jumlah: </Form.Label>
              <br />
              <Button variant="danger" size="sm"className="me-3" onClick={ () => handleKurang()}>
              <FontAwesomeIcon icon={faMinus}/>
              </Button>
              <strong>{jumlah}</strong>
              <Button variant="primary" size="sm" className="ms-3" onClick={ () => handleTambah()}>
                <FontAwesomeIcon icon={faPlus}/>
              </Button>
              
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="keterangan"
            >
              <Form.Label>Keterangan</Form.Label>
              <Form.Control as="textarea" rows={3} value={keterangan} placeholder="Contoh: Pedes, Nasi Setengah"
              onChange={(event) => changeKeterangan(event)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handlerHapusPesanan(keranjangDetail.id)}>
            <FontAwesomeIcon icon={faTrash}/> Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kosong</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalComponent;
