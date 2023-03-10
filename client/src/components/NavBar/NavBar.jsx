import React, { useEffect, useState } from "react";
import style from "../NavBar/NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions";

const NavBar = () => {
    const [visibility, setVisibility] = useState(null) // para que se muestre el nav en todas menos en landing
    const dispatch = useDispatch();  // Nos traemos los paises
    const location = useLocation();

    useEffect(() => {  // ya traemos todos los paises para cuando abrimos el home ya se cargan y el usuario no tiene que esperar
        dispatch(getCountries());
    },[dispatch])

    useEffect(() => {
       setVisibility(location.pathname === '/' ? "none" : null)
       //console.log("Funcionando")
    },[location.pathname])

    return(
       <nav className={style.nav}>
       <div className={style.mainContainer}  style={{display: visibility}} >
            <Link to='/home' className={style.links}>HOME</Link>
            <Link to='/create' className={style.links}>CREATE ACTIVITY</Link>
            <SearchBar />
            </div>
       </nav>
    )
}

export default NavBar;