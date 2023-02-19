import React from "react";
import { Link } from 'react-router-dom';



// LANDING PAGE | deberás crear una página de inicio o bienvenida con:

// Alguna imagen de fondo representativa al proyecto.
// Botón para ingresar a la home page.



const LandingPage = () => {
   return (
   	<div>
         <h1>Welcome to my website about countries.</h1>
         <Link to="/home">
            <button>Home</button>
         </Link>
      </div>

	)
}

export default LandingPage;