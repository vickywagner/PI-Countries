import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
//import { Link } from "react-router-dom";
import Cards from "../Cards/Cards";

// HOME PAGE | la página principal de tu SPA debe contener:

// SearchBar: un input de búsqueda para encontrar países por nombre.
// Sector en el que se vea un listado de cards con los países. Al iniciar deberá cargar los 
//primeros resultados obtenidos desde la ruta GET /countries y deberá mostrar su:
// Imagen de la bandera.
// Nombre.
// Continente.
// Cuando se le hace click a una Card deberá redirigir al detalle de ese país específico.
// Botones/Opciones para filtrar por continente y por tipo de actividad turística.
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países por orden alfabético
// y por cantidad de población.
// Paginado: el listado de países se hará por partes. Tu SPA debe contar con un paginado que muestre un 
//total de 10 países por página.


const Home = () => {

   // const dispatch = useDispatch()
   // const allCountries = useSelector((state) => state.countries)

   // useEffect(() => {
   //    dispatch(getCountries());
   // },[])


   // const handleClick = (event)=> {
   //    event.preventDefault();
   //    dispatch(getCountries());
   // }

   // <Link to= '/activities'>Create activity</Link>
   // boton dentro del return <button onSubmit={handleClick} >Reload Countries</button>
   
   return(
      <div>
         <h1>Country</h1>
         <Cards />
         <div></div>
      </div>
   )

}

export default Home;