const axios = require('axios');
const { Country, Activity } = require("../db.js");
const { Op } = require("sequelize");


//************ Traer informacion de la API *************

const getApiInfo = async () => {  // Trabajamos de manera asincrona porque no sabemos cuanto demora la rta, 
                                    //esperamos la rta antes cargarle la info a la const apiUrl         
   const apiUrl = await axios.get('https://restcountries.com/v3/all');                                                           
   const apiInfo = apiUrl.data.map(country => {
    	const map = {
			id: country.cca3,
			name: country.name.common,
			image: country.flags[1],
			continent: country.continents[0],
			capital: country.capital ? country.capital[0] : `This country doesn't have capital.`,
			subregion: country.subregion ? country.subregion : `This country doesn't have subregion.`,
			area: country.area,     // area: `${country.area}km2`,
			population: country.population,   
    	}
	 	return map;
   });
    //console.log(apiInfo);
    
	try{ 
		const countries = await Country.findAll();
		if(!countries.length) {             //Si no existen
		await Country.bulkCreate(apiInfo)  // utilizamos "bulkCreate" para insertar los objetos creados la db.
   	}                               //Country.bulkCreate(apiInfo) inserta en la tabla los objetos almacenados en apiInfo
   } catch (error) {
     		console.log({ error: error.message });
		}
};

//buscamos todos los paises
const allCountries = async () => {
    try{
        const paises = await Country.findAll({
            include: [{
                model: Activity,
                attributes: [ 'name', 'difficulty', 'duration', 'season',],
                through: { attributes:[] }
            }
            ]
        });
        return paises;
    } catch (error) {
        console.log({ error: error.message }); 
    }
;}


const findCountries = async (name) => {
    try{
        if(!name){                           //si name no está presente
          const countries = await Country.findAll({ // buscamos en la db todos e incluimos ...
            include:[{
              model: Activity,
              attributes: [ 'name', 'difficulty', 'duration', 'season',],
              through: { attributes:[] }  // through para evitar incluir info adicional en la tabla de relación entre los modelos Country y Activity
            }]
          })
          if(!countries){ 
            throw new Error("Country not found")}
                //QUERY
       } else {
          const country = await Country.findAll({  //buscamos todos los países q nombre contenga el valor de name
            where: {                              //sin importar si el nombre es mayúscula o minúscula.
              name: {[Op.iLike]: "%"+name+"%"} 
            },
              include: [{ 
                model: Activity,
                attributes: [ 'name', 'difficulty', 'duration', 'season',],
                through: { attributes: [] }
            }] 
        })  
        if(country) { // Si encuentra al menos 1 país que coincide con el valor de name --> lo devolvemos
            return country;
        } else {
          throw new Error("Country not found");
          }
        }    
      } catch (error) {
      console.log(error);
      }
}

module.exports = {getApiInfo, allCountries, findCountries};