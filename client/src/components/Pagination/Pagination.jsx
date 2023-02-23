import React from "react";
import style from "../Pagination/Pagination.module.css"


const Pagination = ({countriesPerPage, allCountries, paginado, currentPage, setcurrentPage}) => {
    const pageNumbers = [];

    //recorro el [] en que tomo el num redondo de lo que resulta dividir todos los paises x los paises x pag que quierp
    for(let i=1; i<= Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i)  
    }

    const nextPage = () => {
        setcurrentPage(currentPage + 1)
    }
    
    const prevPage = () => {
        setcurrentPage(currentPage - 1)
    }
    
    return(
        <nav className={style.paginadoNavContainer}>
            <ul className={style.paginadoList} > {/* // si tengo ese [] lo mapeamos */}
                <li>
                    <button className={style.btn} onClick={() => paginado(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
               
                </li>
                { pageNumbers && 
                        pageNumbers.map(number =>( 
                    <li key={number} className={style.number}>
                        <a onClick={() => paginado(number)}>{number}</a>  
                    </li>
                ))
                }
                <li>
                    <button className={style.btn} onClick={() => paginado(currentPage + 1)} disabled={currentPage === Math.ceil(allCountries/countriesPerPage)}>Next</button>
                </li>
            </ul>
        </nav>

    )
}

export default Pagination;
