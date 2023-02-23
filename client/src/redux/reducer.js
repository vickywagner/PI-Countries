import { GET_COUNTRIES, GET_DETAIL, FILTER_CONTINENT, ORDER_BY_NAME, FILTER_POPULATION, SEARCH_BY_NAME, GET_ACTIVITIES, POST_ACTIVITY } from "./actions";

//*** ESTADOS ****
const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: {},
    //sorting: [],
}

//******* CASOS *****
const reducer = (state = initialState, action ) => {
   switch (action.type) {
   	case GET_COUNTRIES:
      	return {
            ...state,
            countries: action.payload,
			      allCountries: action.payload
        };

    case GET_DETAIL:
      	return {
            ...state,
            detail: action.payload,
        };

    case FILTER_CONTINENT:
        const allCountries = state.allCountries;
        const continentFiltered = action.payload === 'All' ? allCountries : allCountries.filter((country) => country.continent === action.payload);
        return {
              ...state,
              countries: continentFiltered,
        };

    case SEARCH_BY_NAME:
        return {
            ...state,
            countries: action.payload
        };

    case ORDER_BY_NAME:
		let sortedArr = action.payload === 'asc'
			? state.countries.slice().sort(function (a, b) {
				if (a.name > b.name) {
					return 1;
				}
				if (b.name > a.name) {
					return -1;
				}
				return 0; 
			}) : state.countries.slice().sort(function (a, b) {
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
            
        case FILTER_POPULATION:
            let sortedArrPop =
            action.payload === "low"
              ? state.countries.slice().sort(function (a, b) {
                  if (a.population > b.population) {
                    return 1;
                  }
                  if (b.population > a.population) {
                    return -1;
                  }
                  return 0;
                })
              : state.countries.slice().sort(function (a, b) {
                  if (a.population > b.population) {
                    return -1;
                  }
                  if (b.population > a.population) {
                    return 1;
                  }
                  return 0;
                });
          return {
            ...state,
            countries: sortedArrPop,
        };

    case GET_ACTIVITIES:
        return{
            ...state,
            activities: action.payload,
        };

    case POST_ACTIVITY:
        return {
            ...state,
    }; 
    
	default:
        return {...state};
	}
}

export default reducer;