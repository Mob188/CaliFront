import {React, lazy, Suspense} from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Stock from "../src/containers/Stock/Stock";
// import AddStock from "../src/containers/AddStock/AddStock";
// import Home from "../src/containers/Home/Home";
// import NotFound from "./containers/NotFound/NotFound";
// import Menu from "./components/Menu/Menu";
const Stock = lazy(()=>import("../src/containers/Stock/Stock")) ;
const AddStock = lazy(()=>import("../src/containers/AddStock/AddStock")) ;
const Home = lazy(()=>import("../src/containers/Home/Home")) ;
const NotFound = lazy(()=>import("../src/containers/NotFound/NotFound")) ;
const Menu = lazy(()=>import("../src/components/Menu/Menu")) ;

export const AppRoutes = () =>{

    return (
        <Suspense fallback={'Loading '}>
          <BrowserRouter>
              <Menu />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/stock/page/:page" element={<Stock />} />
                <Route path="/addstock" element={<AddStock />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
        </Suspense>
      );

}