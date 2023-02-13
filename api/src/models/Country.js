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
      type: DataTypes.UUID, // UUID---> como la API ya tiene ID, con UUID creamos un ID con letras y numeros especificos, unico y no se repite
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // A default unique universal identifier generated following the UUID v4 standard
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true ??
    },

    image: {   //image = flags
      type: DataTypes.STRING, // image es string porque la URL se toma con ""
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
    type: DataTypes.INTEGER,   // es string??? o INTEGER ????
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
