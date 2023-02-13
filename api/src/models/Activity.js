const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  
  //MODELO 2 | Activity
  // ID. *
  // Nombre. *
  // Dificultad (número del 1 al 5). *
  // Duración (en horas).
  // Temporada (Verano, Otoño, Invierno o Primavera). *

  sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // ????
    },

    difficulty: {   
        type: DataTypes.INTEGER, // FALTA INDICAR QUE ES DEL 1 AL 5    DataTypes.ENUM('1','2','3','4','5'), ??
        allowNull: false,
        validate: { 
            max: 5,
            min: 1
        }
    },

    duration: {
        type: DataTypes.INTEGER, //   type: DataTypes.TIME,  ??
        validate: { 
            max: 24,
            min: 1
        }
    },

    season: {  
        type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
        allowNull: false
     },
    },
    { timestamps: false }
    );
 };




