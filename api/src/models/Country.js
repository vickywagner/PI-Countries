const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
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
   timezones: {
    type: DataTypes.TEXT, 
    allowNull: false,
   },
},
    { timestamps: false }
  );
};
