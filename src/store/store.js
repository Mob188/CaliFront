import {configureStore} from "@reduxjs/toolkit";
import { productsSlice } from "./slices/products/prodcutsSlice";

export const store=configureStore({
    reducer:{
        products: productsSlice.reducer,
    }
})
