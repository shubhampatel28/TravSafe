//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const { width, height } = Dimensions.get("window");
const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'YOUR API KEY',
        language: 'en',
      }}
    />
  );
};

// create a component
const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Ionicon name="search" style={styles.Ionicon} />
      <TextInput style={styles.searchInput} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "baseline",
    
  },
  searchInput: {
    borderWidth: 2,
    borderRadius: 12,
    marginTop: 5,
    borderColor: "darkgray",
    width: "82%",
    height: 28,
    alignSelf: "flex-start",
  },
  Ionicon: {
    fontSize: 28,
    marginBottom: 10,
    marginTop: 5,
    marginLeft: width * 0.045,
  },
});

//make this component available to the app
export default SearchBar;
