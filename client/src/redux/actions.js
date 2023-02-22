import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_DETAIL = 'GET_DETAIL';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';


//******ACTIONS*****

export const getCountries = () => {
    return async function (dispatch) {
        try{  
            const apiData = await axios.get('http://localhost:3001/countries')
            const countries = apiData.data;
            dispatch({ type: GET_COUNTRIES, payload: countries })
        } catch (error) {
            console.error(error);
        }
    };
};

export const getDetail = (id) => {
    return async function (dispatch) {
        try{  
            const apiData = await axios.get(`http://localhost:3001/countries/${id}`)
            const detail = apiData.data;
            dispatch({ type: GET_DETAIL, payload: detail })
        } catch (error) {
            console.error(error);
        }
    };
};

//****** Filtrados ******** // NO FUNCIONAN todavia
export const filterContinent = (payload) =>{
    return {
        type: FILTER_CONTINENT,
        payload,
    }
} 

export const orderByName = (payload) => {
	return {
		type: ORDER_BY_NAME,
		payload,
	};
};


//Para la searchBar *******
export const searchByName = (name) => async dispatch => {
    try {
        let json = await axios.get(`http://localhost:3001/countries?name=${name}`)
        return dispatch({ type: SEARCH_BY_NAME, payload: json.data })
    } catch (error) {
        console.error(error);
    }
}