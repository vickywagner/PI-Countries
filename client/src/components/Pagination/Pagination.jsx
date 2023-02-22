import React from "react";
import style from "../Pagination/Pagination.module.css"


const Pagination = ({countriesPerPage, allCountries, paginado}) => {
    const pageNumbers = [];

    //recorro el [] en que tomo el num redondo de lo que resulta dividir todos los paises x los paises x pag que quierp
    for(let i=0; i<= Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i+1)  
    }
    
    return(
        <nav className={style.paginadoNavContainer}>
            <ul className={style.paginadoList} > {/* // si tengo ese [] lo mapeamos */}
                { pageNumbers && 
                        pageNumbers.map(number =>( 
                    <li key={number} className={style.number}>
                        <a onClick={() => paginado(number)}>{number}</a>  
                    </li>
                ))
                }
            </ul>
        </nav>

    )
}

export default Pagination;
