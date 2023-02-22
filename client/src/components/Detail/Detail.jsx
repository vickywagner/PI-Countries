import React from "react";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// DETAIL PAGE | en esta vista se deberá mostrar toda la información específica de un país:

// ID (Código de tres letrass).
// Nombre.
// Imagen de la bandera.
// Continente.
// Capital.
// Subregión (si tiene).
// Área (si tiene).
// Población.


const Detail = () => { 
    const dispatch = useDispatch();
    const { id } = useParams(); //me traigo el id desde la ruta gracias al useParams
    const countryDetail = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getDetail(id))
    },[])

    return(
        <div>
            <img src={countryDetail?.image} alt={countryDetail?.name} />
            <h2>{countryDetail?.name}</h2>
            <h3>{countryDetail?.id}</h3>
            <p>Continent: {countryDetail?.continent}</p>
            <p>Capital: {countryDetail?.capital}</p>
            <p>Subregion: {countryDetail?.subregion}</p>
            <p>Area: {countryDetail?.area}km2</p>
            <p>Population: {countryDetail?.population}</p>
            
            <button>
                <Link to='/home'>Back to Home</Link>
            </button>
        </div>
    )
}

export default Detail;