const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  // ID (Código de tres letras). *
  // Nombre. *
  // Imagen de la bandera. *    flags?
  // Continente. *              region
  // Capital. *                 capital
  // Subregión.                 subregion
  // Área.                      area
  // Población. *               population


  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING(3),  //ID (Código de tres letras). *
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    image: {   //image = flags
      type: DataTypes.STRING, // image es string porque la URL viene en ""
      allowNull: false,
   },

   continent: {  //  continente = region 
    type: DataTypes.STRING,
    allowNull: false,
   },

   capital: {
    type: DataTypes.STRING,
    allowNull: false,
   },

   subregion: {
    type: DataTypes.STRING,
    allowNull: true,
   },

   area: {
    type: DataTypes.STRING,
    allowNull: true,
   },

   population: {
    type: DataTypes.INTEGER, 
    allowNull: false,
   },
   createInDb:{   // creamos esta propiedad "creado en BD" por si queremos llamar
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
   }  // por si hacemos la distincion de los que tiene la api y los de db, accedemos mas facil al que cree x esta propiedad
// todos los paises que yo cree, se van a crear con esta propiedad, por eso lo seteamos en true
},
    { timestamps: false }
  );
};
