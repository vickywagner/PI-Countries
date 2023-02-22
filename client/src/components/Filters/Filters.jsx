import React from "react";
import { useDispatch } from "react-redux";
import { filterContinent, orderByName } from "../../redux/actions";


// filtrar por continente y por tipo de actividad turística.
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente 
//los países por orden alfabético y por cantidad de población.

const Filter = ({ setCurrentPage, setOrden }) => {
  const dispatch = useDispatch();

  //****** ORDENAR x continente ********
	function handleContinent (event){
		dispatch(filterContinent(event.target.value))
	}

	
//****** ORDENAR asc - desc ********

//NO ANDA Y SE ROMPE TODO EN LA PAG
	const handleSort = (e) => {
		e.preventDefault();
		dispatch(orderByName(e.target.value));
		setOrden(`Ordenado ${e.target.value}`);
		setCurrentPage(1);
	};

//////////////////////////////////////////
  return (
   <div>
   	<select onChange={(e) => handleSort(e)}> 
			<option value='asc'>Ascendant</option>
			<option value='desc'>Decendant</option>
      </select>

		<select id="continents" name="Continents" onChange={handleContinent}>
			<option value='all' >All</option>
			<option value='Africa'>Africa</option>
			<option value='Antarctica' >Antarctica</option>
         <option value='Asia' >Asia</option>
         <option value='Europe' >Europe</option>
         <option value='North America' >North America</option>
         <option value='Oceania' >Oceania</option>
         <option value='South America' >South America</option>
      </select>

      <select> 
      	<option value={"High"}>Higher Population</option>
          <option value={"low"}>Less Population</option>
          <option value='Activities'>Tourist Activity</option>
      </select>

   </div>
 
     ) // FALTA FILTRAR ALFABETICAMENTE
     // lo que permite qacceder a esa accion es el value
 }

 export default Filter;


