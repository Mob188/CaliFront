import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";

function ModalEditar(props) {
  const { handlerUpdateProduct, errors, handleCloseModal, edit, showModal } = useProducts();
 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(edit);
    const data = new FormData(e.target);
    const descripcion = data.get("descripcion");
    const cantidad = Number(data.get("cantidad")) + Number(edit.cantidad);
    const product = { id: edit.id, descripcion, cantidad };
    handlerUpdateProduct(product);
    
  };

  return (
    <>
      <Modal
        size="lg"
        backdrop="static"
        show={showModal}
        onHide={handleCloseModal}
        centered={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                defaultValue={edit.descripcion}
              />
              <p className="text-danger">{errors?.descripcion}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInt">
              <Form.Label>Agrega stock</Form.Label>
              <Form.Control type="number" name="cantidad" min={0}/>
            </Form.Group>

            <Form.Group className="d-flex gap-2 flex-row-reverse">
              <Button variant="success" type="submit">
                Guardar cambios
              </Button>
              <Button variant="danger" onClick={handleCloseModal}>
                Cancelar
              </Button>
            </Form.Group>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditar;
