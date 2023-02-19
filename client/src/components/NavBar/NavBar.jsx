import React from "react";
import style from "../NavBar/NavBar.module.css"
import { Link } from "react-router-dom";

const NavBar = () => {
    return(
        <div className={style.mainContainer}>
            <Link to='/home'>HOME</Link>
            <Link to='/create' className={style.home}>FORM</Link>
            </div>

// VER SI HACEMOS FAV <Link to='/favorites' className={style.about} >Favorites</Link>
    )
    
}

export default NavBar;