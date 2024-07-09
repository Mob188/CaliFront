import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProducts } from "../../hooks/useProducts";
import { useEffect } from "react";

const StyledDiv = styled.div`
align-self:center;

`;

const Paginator = ({ url }) => {
  const { paginator, buscar } = useProducts();
  
  useEffect(()=>{
    console.log(paginator, buscar)
  },[buscar])
  
  
 

  const currentPage = paginator.number;
  const totalPages = paginator.totalPages;

  let startPage = currentPage - 3;
  let endPage = currentPage + 3;

  if (startPage < 0) {
    endPage += Math.abs(startPage);
    startPage = 0;
  }

  if (endPage >= totalPages) {
    startPage -= endPage - totalPages + 1;
    endPage = totalPages - 1;
  }

  startPage = Math.max(startPage, 0);
  endPage = Math.min(endPage, totalPages - 1);

  const listItems = [];

  for (let i = startPage; i <= endPage; i++) {
    listItems.push(
      <li
        key={i}
        className={currentPage === i ? "page-item disabled" : "page-item"}
      >
        <Link className="page-link" to={`${url}/${i}`}>
          {i + 1}
        </Link>
      </li>
    );
  }
console.log(buscar)
  return (
    buscar.trim()=='' &&
    <StyledDiv>
      {totalPages > 1 && (
        <ul className="pagination">
          <li
            className={currentPage === 0 ? "page-item disabled" : "page-item"}
          >
            <Link className="page-link" to={`${url}/0`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-bar-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0M4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5"
                />
              </svg>
            </Link>
          </li>

          {currentPage > 0 && (
            <li className="page-item">
              <Link className="page-link" to={`${url}/${currentPage - 1}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                  />
                </svg>
              </Link>
            </li>
          )}

          {listItems}

          {currentPage < totalPages - 1 && (
            <li className="page-item">
              <Link className="page-link" to={`${url}/${currentPage + 1}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </Link>
            </li>
          )}

          <li
            className={
              currentPage === totalPages - 1
                ? "page-item disabled"
                : "page-item"
            }
          >
            <Link className="page-link" to={`${url}/${totalPages - 1}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-bar-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0M11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5"
                />
              </svg>
            </Link>
          </li>
        </ul>
      )}
    </StyledDiv>
  );
};

export default Paginator;
