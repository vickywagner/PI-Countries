import axios from 'axios';

// ******* Action Types *******
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_DETAIL = 'GET_DETAIL';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const FILTER_POPULATION = 'FILTER_POPULATION';
export const FILTER_BY_ACTIVITIES = 'FILTER_BY_ACTIVITIES'
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const FILTER_TIMEZONES = 'FILTER_TIMEZONES';


// ****** ACTIONS *****

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

//************* FILTRADOS *****************
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

export const filterPopulation = (payload) => {
	return {
		type: FILTER_POPULATION,
		payload,
	};
};

export function filterByActivities(activity) {
    return {
      type: FILTER_BY_ACTIVITIES,
      payload: activity,
    };
  }

/////VER
export const filterTimezones = (payload) => {
	return {
		type: FILTER_TIMEZONES,
		payload,
	};
};
//////////////////////////////////////////////

//Para la searchBar *******
export const searchByName = (name) => async dispatch => {
    try {
        let json = await axios.get(`http://localhost:3001/countries?name=${name}`)
        return dispatch({ type: SEARCH_BY_NAME, payload: json.data })
    } catch (error) {
        console.error(error);
    }
}

//********** ACTIVITIES (GET Y POST) *************
export const getActivities = () => async dispatch => {
    try {
    let json = await axios.get('http://localhost:3001/activities')
    return dispatch({ type: GET_ACTIVITIES, payload: json.data })
    } catch (error) {
        console.error(error);
    }
}

export const postActivity = (payload) => {
	return async function (dispatch) {
		try {
	        await axios.post('http://localhost:3001/activities', payload);
            return dispatch({ type: POST_ACTIVITY });
		} catch (error) {
            console.log(error)
            alert ("Activity not created")
		}
	};
};
