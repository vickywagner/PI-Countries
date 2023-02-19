import { GET_COUNTRIES } from "./actions";

//*** ESTADOS ****
const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: []
}


//******* CASOS *****
const reducer = (state = initialState, action ) => {
   switch (action.type) {
   	case GET_COUNTRIES:
      	return {
            ...state,
            countries: action.payload,
			allCountries: action.payload
         }
		default:
         return state;
	}
}



export default reducer;