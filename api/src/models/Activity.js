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
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true // VER PORQUE DESP NO PUEDO HACER 2 CON EL = NOMBRE
    },

    difficulty: {   
        type: DataTypes.INTEGER,    //DataTypes.ENUM('1','2','3','4','5'), 
        allowNull: false,
        validate: { 
            min: 1,
            max: 5,
            isEven(value){
                if(value < 1 || value > 5){
                    throw new Error("La dificultad tiene que ser entre 1 y 5")
                }
            }
        }
    },

    duration: {
        type: DataTypes.INTEGER, 
        validate: { 
            min: 1,
            max: 24,
            isEven(value){
                if(value < 1 || value > 24){
                    throw new Error("La duracion tiene que ser entre 1 y 24");
                }
            }
        }
    },

    season: {  
        type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
        allowNull: false
     },
    //  createInDb:{   // creamos esta propiedad "creado en BD" por si queremos filtrar
    //     type: DataTypes.BOOLEAN,
    //     allowNull: false,
    //     defaultValue: true,
    //    }  // por si hacemos la distincion de los que tiene la api y los de db, accedemos mas facil al que cree x esta propiedad
    // todos los paises que yo cree, se van a crear con esta propiedad, por eso lo seteamos en true
    },
    { timestamps: false }
    );
 };

