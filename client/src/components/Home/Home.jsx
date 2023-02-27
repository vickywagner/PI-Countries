import React from "react";
import style from "../Home/Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities } from "../../redux/actions";
import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
import Footer from "../Footer/Footer";
 
const Home = () => {
   
   const dispatch = useDispatch();
   const allCountries = useSelector((state) => state.countries) // traemos lo q esta en el estado de countries
   
//********* PAGINADO ***********
   const [currentPage, setcurrentPage] = useState(1) // guardamos en el estado local la pag actual, empieza en 1 xq siempre arrancamos de la pag 1
   const [countriesPerPage, setcountriesPerPage] = useState(10) // guardamos en el estado local lacant de paises que queremos mostrar, son 10 paises x pag
   const indexOfLastCountry = currentPage * countriesPerPage // mi pag * paisesxpag = 10
   const indexOfFirstCountry = indexOfLastCountry - countriesPerPage // 0
   const currentCountries = allCountries.slice(indexOfFirstCountry,indexOfLastCountry) //los paises que estan la pag actual

   const paginado = (pageNumber) => {
      setcurrentPage(pageNumber)
   }

// ****** Boton reload countries ******
  const handleClick = (event)=> {
     event.preventDefault();
     dispatch(getCountries());
   }

   return(
      <div className={style.container}>
         <h1></h1>
         <button onClick={handleClick} className={style.btnReload} >Reload Countries</button> 

        <Filters 
            currentPage={currentPage} 
            setCurrentPage={setcurrentPage} />

        <Pagination countriesPerPage={countriesPerPage} 
            allCountries={allCountries.length}
            paginado={paginado} currentPage={currentPage}/>
       
       <div className={style.containerCards}>
         {currentCountries?.map((c) => {
            return (
               <div >
                  <Card 
                     image={c.image}
                     key={c.id}
                     name={c.name}
                     continent={c.continent}
                     capital={c.capital}
                     subregion={c.subregion}
                     area={c.area}
                     population={c.population}
                     id = {c.id}/>
                </div>
                  )})
               }
            </div>
            
         <Footer />
      </div>
   )
}

export default Home;