import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActivity, getCountries } from "../../redux/actions"
import { Link } from "react-router-dom";
import style from "./Form.module.css";
import validation from '../Form/validation';

function Form() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  
  const listCountries = useSelector((state) => state.countries);

  const [errors, setErrors] = useState({}); // este estado local es para, las validaciones(del formulario controlado)
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    idCountry: [],
  });
  // console.log(input);
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
        [e.target.name]: e.target.value, // me copio todo lo que venga del formulario , en el caso de que en alguno
      })
    ); // no cumpla con las validaciones, se va a poner un texto advirtiendo
  }

//"handleSelect" guarda en un [] todo lo que seleccione
  function handleSelect(e) {
    setInput({
      ...input,
      idCountry: [...input.idCountry, e.target.value],
    });
  }

//"handleSubmit" --> para manejar el envío del formulario.
//Valida la información de "input" y, si es válida, envía una acción de "postActivities" al almacenamiento de Redux y navega a la página principal
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
  }

//"handleDelete" --> para borrar los paises(id) seleccionados en el form
  function handleDelete(e) {
    setInput({
      ...input,
      idCountry: input.idCountry.filter((id) => id !== e),
    }); //este es para borrar algun id que haya elegido, va a creat un nuevo array con todos los que no sean
  } //    el elemento que le hice click

  return (
    <div className={style.container}>
     
        {/* <Link className={style.link} to="/home">
          <button className={style.btn}>Back to home</button>
        </Link> */}
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
            {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
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
                 {errors.difficulty && (<p style={{color: 'red'}}>{errors.difficulty}</p>)}
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
                 {errors.duration && <p style={{color: 'red'}}>{errors.duration}</p>}
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
               {errors.season && <p style={{color: 'red'}}>{errors.season}</p>}
                </div>


          <p >Countries: </p>
          <select onChange={(e) => handleSelect(e)} className={style.selectInputs}>
            {listCountries?.map((t) => {
              return <option value={t.id}> {t.name} </option>;
            })}
          </select>
          
            <button type="submit" className={style.btnCreate}>
              {" "}
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