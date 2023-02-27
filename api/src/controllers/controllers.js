const {allCountries, findCountries } = require('../Service/countriesService');

//controlador de ruta que maneja la solicitud GET/countries ---> todos y x query

const totalCountries = async (req, res) => {
    try{
        if(req.query.name){
            const countryName = await findCountries(req.query.name);
            res.status(200).json(countryName);
        } else {
            const country = await allCountries();
            res.status(200).json(country);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {totalCountries};