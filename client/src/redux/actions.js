import axios from 'axios';


export const GET_COUNTRIES = 'GET_COUNTRIES';


//******ACTIONS*****

export const getCountries = () => async dispatch => {
    try {
        let json = await axios.get('http://localhost:3001/countries')
        return dispatch({ type: GET_COUNTRIES, payload: json.data })
    } catch (error) {
        console.log(error.message)
    }
}