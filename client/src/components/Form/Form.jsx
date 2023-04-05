import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActivity, getCountries } from "../../redux/actions"
import { Link, useHistory } from "react-router-dom";
import style from "./Form.module.css";
import validation from '../Form/validation';

function Form() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  
  const listCountries = useSelector((state) => state.countries);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    idCountry: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  
//"handleChange" --> para manejar el cambio de estado de los demás campos de "input". 
//Actualiza el estado de "input" con la nueva información.
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value, // me copio todo lo que venga del formulario , en el caso de que en alguno
      })                                      // no cumpla con las validaciones, se va a poner un texto advirtiendo
    ); 
  }

//"handleSelect" guarda en un [] todo lo que seleccione ---> COUNTRIES
  function handleSelect(e) {
    setInput((input) => {
      if (!input.idCountry.includes(e.target.value)) {  //verificamos si el valor de e.target.value (el valor 
                              // seleccionado) NO está incluido en el arreglo idCountry del estado anterior input.
        return {  // si NO esta, retornamos una copia el estado anterior (input) y agrega el valor de 
          ...input,                                                       //e.target.value al arreglo idCountry
          idCountry: [...input.idCountry, e.target.value],
        };
      } else { // Si e.target.value SI está incluido en el [] idCountry, mostranos un alert y se devuelve un nuevo 
        alert("No se puede incluir un país duplicado"); //obj que copia todas las propiedades del estado anterior 
        return {                                          //(input) y mantiene el arreglo idCountry sin cambios.
          ...input,
          idCountry: [...input.idCountry],
        };
      } 
    })
  }

  
//"handleSubmit" --> Valida la información de "input" y, si es válida, envía una acción de "postActivities" al almacenamiento de Redux y navega a la página principal
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivity(input));
    alert("Congratulations you created a new activity!");
    setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        idCountry: [],
    });
    history.push("/home");
  }

//"handleDelete" --> para borrar los paises(id) q haya seleccionado en el form, va a crear un nuevo array con
// todos los que no sean el elemento que le hice click
  function handleDelete(e) {
    setInput({
      ...input,
      idCountry: input.idCountry.filter((id) => id !== e),
    }); 
  } 

  return (
    <div className={style.container}>
     
        <h1 className={style.title}>CREATE A TOURIST ACTIVITY</h1>
      
        <div className={style.form} >
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >    
          <div> 
            <label className={style.labels}>Name </label>
            <input className={style.inputs}
              type="text"
              name="name"
              placeholder='Activity name...'
              value={input.name}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errors.name && <p className={style.error}>{errors.name}</p>}
          </div>
   
            <div>
              <label className={style.labels}>Difficulty: </label>
                 <select className={style.selectInputs} name="difficulty" id="difficulty"  onChange={(e) => {
                handleChange(e);
              }}>
                     <option value="">Select Difficulty</option>
                     <option value="1">⭐ ☆ ☆ ☆ ☆</option>
                     <option value="2">⭐⭐ ☆ ☆ ☆</option>
                     <option value="3">⭐⭐⭐ ☆ ☆</option>
                     <option value="4">⭐⭐⭐⭐ ☆</option>
                     <option value="5">⭐⭐⭐⭐⭐</option>
                 </select>
                 {errors.difficulty && (<p className={style.error}>{errors.difficulty}</p>)}
                 </div>
          
                <div>
                 <label className={style.labels}>Duration: </label>
                     <input 
                        className={style.inputs} 
                        type="number"
                        value= {input.duration}
                        name="duration"
                        placeholder='Enter the duration in hours'
                        onChange={(e) => {
                          handleChange(e);
                        }}
                         />
                 {errors.duration && <p className={style.error}>{errors.duration}</p>}
                 </div>

            <div>
                 <label className={style.labels}>Season: </label>
                 <select className={style.selectInputs} name="season" id="season"  onChange={(e) => {
                handleChange(e);
              }} >
                    <option value=''>Select Season</option>
                    <option value="Summer">Summer</option>
                    <option value="Autumn">Autumn</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                 </select>                
               {errors.season && <p className={style.error}>{errors.season}</p>}
                </div>

          <label className={style.labels}>Countries: </label>
          <select onChange={(e) => handleSelect(e)} className={style.selectInputs}>
            {listCountries?.map((t) => {
              return <option value={t.id}> {t.name} </option>;
            })}
          </select>
            <p className={style.detail}>More than one country can be selected</p>
          
            <button type="submit" className={style.btnCreate}   // desabilitamos el boton si el form tiene errores
             disabled={!Object.keys(errors).length ? false : true}  // Si no hay errores, disabled será establecido en false. 
                                                        //Es decir que el button submit estará activo y se podrá hacer click.
            >  
              Create Activity
            </button>
          
        </form>
       <div>
        {input.idCountry.map((e) => {
          return (
            <div className={style.containerID}>
              <h5 className={style.pais}>{e}</h5>
              <button className={style.cruz} onClick={() => handleDelete(e)}>
                X
              </button>
            </div>
          );
        })}
        </div> 

      </div>
</div>
  );
}

export default Form;