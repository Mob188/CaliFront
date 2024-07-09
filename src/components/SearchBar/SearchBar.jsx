import { useEffect, useState } from "react";
import styled from "styled-components";
import { useProducts } from "../../hooks/useProducts";


const StyledInput = styled.input`
  width:200px;
  align-self:center;
  margin-top:5px;
  margin-bottom:5px;
`;
const SearchBar = (props) => {
  const {page}=props;
  const [ buscar, setBuscar ]=useState('');
  
  const {handlerSearchProduct } = useProducts();

  useEffect(() => {
    handlerSearchProduct(buscar,page);
  }, [buscar]);

  const handleChange = (e) => {
    setBuscar(e.target.value);
  };

  return (
    <>
      <StyledInput type="text" placeholder="Buscar..." onChange={handleChange} />
    </>
  );
};

export default SearchBar;
