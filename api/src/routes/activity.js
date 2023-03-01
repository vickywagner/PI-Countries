const { Router } = require("express");
const { Country, Activity } = require("../db");

const router = Router();

router.get('/', async (req, res) => {
    const activities = await Activity.findAll();
    if(activities) {
      return res.status(200).json(activities);
    } else {
      return res.status(404).json(activities.length ? activities :"No se encontraron activdades"); 
    }
});

router.post("/", async(req,res,next)=>{
  try{
    let {name, difficulty, duration, season, idCountry} = req.body;
      
      if(name && difficulty && duration && season && idCountry ){ //si todos estan
        
        if(difficulty > 0 && difficulty < 6){
            
          if(season === 'Summer' || season === 'Autumn' || season === 'Winter' || season ==='Spring'){
                 
              let searchId = await Country.findAll({
                  where:{
                    id: idCountry
                  }
              });
                  if(!searchId[0]){ //si searchId está vacío
                    return res.status(409).send("Please enter a valid country ID");

                  }else{ // si no está vacío, se crea un nuevo objeto de actividad en la db
                      let newActivity = await Activity.create({
                          name,
                          difficulty,
                          duration,
                          season,
                        }); // se llama al método addCountries en el nuevo obj de actividad para agregar la relación 
                        newActivity.addCountries(searchId)  // entre la actividad y el país correspondiente en la db
                        res.send(newActivity)
                      }
              }else{
                return res.status(408).send("Enter a valid season (summer, autumn, winter, spring)");
              }
          }else{
              return res.status(409).send("Please enter a difficulty from 1 to 5");
          }
      }else{ //Si no se proporcionaron todos los valores necesarios en el body de la solicitud
          res.status(410).send({Error:"Please fill in all the fields to create the activity"})
      }
    }
    catch(err){
        next(err)
    }
});


module.exports = router;
