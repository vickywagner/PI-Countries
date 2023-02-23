import React, { useState, useEffect } from 'react';
import validation from './validation';
import style from "../Form/Form.module.css"
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, postActivity } from '../../redux/actions';


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
    const handleSelect = (event) => {
        setInput({
            ...input,
            countries: [...countries, event.target.value]
            })
    }

//"handleSubmit" --> para manejar el envío del formulario.
//Valida la información de "input" y, si es válida, envía una acción de "postActivities" al almacenamiento de Redux y navega a la página principal
    const handleSubmit = (event) => {
        event.preventSubmit();
        console.log(input);
        if (!input.name || !input.difficulty || !input.duration || !input.season || !input.countries) {
          return alert("Complete the form correctly before submitting it");
        } else {
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
    }


    useEffect(()=> {
        dispatch(getActivities())
    },[])

    
    return(
        <div className={style.container}>

           
            <h1 className={style.title}>CREATE A TOURIST ACTIVITY</h1>
            <Link className={style.link} to='home'>
                <button className={style.btn}>Back to home</button>
            </Link>

            <div className={style.contenedor} >
            <form  onSubmit={(event) => handleSubmit(event)}>
                <div>
                    <label>Name: </label>
                    <input 
                        type="text"
                        value= {input.name}
                        name="name"
                        placeholder='Activity name..'
                        onChange={handleChange}
                        />
                    
                </div>

                <div>
                <label>Difficulty: </label>
                    {/* <input 
                        type="number"
                        value= {input.difficulty}
                        name="difficulty"
                        onChange={handleChange}
                        /> 
                        
                        //VER SI FUNCIONA BIEN     */}
                <select name="difficulty" onChange={handleChange}>
                    <option value="">--Select Difficulty--</option>
                    <option value="1">⭐ ☆ ☆ ☆ ☆</option>
                    <option value="2">⭐⭐ ☆ ☆ ☆</option>
                    <option value="3">⭐⭐⭐ ☆ ☆</option>
                    <option value="4">⭐⭐⭐⭐ ☆</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
                </div>

                <div>
                <label>Duration: </label>
                    <input 
                        type="number"
                        value= {input.duration}
                        name="duration"
                        placeholder='Enter the duration in hours'
                        onChange={handleChange}
                        />
                </div>

                <div>
                <label>Season: </label>
                <select name="season" >
                    <option value=''>--Select Season--</option>
                    <option value="Summer">Summer</option>
                    <option value="Autumn">Autumn</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                </select>
                </div>

                <div>
                <label>Countries: </label>
                <select name="country" onChange={(event) => handleSelect(event)}>
                    <option value='countries' >--Select Countries--</option>
                    {countries?.map((country) => <option key={country.id} value={country.id} >{country.name}</option>)}           
                </select>
              
               {/*   <ul><li>{input.countries.map(el => el + ",")}</li></ul> */}
                </div>

                {/* <div>
                <label>Image</label>
                    <input 
                        type="text"
                        value= {input.image}
                        name="image"
                        onChange={handleChange}
                        />
                </div> */}

                <button type="submit" className={style.btnCreate}>Create</button>
               


            </form>
            </div>
        </div>
    )
    }

export default Form;