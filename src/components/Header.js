//import liraries
import React, { Component, useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import SearchBar from "./SearchBar";
import AppContext from "../context/app-context";
const { width, height } = Dimensions.get("window");
//make this component available to the app
import { Auth } from "aws-amplify";

// create a component
const Header = () => {
  //global state
  const { destinationName, user, SET_USER_NAME } = React.useContext(AppContext);
  //local stare
  const [destinationIsSet, setDestination] = useState(false);

  useEffect(() => {
    if (destinationName === "") {
      setDestination(false);
    } else {
      setDestination(true);
    }
  }, [destinationName]);

  const createTwoButtonAlert = () =>
    Alert.alert(
      "You are about to log-out",
      "Once logged out, your searches will not be stored and accessible",
      [
        {
          text: "Stay Logged-In",
          onPress: () => {
            console.log("User Still Logged-In");
          },
          style: "cancel",
        },
        {
          text: "Continue Logout",
          onPress: () => {
            Auth.signOut()
              .then((data) => {
                SET_USER_NAME(null);
              })
              .catch((err) => console.log(err));
            console.log("User Logged-out");
          },
        },
      ]
    );
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>
          {destinationName !== null ? destinationName : "Destination"}
        </Text>
        {!user ? (
          <Ionicon style={styles.Ionicon} name="person-circle-outline" />
        ) : (
          <Ionicon
            style={styles.Ionicon}
            name="log-out-outline"
            onPress={() => {
              createTwoButtonAlert();
            }}
          />
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
  headerText: {
    fontSize: 30,
    padding: 5,
    fontFamily: "Verdana",
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
    paddingRight: 10,
  },
  search: {
    alignSelf: "center",
    width: width * 0.8,
    marginBottom: 5,
  },
});

//make this component available to the app
export default Header;
