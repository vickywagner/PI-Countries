import React from "react";
import style from "../Filters/Filter.module.css"
import { useDispatch } from "react-redux";
import { filterContinent, orderByName, filterPopulation } from "../../redux/actions";


// filtrar por continente y por tipo de actividad turística.
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente 
//los países por orden alfabético y por cantidad de población.

const Filter = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();

	
  //****** ordenar ASC- DESC ********
	const handleSort = (event) => {
    event.preventDefault();
		dispatch(orderByName(event.target.value));
		setCurrentPage(1);
	};

  //******** ordenar x CONTINENTES ********
  function handleContinent (event){
    dispatch(filterContinent(event.target.value))
  }

//********** ordenar x POBLACION ***************
const handlePopulation = (event) => {
  event.preventDefault();
  dispatch(filterPopulation(event.target.value));
  setCurrentPage(1);
};


//////////////////////////////////////////
  return (
    <div className={style.container}>
   	 
      <div className={style.selectContainer}>
        <select className={style.select} onChange={(event) => handleSort(event)}> 
          <option value='asc' className={style.option} >Ascendant</option>
          <option value='desc' className={style.option} >Decendant</option>
        </select>
      </div>

      <div className={style.selectContainer}>
        <select className={style.select} onChange={(event) => handleContinent(event)}>
            <option value='All' className={style.option} >All</option>
            <option value='Africa' className={style.option} >Africa</option>
            <option value='Asia' className={style.option} >Asia</option>
            <option value='Europe' className={style.option} >Europe</option>
            <option value='North America' className={style.option} >North America</option>
            <option value='South America' className={style.option} >South America</option>
            <option value='Oceania' className={style.option} >Oceania</option>
            <option value='Antarctica' className={style.option} >Antarctica</option>
          </select>
      </div>

      <div className={style.selectContainer}>
        <select className={style.select} onChange={(event) => handlePopulation(event)}> 
            <option value={"High"} className={style.option} >Higher Population</option>
            <option value={"low"} className={style.option} >Less Population</option>
            <option value='Activities'>Tourist Activity</option>
          </select>
        </div>

   </div>
 
     ) 
     // lo que permite qacceder a esa accion es el value
 }

 export default Filter;


