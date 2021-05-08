import React, { useState, useReducer } from "react";
import AppContext from "./app-context";
import reducer from "./reducer";

const AppState = (props) => {
  const [destination, setDestination] = useState("");

  const initialState = {
    user: null,
    destinationName: null,
    stateName: null,
    countryName: null,
    destinationObject: null,
    latLongObj: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //Method to set the destination Name
  const SET_DESTINATION_NAME = (newdestinationName) => {
    dispatch({
      type: "SET_DESTINATION_NAME",
      payload: newdestinationName,
    });
  };

  const SET_STATE_NAME = (newStateName) => {
    dispatch({
      type: "SET_STATE_NAME",
      payload: newStateName,
    });
  };

  const SET_COUNTRY_NAME = (newCountryName) => {
    dispatch({
      type: "SET_COUNTRY_NAME",
      payload: newCountryName,
    });
  };

  //Method to set the destination object
  const SET_DESTINATION_OBJECT = ({ destinationObject }) => {
    dispatch({
      type: "SET_DESTINATION_OBJECT",
      payload: destinationObject,
    });
  };

  const SET_LATLONG_OBJECT = ({ latLongObj }) => {
    dispatch({
      type: "SET_LATLONG_OBJECT",
      payload: latLongObj,
    });
  };

  //Method to set the User
  const SET_USER = (user) => {};

  return (
    <AppContext.Provider
      value={{
        destinationName: state.destinationName,
        stateName: state.stateName,
        countryName: state.countryName,
        latLongObj: state.latLongObj,
        destinationObject: state.destinationObject,
        SET_DESTINATION_NAME,
        SET_STATE_NAME,
        SET_COUNTRY_NAME,
        SET_LATLONG_OBJECT,
        SET_DESTINATION_OBJECT,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
