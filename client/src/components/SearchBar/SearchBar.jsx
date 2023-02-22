import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions";
import style from "../SearchBar/SearchBar.module.css"


// FALTA buscar x id
// falta limpiar el input ---> clase dai forms


const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState(''); // seteo mi estado como string

    const handleInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value); //mi estado pasa a ser el event.target.value
        //console.log(name) 
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchByName(name));
    }

    return(
        <div className ={style.container}>
            <input className ={style.input}
                id="search"
                type='text'
                placeholder="Search..."
                onChange={(event) => handleInputChange(event)} /> 
            
            <button className ={style.btn}
                 type='submit'
                 onClick={(event) => handleSubmit(event)} >Search</button> 
      </div>
    )

}

export default  SearchBar;
