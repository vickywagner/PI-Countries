import React from "react";
import style from "../Card/Card.module.css"
import { Link } from "react-router-dom";


function Card ({ id, name, continent, image }) { 
    return(
        <div className={style.cardContainer}>
          <div className = {style.info}>
            <h3>Name: {name}</h3>
            <p>Continent: {continent}</p>
           </div>
            <Link to={`/detail/${id}`} >
                <img src={image} alt={name} />
            </Link>
        </div>
    );
}

export default Card; 