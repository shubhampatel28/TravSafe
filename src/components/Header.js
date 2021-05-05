//import liraries
import React, { Component, useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import SearchBar from "./SearchBar";
import GooglePlacesAutoCompleteComponent from "./GooglePlacesAutoCompleteComponent";
import AppContext from "../context/app-context";
const { width, height } = Dimensions.get("window");

//make this component available to the app

// create a component
const Header = () => {
  //global state
  const { destinationName } = React.useContext(AppContext);
  //local stare
  const [destinationIsSet, setDestination] = useState(false);

  useEffect(() => {
    if (destinationName === "") {
      setDestination(false);
    } else {
      setDestination(true);
    }
  }, [destinationName]);

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>
          {destinationName}
        </Text>
        <Ionicon style={styles.Ionicon} name="person-circle-outline" />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
  headerText: {
    fontSize: 34,
    marginBottom: 10,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginLeft: 8,
    marginRight: 8,
  },
  Ionicon: {
    fontSize: 36,
  },
  search: {
    alignSelf: "center",
  },
});

//make this component available to the app
export default Header;
