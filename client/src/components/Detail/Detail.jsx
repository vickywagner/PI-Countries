import React from "react";
import style from "../Detail/Detail.module.css";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Detail = () => { 
    const dispatch = useDispatch();
    const { id } = useParams(); //me traigo el id desde la ruta gracias al useParams
    const countryDetail = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getDetail(id))
    },[])

    return(
        <div className={style.container}>
            <div className={style.containerImg}>
                <img src={countryDetail?.image} alt={countryDetail?.name} />
            </div>
            <h2 className = {style.title}>{countryDetail?.name}</h2>
            <h3 className = {style.title}>{countryDetail?.id}</h3>
        
            <div className = {style.info}>
                <p>Continent: {countryDetail?.continent}</p>
                <p>Capital: {countryDetail?.capital}</p>
                <p>Subregion: {countryDetail?.subregion}</p>
                <p>Area: {countryDetail?.area}km2</p>
                <p>Population: {countryDetail?.population}</p>
            </div>
            
            <button className={style.btn}>
                <Link className={style.link} to='/home'>Back to Home</Link>
            </button>
        </div>
    )
}

export default Detail;