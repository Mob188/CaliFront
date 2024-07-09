import { React, useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { openModal } from "../../store/slices/products/prodcutsSlice";
import { useProducts } from "../../hooks/useProducts";

const TableBody = () => {
  const { products, handlerRemoveProduct, handleOpenModal, handleRestar } = useProducts();
  const [inputValues, setInputValues] = useState({});

  const Restar = (producto, restar, e) => {
    const result = {
      id: producto.id,
      descripcion: producto.descripcion,
      cantidad: producto.cantidad - restar,
    };
    handleRestar(result);
    setInputValues({ ...inputValues, [producto.id]: 1 });
  };

  const handleInputChange = (productId, value) => {
    setInputValues({ ...inputValues, [productId]: value });
  };

  return products.map((product) => {
    return (
      <tr key={`tr-${product.id}`}>
        <td>{product.id}</td>
        <td>{product.descripcion}</td>
        <td>{product.cantidad}</td>
        <td>
          <input
            name="valor"
            type="number"
            min={1}
            value={inputValues[product.id] || 1}
            onChange={(e) => handleInputChange(product.id, e.target.value)}
          />{" "}
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => Restar(product, inputValues[product.id] || 1, e)}
          >
            -
          </button>{" "}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleOpenModal(product)}
          >
            Editar
          </button>{" "}
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handlerRemoveProduct(product)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    );
  });
};
const TableStock = (props) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Id</th>
          <th>Descripcion</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>{TableBody(props)}</tbody>
    </Table>
  );
};

export default TableStock;
