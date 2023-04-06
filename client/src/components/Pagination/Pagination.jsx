import React from "react";
import style from "../Pagination/Pagination.module.css"


const Pagination = ({countriesPerPage, allCountries, paginado, currentPage, setcurrentPage}) => {
    const pageNumbers = [];

    //recorro el [] en que tomo el num redondo de lo que resulta dividir todos los paises x los paises x pag que quiero
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
            {pageNumbers.length > 1 && (
                <ul className={style.paginadoList}>
                    {currentPage > 1 ? (
                        <button className={style.btn} onClick={() => paginado(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    ) : (
                        <button hidden className={style.btn}>Previous</button>
                    )}
                    { pageNumbers && 
                            pageNumbers.map(number =>(                  
                        <li onClick={() => paginado(number)} key={number} className={`${style.number} ${currentPage === number && style.active}`}>  {/* para marcar en la pag que estamos */}
                            <a>{number}</a>  
                        </li>
                    ))
                    }
                        <button className={style.btn} onClick={() => paginado(currentPage + 1)} disabled={currentPage === Math.ceil(allCountries/countriesPerPage)}>Next</button>
                </ul>
             )}
        </nav>

    )
}

export default Pagination;
