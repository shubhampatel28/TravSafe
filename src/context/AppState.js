import React, { useState, useReducer } from "react";
import AppContext from "./app-context";
import reducer from "./reducer";

const AppState = (props) => {
  const [destination, setDestination] = useState("");

  const initialState = {
    user: null,
    destinationName: "Destination",
    destinationObject: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //Method to set the destination Name
  const SET_DESTINATION_NAME = (newdestinationName) => {
      dispatch({
          type: 'SET_DESTINATION_NAME',
          payload: newdestinationName
      })
  };

  //Method to set the destination object
  const SET_DESTINATION_OBJECT = ({destinationObject}) => {};

  //Method to set the User
  const SET_USER = (user) => {};

  return (
    <AppContext.Provider
      value={{
        destinationName: state.destinationName,
        SET_DESTINATION_NAME,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
