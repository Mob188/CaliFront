import { React, useState, useEffect, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import { useProducts } from "../../hooks/useProducts";

const StyledFormContainer = styled.div`
  border-radius: 23px;
  
  background-color:black;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:30px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #ccc;
  box-shadow: 0 0 25px rgba(0, 0, 0, 20);
`;
const CustomInput = styled(Form.Control)`
  border-color: #007bff;
  width: 500px;
  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;
const CustomLabel = styled(Form.Label)`
  color: white;
`;
const AddItem = (item) => {
  const { handlerAddProduct, errors } = useProducts();

  const handleChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const descripcion = data.get("descripcion").trim();
    const cantidad = data.get("cantidad").trim();
    const product = { descripcion, cantidad };

    handlerAddProduct(product);
  };

  return (
    <StyledFormContainer>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <CustomLabel>Nombre producto:</CustomLabel>
          <CustomInput
            type="text"
            name="descripcion"
            placeholder="Digita la descripción del producto"
            onChange={handleChange}
          />
          <p className="text-danger">{errors?.descripcion}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicInt">
          <CustomLabel>Cantidad:</CustomLabel>
          <CustomInput
            type="number"
            name="cantidad"
            placeholder="Digita la cantidad"
            onChange={handleChange}
          />
          <p className="text-danger">{errors?.cantidad}</p>
        </Form.Group>

        <Button variant="primary" type="submit">
          Añadir
        </Button>
      </form>
    </StyledFormContainer>
  );
};

export default AddItem;
