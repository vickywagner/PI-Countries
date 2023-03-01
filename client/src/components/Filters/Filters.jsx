import React, {useEffect} from "react";
import style from "../Filters/Filter.module.css"
import { useDispatch, useSelector } from "react-redux";
import { filterContinent, orderByName, filterPopulation, filterByActivities, getActivities, getCountries, filterTimezones } from "../../redux/actions";


const Filter = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();
  
  const activities = useSelector((state) => state.activities);
	
  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);


  //****** ordenar ASC- DESC ********
	const handleSort = (event) => {
		dispatch(orderByName(event.target.value));
		setCurrentPage(1);
	};

  //******** ordenar x CONTINENTES ********
  function handleContinent (event){
    dispatch(filterContinent(event.target.value));
    setCurrentPage(1); 
    }

//********** ordenar x POBLACION ***************
const handlePopulation = (event) => {
  dispatch(filterPopulation(event.target.value));
  setCurrentPage(1); 
};

//********** ordenar x Actividades ***************
function handleActivity(e) {
  dispatch(filterByActivities(e.target.value));
  setCurrentPage(1); 
}

/////////////////VER ////////////////

function handleTimezone(e) {
  dispatch(filterTimezones(e.target.value));
  setCurrentPage(1); 
}

//////////////////////////////////////////

// ****** Boton clean filters/reload ******
const handleClick = (event)=> {
  event.preventDefault();
  dispatch(getCountries());
}


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
          </select>
        </div>

      <div className={style.selectContainer} >
        <select onChange={(e) => handleActivity(e)}  className={style.select} >
          <option value='All' className={style.option}>All Activities</option>
          {activities?.map((el) => {
                return (
                  <option value={el.name} key={el.id}>
                    {el.name}
                  </option>
                )
            })
          }
        </select>
      </div>

      <div className={style.selectContainer}> 
        <select className={style.select} onChange={(event) => handleTimezone(event)}>
            <option value='All' className={style.option} >All Timezones</option>
            <option value='UTC-12:00' className={style.option} >UTC-12:00</option>
            <option value='UTC-11:00' className={style.option} >UTC-11:00</option>
            <option value='UTC-10:00' className={style.option} >UTC-10:00</option>
            <option value='UTC-09:00' className={style.option} >UTC-09:00</option>
            <option value='UTC-08:00' className={style.option} >UTC-08:00</option>
            <option value='UTC-07:00' className={style.option} >UTC-07:00</option>
            <option value='UTC-06:00' className={style.option} >UTC-06:00</option>
            <option value='UTC-05:00' className={style.option} >UTC-05:00</option>
            <option value='UTC-04:00' className={style.option} >UTC-04:00</option>
            <option value='UTC-03:00' className={style.option} >UTC-03:00</option>
            <option value='UTC-02:00' className={style.option} >UTC-02:00</option>
            <option value='UTC-01:00' className={style.option} >UTC-01:00</option>
            <option value='UTC+00:00' className={style.option} >UTC+00:00</option>
            <option value='UTC+01:00' className={style.option} >UTC+01:00</option>
            <option value='UTC+02:00' className={style.option} >UTC+02:00</option>
            <option value='UTC+03:00' className={style.option} >UTC+03:00</option>
            <option value='UTC+04:00' className={style.option} >UTC+04:00</option>
            <option value='UTC+05:00' className={style.option} >UTC+05:00</option>
            <option value='UTC+06:00' className={style.option} >UTC+06:00</option>
            <option value='UTC+07:00' className={style.option} >UTC+07:00</option>
            <option value='UTC+08:00' className={style.option} >UTC+08:00</option>
            <option value='UTC+09:00' className={style.option} >UTC+09:00</option>
            <option value='UTC+10:00' className={style.option} >UTC+10:00</option>
            <option value='UTC+11:00' className={style.option} >UTC+11:00</option>
            <option value='UTC+12:00' className={style.option} >UTC+12:00</option>
          </select>
      </div>

      <button onClick={handleClick} className={style.btnReload}>Reload</button> 

    </div>
     ) 
     // lo que permite acceder a esa accion es el value
 }

 export default Filter;


