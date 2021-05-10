export const initialstate = {
  user: null,
  destination: "",
  stateName: "",
  countryName: "",
  destinationObject: null,
  travelWarning: null,
};

// Selector
const reducer = (state, action) => {
  // console.log(
  //   "Reducer Action Logged (Reducer.js -> reducer) >>>>>> Action: ",
  //   action
  // );
  switch (action.type) {
    case "SET_USER_NAME":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_TRAVEL_WARNING":
      return {
        ...state,
        travelWarning: action.payload,
      };
    case "SET_DESTINATION_NAME":
      return {
        ...state,
        destinationName: action.payload,
      };
    case "SET_STATE_NAME":
      return {
        ...state,
        stateName: action.payload,
      };
    case "SET_COUNTRY_NAME":
      return {
        ...state,
        countryName: action.payload,
      };
    case "SET_DESTINATION_OBJECT":
      return {
        ...state,
        destinationObject: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
