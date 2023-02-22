import React from "react";
import { Link } from 'react-router-dom';
import style from "../LandingPage/LandingPage.module.css"
import Beach from "../../assets/Beach.mp4";



// LANDING PAGE | deberás crear una página de inicio o bienvenida con:

// Alguna imagen de fondo representativa al proyecto.
// Botón para ingresar a la home page.



const LandingPage = () => {
   return (
   	<div className={style.container}>
         <video src={Beach} muted autoPlay loop />
         <div className={style.content}>
         <h1>Welcome to my website about countries.</h1>
         <Link className={style.link} to="/home">
            <button className={style.btn} >Start</button>
         </Link>
        </div>
      </div>

	)
}

export default LandingPage;