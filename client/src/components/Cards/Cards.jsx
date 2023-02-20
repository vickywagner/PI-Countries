import React , {useEffect} from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions";


//ver si esto lo hacemos directo en el home

const Cards = () => { 
    const dispatch = useDispatch();

    useEffect(() => {  
        dispatch(getCountries());
    },[dispatch])

    const countries = useSelector(state => state.countries);
    return(
        <div>
            {countries?.map(({id, name, continent, capital, subregion, area, population, image }) => {
                return <Card 
                key={id}
                name={name}
                continent={continent}
                capital={capital}
                subregion={subregion}
                area={area}
                population={population}
                image={image}
                id = {id}
                />
            })}
        </div>
    )
    }

export default Cards;