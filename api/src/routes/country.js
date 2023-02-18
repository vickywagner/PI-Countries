const { Router } = require('express');
const axios = require('axios');
//const { getAllCountries } = require('../controllers/controllers');
const { Country, Activity } = require("../db.js");
const { Op } = require("sequelize");

const router = Router(); 


//************ Traer informacion de la API *************

const getApiInfo = async () => {  // Trabajamos de manera asincrona porque no sabemos cuanto demora la rta, 
  try {                           //esperamos la rta antes cargarle la info a la const apiUrl         
      const apiUrl = await axios.get('https://restcountries.com/v3/all');                                                           
      const apiInfo = apiUrl.data.map(country => {
          return {
              id: country.cca3,
              name: country.name.common,
              image: country.flags[1],
              continent: country.region,
              capital: country.capital ? country.capital[0] : `This country doesn't have capital.`,
              subregion: country.subregion ? country.subregion : `This country doesn't have subregion.`,
              area: country.area,     // area: `${country.area}km2`,
              population: country.population,   
          }
      });
     //console.log(apiInfo);
      return apiInfo;
  } catch (error) {
  console.log({ error: error.message });
  }
}

//*********** CONSULTA A LA BASE DE DATOS ************

const getInfoDb = async () => {
  try{ 
    const countries = await Country.findAll();
   // console.log(countries)
    if(countries && !countries.length) {  //si countries existe y no tiene nada
      const array = await getApiInfo(); //traemos la info de la api
      await Country.bulkCreate(array) // metodo para crear instancias de la tabla Country en la db
    }
  } catch (error) {
    console.log(error)
  }
 }

//************ TRAER INFO API + DB *****************
const loadCountries = async () => { await getInfoDb() }
loadCountries();



//***********Ruta general de todos los paises o por Query**********
router.get("/", async (req, res) => {
  const name = req.query.name
  try{
    if(!name){                           //si name no está presente
      const countries = await Country.findAll({ // buscamos todos e incluimos ...
        include:[{
          model: Activity,
          attributes: [ 'name', 'difficulty', 'duration', 'season',],
          through: { attributes:[] }  // through para evitar incluir infor adicional en la tabla de relación entre los modelos Country y Activity
        }]
      })
      if(countries){ 
        return res.status(200).json(countries);
      }else{
        return res.status(404).send("Countries not found");
      }
            //QUERY
   } else {
      const country = await Country.findAll({  //buscamos todos los países q nombre contenga el valor de name
        where: {                              //  sin importar si el nombre es mayúscula o minúscula.
          name: {[Op.iLike]: `%${name}%`} 
        },
          include: [{ 
            model: Activity,
            attributes: [ 'name', 'difficulty', 'duration', 'season',],
            through: { attributes: [] }
        }] 
    })  
    if(country) { // Si encuentra al menos 1 país que coincide con el valor de name --> res 200
        return res.status(200).json(country);
    } else {
        return res.status(404).send("Country not found");
      }
    }    
  } catch (error) {
  console.log(error)
  }
});

//************Ruta a cada Pais segun ID***********
router.get('/:idPais', async (req, res) => {
  const idPais = req.params.idPais
  
  try {
      const country = await Country.findOne({
          where: {
              id: idPais.toUpperCase()  // case insensitive (a mayúsculas y minúsculas)
          }, 
          include: [{ 
              model: Activity,
              attributes: [ 'name', 'difficulty', 'duration', 'season',],
              through: { attributes: [] }
          }] 
        })
        if(country) {
          return res.status(200).json(country);
      } else {
          return res.status(404).send("Country not found");
      } 
  } catch (error) {
      console.log(error)
  }
});

module.exports = router;

