const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// router.use('/countries', countries);
// router.use('/activity', activities);


//FALTA MODULARIZAR !!!!


// GET | /countries
// Obtiene un arreglo de objetos, donde cada objeto es un país con toda su información.
const geApiInfo = async () => {
    const apiUrl = await axios('https://restcountries.com/v3.1/all'); // Trabajamos de manera asincrona porque no sabemos cuanto demora la rta, 
                                                                       //esperamos la rta antes cargarle la info a la const apiUrl

    const apiInfo = apiUrl.data.map(country => {
        return {
            id: country.cca3,
            name: country.name.common,
            image: country.flags[0],
            continent: country.region,
            capital: country.capital ? country.capital : `This country doesn't have capital.`,
            subregion: country.subregion,
            area: country.area,
            population: country.population,   
        }
    });
    console.log(apiInfo)
    return apiInfo;
} 


module.exports = router;
