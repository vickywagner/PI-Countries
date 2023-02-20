import React from "react";
import { Link } from "react-router-dom";


function Card ({ name, continent, image }) { 
    return(
        <div>
             <Link to={`/detail/{}`} ></Link>
            <h3>Name: {name}</h3>
            <p>Continent: {continent}</p>
            <br />
            <img src={image} alt={name} />
        </div>
    );
}

export default Card; 