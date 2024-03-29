import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActivity, getCountries } from "../../redux/actions"
import { Link, useHistory } from "react-router-dom";
import style from "./Form.module.css";
import validation from '../Form/validation';
//import Swal from "sweetalert2";

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
  
//"handleChange" --> para manejar el cambio de estado de los demás campos de "input". Actualiza el estado de "input" con la nueva información.
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value, 
      }) 
    ); 
  }

//"handleSelect" guarda en un [] todo lo que seleccione ---> COUNTRIES
  function handleSelect(e) {
    setInput((input) => {
      if (!input.idCountry.includes(e.target.value)) {  //verificamos si el valor de e.target.value (el valor seleccionado) NO está incluido en el arreglo idCountry del estado anterior input.
        return {  // si NO esta, retornamos una copia el estado anterior (input) y agrega el valor de e.target.value al arreglo idCountry
          ...input,
          idCountry: [...input.idCountry, e.target.value],
        };
      } else { // Si e.target.value SI está incluido en el [] idCountry, mostranos un alert y se devuelve un nuevo obj que copia todas las propiedades del estado anterior (input) y mantiene el arreglo idCountry sin cambios.)
        alert("No se puede incluir un país duplicado");
        return {
          ...input,
          idCountry: [...input.idCountry],
        };
      } 
    })
  }

  
//"handleSubmit" --> Valida la información de "input" y, si es válida, envía una acción de "postActivities" al almacenamiento de Redux y navega a la página principal
  const handleSubmit = async(e) => {
    e.preventDefault();
    // if(!input.name || !input.difficulty || !input.duration || !input.season){
    //   return alert ( 'Por favor complete el formulario antes de enviarlo')
    //   }

    const allActivities = await fetch('http://localhost:3001/activities').then ((res) => res. json());
    const activityExist = allActivities.some((activity) => activity.name === input.name)
    
    if(activityExist){
    return alert('An activity with that name already exists')
    }

    dispatch(postActivity(input));
    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'success',
    //   title: 'Congratulations you created a new activity!',
    //   showConfirmButton: false,
    //   timer: 1400,
    //   backdrop: true,
    // })
    alert("Congratulations you created a new activity!");
    setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        idCountry: [],
    });
    dispatch(getCountries())
    history.push("/home");
  }

//"handleDelete" --> para borrar los paises(id) q haya seleccionado en el form, va a crear un nuevo array con todos los que no sean el elemento que le hice click
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