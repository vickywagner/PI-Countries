import React from "react";
import style from "../Card/Card.module.css"
import { Link } from "react-router-dom";


function Card ({ id, name, continent, image }) { 
    return(
        <div className={style.cardContainer}>
            <Link to={`/detail/${id}`} className={style.link}>
            <h3 className={style.name}>{name}</h3>
            <p className={style.continente}>{continent}</p>
            <img className={style.img} src={image} alt={name} />
            </Link>
        </div>
    );
}

export default Card; 