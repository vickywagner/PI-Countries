import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions";
import style from "../SearchBar/SearchBar.module.css"

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState(''); // seteo mi estado como string

    const handleInputChange = (event) => {
        setName(event.target.value); //mi estado pasa a ser el event.target.value
        //console.log(name) 
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchByName(name));
        setName('');
        
    }

    return(
        <div className ={style.container}>
            <input className ={style.input}
                id="search"
                type='text'
                placeholder="Search..."
                onChange={(event) => handleInputChange(event)} 
                value={name} // actualizar el valor del input
                /> 
            
            <button className ={style.btn}
                 type='submit'
                 onClick={(event) => handleSubmit(event)} >Search</button> 
      </div>
    )

}

export default  SearchBar;
