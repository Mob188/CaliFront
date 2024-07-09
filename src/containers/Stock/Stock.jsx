import React from "react";
import { useEffect, useState } from "react";
import EditarModal from "../../components/Modals/EditarModal";
import TableStock from "../../components/Tables/TableStock";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useProducts } from "../../hooks/useProducts";
import { useParams } from "react-router-dom";
import  Paginator  from "../../components/Paginator/Paginator"
import { findAll } from "../../services/productService";



function Stock() {
  const { page } = useParams();
  const {products, getProducts, showModal, toEdit, paginator, getAll} = useProducts();

  useEffect(()=>{
    console.log(page);
    console.log('cambió');
    getProducts(page);
    
    
  },[page])



  return (
    <>
    <SearchBar page={page}/>
    <TableStock/>
    <Paginator url='/stock/page' paginator={paginator}/>
    <EditarModal 
    show={showModal} 
    toEdit={toEdit}/>
    
    
    </>
  );
}

export default Stock;
