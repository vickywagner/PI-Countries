import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions";
import style from "../SearchBar/SearchBar.module.css"
import { useSelector } from "react-redux";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    //const countries = useSelector((state) => state.countries);

    const handleInputChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchByName(name));
        setName('');
        //setCurrentPage(1);
        
    }

    return(
        <div className ={style.container}>
            <input className ={style.input}
                id="search"
                type='text'
                placeholder="Search..."
                onChange={(event) => handleInputChange(event)} 
                value={name}
                /> 
            
            <button className ={style.btn}
                 type='submit'
                 onClick={(event) => handleSubmit(event)} >Search</button> 
      </div>
    )

}

export default  SearchBar;
