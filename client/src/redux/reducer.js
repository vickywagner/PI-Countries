import { GET_COUNTRIES, GET_DETAIL, FILTER_CONTINENT, ORDER_BY_NAME, SEARCH_BY_NAME } from "./actions";

//*** ESTADOS ****
const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: [],
    //sorting: [],
}

//******* CASOS *****
const reducer = (state = initialState, action ) => {
   switch (action.type) {
   	case GET_COUNTRIES:
      	return {
            ...state,
            countries: action.payload,
			//allCountries: action.payload
        }

    case GET_DETAIL:
      	return {
            ...state,
            detail: action.payload,
        }

    case FILTER_CONTINENT:
        const allCountries = state.allCountries;
        const continentFiltered = action.payload === 'All' ? allCountries : allCountries.filter((country) => country.continent === action.payload)
          
        return {
              ...state,
              countries: continentFiltered,
        }

    case SEARCH_BY_NAME:
        return {
            ...state,
            countries: action.payload
        }

    case ORDER_BY_NAME:
		let sortedArr = action.payload === 'asc'
			? state.countries.sort(function (a, b) {
				if (a.name > b.name) {
					return 1;
				}
				if (b.name > a.name) {
					return -1;
				}
				return 0; 
			}) : state.countries.sort(function (a, b) {
				if (a.name > b.name) {
					return -1;
				}
			    if (b.name > a.name) {
					return 1;
				}
				return 0;
			});
			return {
				...state,
				countries: sortedArr,
			};
	default:
        return {...state};
	}
}

export default reducer;