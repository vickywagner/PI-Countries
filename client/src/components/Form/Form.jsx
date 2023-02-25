import React, { useState, useEffect } from 'react';
import validation from './validation';
import style from "../Form/Form.module.css"
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, postActivity } from '../../redux/actions';


//FORM PAGE |: en esta vista se encontrará el formulario para crear una actividad turística.

// Este formulario debe ser controlado completamente con JavaScritp. No se pueden utilizar validaciones HTML,
// ni utilizar librerías especiales para esto. Debe contar con los siguientes campos:

        // Nombre.
        // Dificultad.
        // Duración.
        // Temporada.
// Posibilidad de seleccionar/agregar varios países en simultáneo.
        // Botón para crear la actividad turística.

        // [IMPORANTE]: es requisito que el formulario de creación esté validado sólo con JavaScript. 
        // Puedes agregar las validaciones que consideres. Por ejemplo: que el nombre de la actividad no pueda contener
        // números, o que la duración no pueda exceder determinado valor, etc.

const Form = () => { 

    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries)
	  const history = useHistory();
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: [],
    });

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

//"handleChange" --> para manejar el cambio de estado de los demás campos de "input". Actualiza el estado de "input" con la nueva información.
    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name] : event.target.value
        });
        setErrors(
            validation({
              ...input,
              [event.target.name]: event.target.value,
            })
          );
        //console.log(input)
    }

//"handleSelect" guarda en un [] todo lo que seleccione
    // const handleSelect = (event) => {
    //     setInput({
    //         ...input,
    //         countries: [...countries, event.target.value]
    //         })
    // }

    const handleSelect = (event) => {
        setInput((estado) => {
          if (event.target.name === "countries") {
            if (!input.countries.includes(event.target.value)) {
              return {
                ...estado,
                countries: [...estado.countries, event.target.value],
              };
            } else {
              alert("No se puede incluir un país duplicado");
              return {
                ...estado,
                countries: [...estado.countries],
              };
            }
          } else {
            return {
              ...estado,
              [event.target.name]: event.target.value,
            };
          }
        });
      };
    

//"handleSubmit" --> para manejar el envío del formulario.
//Valida la información de "input" y, si es válida, envía una acción de "postActivities" al almacenamiento de Redux y navega a la página principal
    const handleSubmit = (event) => {
        event.preventSubmit();
        console.log(input);
        if (!input.name || !input.difficulty || !input.duration || !input.season || !input.countries) {
          return alert("Complete the form correctly before submitting it");
        }

        dispatch(postActivity(input))
        alert("Activity created successfully");
        setInput({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countries: [],
        })
        history.push("/home"); //me redirige a la ruta que le digo --> a la página principal
    }

    ////"handleDelete" --> para borrar los paises(id) seleccionados en el form
    function handleDelete(e) {
        setInput({
          ...input,
          countries: input.countries.filter((con) => con !== e),
        });
      }
    
    return(
        <div className={style.container}>

            <Link className={style.link} to='/home'>
                <button className={style.btn}>Back to home</button>
            </Link>
            <h1 className={style.title}>CREATE A TOURIST ACTIVITY</h1>

            <div className={style.form} >
            <form  onSubmit={(event) => handleSubmit(event)}>
                
                <div className={style.contenedor}>
                    <label className={style.labels}>Name:  </label>
                    <input className={style.inputs}
                        type="text"
                        value= {input.name}
                        name="name"
                        placeholder='Activity name...'
                        onChange={handleChange}
                        />
                     {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
                </div>

                <div>
                <label className={style.labels}>Difficulty: </label>
                <select className={style.selectInputs} name="difficulty" onChange={(event) => handleSelect(event)}>
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
                        onChange={handleChange}
                        />
                {errors.duration && <p style={{color: 'red'}}>{errors.duration}</p>}
                </div>

                <div>
                <label className={style.labels}>Season: </label>
                <select className={style.selectInputs} name="season" onChange={(event) => handleSelect(event)} >
                    <option value=''>Select Season</option>
                    <option value="Summer">Summer</option>
                    <option value="Autumn">Autumn</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                </select>
                {errors.season && <p style={{color: 'red'}}>{errors.season}</p>}
                </div>

                <div>
                <label className={style.labels}>Countries: </label>
                <select 
                    className={style.selectInputs}
                    name="countries" 
                    id="countries"
                    onChange={(event) => handleSelect(event)}
                    >
                    <option value='countries' >Select Countries</option>
                    {countries?.map((country) => <option key={country.id} value={country.id} >{country.name}</option>)}           
                </select>
                {errors.countries && <p style={{color: 'red'}}>{errors.countries}</p>}
                </div>

                <div>
                    {input.countries.map((e) => (
                    <div className={style.containerID}>
                        <p className={style.pais}> {e} </p>
                        <button className={style.cruz} onClick={() => handleDelete(e)}>X{" "} </button>
                    </div>
                    ))}
                </div>

                <button className={style.btnCreate}
                    type="submit" 
                    disabled={Object.keys(errors).length === 0 ? false : true}
                    >Create
                </button>

            </form>
            </div>
        </div>
    )
    }

export default Form;