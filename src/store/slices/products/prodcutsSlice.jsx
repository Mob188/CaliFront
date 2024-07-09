import { createSlice } from "@reduxjs/toolkit";

const initialErrors = {
  descripcion: "",
  cantidad: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    paginator: {},
    showModal: false,
    errors: initialErrors,
    edit: {},
    buscar: "",
  },
  reducers: {
    addProduct: (state, action) => {
      state.products = [
        ...state.products,
        {
          ...action.payload,
        },
      ];
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    searchProduct: (state, action) => {
      state.products = action.payload.data.filter((product) =>
        product.descripcion.includes(action.payload.itemBuscar)
      );
      state.buscar = action.payload.itemBuscar;
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((p) => {
        if (p.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return p;
      });
      state.showModal = false;
    },
    loadingProducts: (state, action) => {
      console.log(action.payload)
      state.products = action.payload.content;
      state.paginator = action.payload;
      state.buscar = "";
    },
    openModal: (state, action) => {
      state.edit = action.payload;
      state.showModal = true;
    },
    closeModal: (state, action) => {
      state.showModal = false;
    },
    setError: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const {
  addProduct,
  loadingProducts,
  searchProduct,
  removeProduct,
  updateProduct,
  openModal,
  closeModal,
  setError,
} = productsSlice.actions;
