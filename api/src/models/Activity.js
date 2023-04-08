const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define('Activity', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    difficulty: {   
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { 
            min: 1,
            max: 5,
            isEven(value){
                if(value < 1 || value > 5){
                    throw new Error("Difficulty must be between 1 and 5")
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
                    throw new Error("Duration must be between 1 and 24 hours");
                }
            }
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

