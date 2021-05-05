export const initialstate = {
  user: null,
  destination: "",
};

// Selector
const reducer = (state, action) => {
  console.log('Reducer Action Logged (Reducer.js -> reducer) >>>>>> Action: ',action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_DESTINATION_NAME":
      return {
        ...state,
        destinationName: action.payload,
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
