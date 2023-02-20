import React from "react";
import { useState } from "react";
import style from "../SearchBar/SearchBar.module.css"

const SearchBar = ({ onSearch}) => {
    const [country, setCountry] = useState('') // mi estado es un string no un obj
    //character es el estado
    
       const handleChange = (event) => {
        setCountry(event.target.value)
    //mi estado pasa a ser el event.target.value
       }
    return(
        <div className ={style.container}>
            <input className ={style.input} type='search' value={country} onChange={handleChange} /> 
            <button className ={style.btn} onClick={() => onSearch(country)}>Buscar</button> 
      </div>
    )
    
}

export default  SearchBar;