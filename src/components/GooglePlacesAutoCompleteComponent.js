import React, { Component, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import axios from "axios";
//import { useStateValue } from "../context/StateProvider";
//import { StateContext } from "../context/StateProvider";
import AppContext from "../context/app-context";

const API_KEY = "AIzaSyAyq6uZSqbqECm49ir6TDuEAUYr2RJRpCI";

export default function GooglePlacesAutocomplete(props) {
  const {
    setDestination,
    SET_DESTINATION_NAME,
  } = React.useContext(AppContext);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isShowingResults, setIsShowingResults] = useState(false);

  const searchLocation = async (text) => {
    setSearchKeyword(text);
    if (text.length <= 2) {
      // Clear button was clicked, do some stuff...
      setIsShowingResults(false);
    } else {
      axios
        .request({
          method: "post",
          url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${searchKeyword}`,
        })
        .then((response) => {
          console.log(
            "Data Received from places search autocomplete call (searchLocation function Places Component) >>>>>>>> ",
            response.data
          );
          setSearchResults(response.data.predictions);
          setIsShowingResults(true);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const onClickHandler = (item) => {
    setSearchKeyword(item.description);
    //setIsShowingResults(false);
  };

  return (
    <View style={styles.autocompleteContainer}>
      <TextInput
        placeholder={
          searchKeyword != "" ? searchKeyword : "Search for an address"
        }
        returnKeyType="search"
        style={styles.searchBox}
        placeholderTextColor="#000"
        onChangeText={(text) => searchLocation(text)}
        value={searchKeyword}
        clearButtonMode="always"
      />
      {isShowingResults && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => {
                  setSearchKeyword(item.description);
                  setIsShowingResults(false);
                  SET_DESTINATION_NAME(item.structured_formatting.main_text);
                  console.log(
                    "selected item from the list of places (Places Component -> Render -> FlatList -> TouchableOpacity)   >>>>>>",
                    item.structured_formatting.main_text
                  );
                }}
              >
                <Text>{item.description}</Text>
              </TouchableOpacity>
            );
          }}
          style={styles.searchResultsContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    zIndex: 1,
    width: "100%",
    justifyContent: "center",
  },
  searchResultsContainer: {
    width: "90%",
    height: 200,
    backgroundColor: "#fff",
    position: "absolute",
    top: 35,
    alignSelf: "center",
  },
  resultItem: {
    width: "100%",
    justifyContent: "center",
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  searchBox: {
    width: "90%",
    justifyContent: "center",
    height: 35,
    fontSize: 18,
    borderRadius: 15,
    borderColor: "#aaa",
    color: "#000",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    paddingLeft: 15,
    alignSelf: "center",
  },
});

/*
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesAutoCompleteComponent = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      listViewDisplayed="null" // true/false/undefined
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: "AIzaSyAyq6uZSqbqECm49ir6TDuEAUYr2RJRpCI",
        language: "en",
      }}
      requestUrl={{
        useOnPlatform: "all", // or "all"
        url:
          "https://cors-anywhere.herokuGooglePlacesAutocomplete.com/https://maps.googleapis.com/maps/api", // or any proxy server that hits https://maps.googleapis.com/maps/api
      }}
      styles={{
        textInputContainer: {
          backgroundColor: "rgba(0,0,0,0)",
          borderTopWidth: 0,
          borderBottomWidth: 0,
          height: 10,
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: "#5d5d5d",
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
      }}
    />
  );
};

export default GooglePlacesAutoCompleteComponent;

const styles = StyleSheet.create({});
*/
