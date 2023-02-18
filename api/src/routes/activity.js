// const { Router } = require('express');
// //const { getAllCountries } = require('../controllers/controllers');
// const { Country, Activity } = require("../db.js");
// const { Op } = require("sequelize");

// const router = Router();


// // 📍 GET | /activities
// // Obtiene un arreglo de objetos, donde cada objeto es una actividad turística.

// // router.get("/activity", async (req, res) => {
// //     try {
// //       const activities = await Activity.findAll({   //buscamos todas las actividades turísticas en la db
// //         include: [                  //incluimos los países relacionados con cada actividad turística
// //           {
// //             model: Country,                // incluimos el modelo Country
// //             through: { attributes: [] },   // y no queremos que se muestren los atributos de la tabla intermedia
// //           },
// //         ],
// //       });
// //       res.json(activities);
// //     } catch (error) {
// //       console.log(error);
// //       res.status(404).json(activities.length ? activities: "Activities not found");
//       //   {
//       //   error: "GET_ACTIVITIES_ERROR",
//       //   description: "Error getting activities",
//       // });
//     //}
//   //});

// // POST | /activities
// // Esta ruta recibirá todos los datos necesarios para crear una actividad turística y relacionarla 
// //con los países solicitados.
// // Toda la información debe ser recibida por body.
// // Debe crear la actividad turística en la base de datos, y esta debe estar relacionada con los países indicados (al menos uno).

// // router.post("/", async (req, res) => {
// //     try {
// //       const { name, difficulty, duration, season, countries } = req.body;

// //       // Creamos la actividad turística en la base de datos
// //       const newActivity = await Activity.create({
// //         name: name,
// //         difficulty: difficulty,
// //         duration: duration,
// //         season: season,
// //       })
// //     // busca el país correspondiente en la tabla de países utilizando el método findAll
// //       countries.map(async (countryId) => {
// //         const foundCountry = await Country.findAll({
// //           where: { idName: countryId },
// //         })
// //     // Si se encuentra el país, se asocia con la actividad recién creada utilizando el método addCountries
// //         if (foundCountry) newActivity.addCountries(foundCountry);
// //       })
// //       res.status(201).json({ msg: "Activity created correctly" })

// //     } catch (error) {
// //       console.log(error);
// //       res.status(400).json({error: "Error creating the activity" })
// //     }
// //   });




  
// // //DEMO M4 SEQUELIZE
// // // router.post('/players', async (req, res) => {
// // //     const { firstName, lastName, username, birthday, status, skill, password } = req.body;
// // //     try {
// // //       const newPlayer = await Player.create({
// // //         firstName,
// // //         lastName,
// // //         username,
// // //         birthday,
// // //         status,
// // //         skill,
// // //         password
// // //       });
// // //       res.json(newPlayer);
// // //     } catch (error) {
// // //       res.send(error);
// // //     }
// // //   });
  

// //rutas tomi

// // // Ruta para desplegar actividades
// // router.get("/activities", async (req, res) => {
// //   const activities = await Activity.findAll();
// //   if (activities) {
// //     return res.status(200).json(activities);
// //   } else {
// //     return res
// //       .status(404)
// //       .json(activities.length ? activities : "No se encontraron activdades");
// //   }
// // });

// // // Ruta para postear actividades
// // router.post("/activities", async (req, res) => {
// //   try {
// //     const { name, difficulty, duration, season, countries } = req.body;
// //     if (name && difficulty && duration && season && countries) {
// //       const activity = await Activity.create({
// //         name,
// //         difficulty,
// //         duration,
// //         season,
// //       });

// //       countries.forEach(async (id) => {
// //         const country = await Country.findOne({
// //           where: { id: { [Op.iLike]: `%${id}%` } },
// //         });
// //         await country?.addActivity(activity);
// //       });

// //       return res.send(activity);
// //     } else {
// //       return res.status(404).json("Missing data");
// //     }
// //   } catch (error) {
// //     next(error);
// //   }
// // });


// // Ruta para desplegar actividades
// router.get("/activity", async (req, res) => {
//   const activities = await Activity.findAll();
//   if (activities) {
//     return res.status(200).json(activities);
//   } else {
//     return res
//       .status(404)
//       .json(activities.length ? activities : "No se encontraron activdades");
//   }
// });

// // Ruta para postear actividades
// router.post("/activity", async (req, res) => {
//   try {
//     const { name, difficulty, duration, season, countries } = req.body;
//     if (name && difficulty && duration && season && countries) {
//       const activity = await Activity.create({
//         name,
//         difficulty,
//         duration,
//         season,
//       });

//       countries.forEach(async (id) => {
//         const country = await Country.findOne({
//           where: { id: { [Op.iLike]: `%${id}%` } },
//         });
//         await country?.addActivity(country);
//       });

//       return res.send(activity);
//     } else {
//       return res.status(404).json("Missing data");
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;


// const { Router } = require("express");
// const { Activity } = require("../db");

// const router = Router();

// //****Ruta para desplegar actividades
// const postActivity = async (name, difficulty, duration, season, countries) => {
 
//     const newActivity = await Activity.create({
//       name,
//       difficulty,
//       duration,
//       season
//     });

//     await newActivity.addCountries(countries)
//     return newActivity;
// };

// const searchActivities = async () => {
//   try {
//     const getActivities = await Activity.findAll();
//     return getActivities;
//   } catch (error) {
//     console.log('No existen actividades')
//   }
// }

// router.post('/', async (req, res) => {
//   try {
//     const { name, difficulty, duration, season, countries } = req.body;
//     const newActivity = await postActivity(name, difficulty, duration, season, countries)
//     res.status(201).send(newActivity)
//   } catch (error) {
//     console.log('No se pudo crear la actividad')
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const getActivities = await searchActivities();
//     res.status(200).json(getActivities);
//   } catch (error) {
//     console.log('No existen actividades')
//   }
// })

// module.exports = router;


const { Router } = require("express");
const { Activity } = require("../db");

const router = Router();

// Ruta para desplegar actividades

const searchActivities = async () => {
  try {
    const getActivities = await Activity.findAll();
    return getActivities;
  } catch (error) {
    console.log('No existen actividades')
  }
}

router.post('/', async (req, res) => {
  let {name, difficulty, duration, season, idCountry}=req.body;

   const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season
    });
    let searchId=await Country.findAll({
      where:{
        id: idCountry
      }
    });
    await newActivity.addCountries(searchId)
    res.send(newActivity);
  
})


router.get('/', async (req, res) => {
  try {
    const getActivities = await searchActivities();
    res.status(200).json(getActivities);
  } catch (error) {
    console.log('No existen actividades')
  }
})


module.exports = router;
