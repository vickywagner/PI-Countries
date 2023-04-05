import { GET_COUNTRIES, GET_DETAIL, FILTER_CONTINENT, ORDER_BY_NAME, FILTER_POPULATION, FILTER_BY_ACTIVITIES, SEARCH_BY_NAME, GET_ACTIVITIES, POST_ACTIVITY, FILTER_TIMEZONES } from "./actions";

const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: {},
    filterActivity:'All',
    filterContinent:'All',
    filterTimezone: 'All',
}

const reducer = (state = initialState, action ) => {
   switch (action.type) {
   	case GET_COUNTRIES:
      	return {
            ...state,
            countries: action.payload,
			      allCountries: action.payload,
        };

    case GET_DETAIL:
      	return {
            ...state,
            detail: action.payload,
        };

    case FILTER_CONTINENT:
        const allCountries = state.allCountries;
        let continentFiltered = action.payload === 'All' 
          ? allCountries
          : allCountries.filter((country) => country.continent === action.payload);
        
      //si actualmente el estado filterActivity no es 'All', filtramos nuevamente "continentFiltered"
      //para incluir solo aquellos países que tengan la actividad específica que se está filtrando.
        if(state.filterActivity !== 'All'){
          continentFiltered = continentFiltered.filter((e) => e.Activities.find(a => a.name === state.filterActivity));
           } //usamos find para buscar en [] de act de cada país, la act que se está filtrando (state.filterActivity).
          
        return {
            ...state,
            countries: continentFiltered,
            filterContinent: action.payload,
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
				return 0;  // si son iguales
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

    case FILTER_BY_ACTIVITIES:
      let countriesActivities = state.allCountries

      //COMBINANDO CON CONTINENTES
      if(state.filterContinent!=='All'){
        countriesActivities= countriesActivities.filter(e=>e.continent===state.filterContinent)
      }

      const activityFilter =
        action.payload === "All"
          ? countriesActivities
          : countriesActivities.filter( 
            (e) => e.Activities && e.Activities.find(a => a.name === action.payload )
            );
      return {
        ...state,
        countries: activityFilter,
        filterActivity: action.payload,
      };

     
    case FILTER_TIMEZONES:
      let timezoneFiltered = state.allCountries;
      if (action.payload !== 'All') {
        timezoneFiltered = timezoneFiltered.filter(
          (country) => country.timezones.includes(action.payload)
        );
      }
       //COMBINANDO CON CONTINENTES
      if (state.filterContinent !== 'All') {
        timezoneFiltered = timezoneFiltered.filter(
          (country) => country.continent === state.filterContinent
        );
      }
      return {
        ...state,
        countries: timezoneFiltered,
        filterTimezone: action.payload,
  };
    
	default:
        return {...state};
	}
}

export default reducer;