import React from "react";
import { Link } from "react-router-dom";


function Card ({ id, name, continent, image }) { 
    return(
        <div>
            <h3>Name: {name}</h3>
            <p>Continent: {continent}</p>
             <Link to={`/detail/${id}`} >
                <img src={image} alt={name} />
             </Link>
        </div>
    );
}

export default Card; 