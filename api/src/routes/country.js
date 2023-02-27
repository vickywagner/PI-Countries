const { Router } = require('express');
const { Country, Activity } = require("../db.js");
const { totalCountries} = require('../controllers/controllers')

const router = Router(); 

// //***********Ruta general de todos los paises o por Query**********
router.get("/", totalCountries);

//controllers y service


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

