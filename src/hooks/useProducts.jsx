import Swal from "sweetalert2";
import {
  findAll,
  remove,
  save,
  update,
  findAllPages,
} from "../services/productService";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  updateProduct,
  loadingProducts,
  removeProduct,
  searchProduct,
  openModal,
  closeModal,
  setError,
} from "../store/slices/products/prodcutsSlice";
import { useNavigate } from "react-router-dom";

export const useProducts = () => {
  const { products, errors, showModal, edit, paginator, buscar } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toEdit = async (product) => {
    const result = await findAll();
    const data = result.data.filter(
      (producto) => producto.descripcion == product.descripcion
    );
    dispatch(openModal(data[0]));
  };

  const getProducts = async (page = 0) => {
    
    const result = await findAllPages(page);
    
    result.data.content.length!==0?
    dispatch(loadingProducts(result.data)):
    navigate('/notfound');
  };

  const handlerSearchProduct = async (itemBuscar, page) => {
    const result = await findAll();
    const payload = {
      data: result.data,
      itemBuscar,
    };
    itemBuscar.trim() !== ""
      ? dispatch(searchProduct(payload))
      : getProducts(page);
  };

  const handlerAddProduct = async (product) => {
    let response;
    try {
      response = await save(product);
      console.log(response.data);

      dispatch(addProduct(response.data));

      Swal.fire(
        "Producto Creado",

        "El producto ha sido creado con exito!",

        "success"
      );
      navigate("/stock");
    } catch (error) {
      if (error.response && error.response.status == 400) {
        dispatch(setError(error.response.data));
      } else if (
        error.response &&
        error.response.status == 500 &&
        error.response.data?.message?.includes("constraint")
      ) {
        if (error.response.data?.message?.includes("descripcion_unico")) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "editar",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/stock");
              toEdit(product);
            }
          });
        }
      } else {
        throw error;
      }
    }
  };

  const handlerUpdateProduct = async (product) => {
    let response;
    try {
      response = await update(product);

      dispatch(updateProduct(response.data)),
        Swal.fire(
          "Producto Actualizado",
          "El producto ha sido actualizado con exito!",
          "success"
        );
      dispatch(setError({}));
      handleCloseModal();
    } catch (error) {
      if (error.response && error.response.status == 400) {
        dispatch(setError(error.response.data));
      } else if (
        error.response &&
        error.response.status == 500 &&
        error.response.data?.message?.includes("constraint")
      ) {
        if (error.response.data?.message?.includes("descripcion_unico")) {
          dispatch(setError({ descripcion: "Este producto ya existe" }));
        }
      } else throw error;
    }
  };

  const handlerRemoveProduct = ({ id }) => {
    Swal.fire({
      title: "Esta seguro que desea eliminar?",
      text: "Cuidado el producto sera eliminado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        remove(id);
        dispatch(removeProduct(id));

        Swal.fire(
          "Producto Eliminado!",
          "El producto ha sido eliminado con exito!",
          "success"
        );
      }
    });
  };

  const handleRestar = async (product) => {
    let response;
    try {
      response = await update(product);

      dispatch(updateProduct(response.data)), dispatch(setError({}));
      response.data.cantidad <= 5 &&
        Swal.fire({
          icon: "warning",
          title: "Atención",
          text: "El stock de este producto es bajo, se recomienda reponerlo",
        });
    } catch (error) {
      if (error.response && error.response.status == 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.cantidad,
        });
      } else throw error;
    }
  };

  const handleOpenModal = (product) => {
    dispatch(setError({}));
    dispatch(openModal(product));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(setError({}));
  };

  return {
    products,
    handlerAddProduct,
    handlerRemoveProduct,
    handlerUpdateProduct,
    getProducts,
    handleOpenModal,
    handleCloseModal,
    showModal,
    handleRestar,
    handlerSearchProduct,
    errors,
    edit,
    paginator,
    buscar,
    toEdit,
  };
};
