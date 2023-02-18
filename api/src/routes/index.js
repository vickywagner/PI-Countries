const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// ******** IMPORTACION Y DECLARACION DE RUTAS PARA SU USO ********
const countries = require("./country");
const activities = require("./activity");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countries);
router.use('/activities', activities);

module.exports = router;