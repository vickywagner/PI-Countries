const { Router } = require("express");
const { Country, Activity } = require("../db");

const router = Router();

router.post("/", async(req,res,next)=>{
  try{
    let {name, difficulty, duration, season, idCountry} = req.body;

      if(name && difficulty && duration && season && idCountry ){

          if(difficulty > 0 && difficulty < 6){

              if(season === 'Summer' || season === 'Autumn' || season === 'Winter' || season ==='Spring'){
                      let searchId = await Country.findAll({
                          where:{
                              id: idCountry
                          }
                      });

                      if(!searchId[0]){
                        return res.status(409).send("Por favor ingrese un ID de pais valido");

                      }else{
                          let newActivity=await Activity.create({
                                  name,
                                  difficulty,
                                  duration,
                                  season,
                  
                          });
                          newActivity.addCountries(searchId)
                          res.send(newActivity)
                      }
              
              }else{
                      return res.status(408).send("Ingrese una temporada valida (summer,autumn,winter,spring)");
              }
          }else{
              return res.status(409).send("Por favor ingrese una dificulta en numeros del 1 al 5");
          }
      }else{
          res.status(410).send({Error:"Por Favor rellene todos los campos para crear la actividad"})
      }
    }
    catch(err){
        next(err)
    }
});


module.exports = router;
