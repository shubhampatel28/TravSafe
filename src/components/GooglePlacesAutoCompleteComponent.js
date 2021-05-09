import React, { Component, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import axios from "axios";
//import { useStateValue } from "../context/StateProvider";
//import { StateContext } from "../context/StateProvider";
import AppContext from "../context/app-context";
const { width, height } = Dimensions.get("window");

const API_KEY = "AIzaSyAyq6uZSqbqECm49ir6TDuEAUYr2RJRpCI";

export default function GooglePlacesAutocomplete(props) {
  const {
    setDestination,
    SET_DESTINATION_NAME,
    SET_LATLONG_OBJECT,
    SET_STATE_NAME,
    SET_COUNTRY_NAME,
    SET_DESTINATION_OBJECT,
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
          url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&type=(cities)&input=${searchKeyword}`,
        })
        .then((response) => {
          setSearchResults(response.data.predictions);
          setIsShowingResults(true);
        })
        .catch((e) => {
          alert("errror fetching auto search results... please bear with us");
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
        placeholder={"Search..."}
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
                  setSearchKeyword("");
                  setIsShowingResults(false);
                  SET_DESTINATION_NAME(item.structured_formatting.main_text);
                  if (item.terms[2] !== undefined) {
                    SET_COUNTRY_NAME(item.terms[2]["value"]);
                    SET_STATE_NAME(item.terms[1]["value"]);
                  } else {
                    SET_COUNTRY_NAME(item.terms[1]["value"]);
                  }
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
    width: width * 0.8,
  },
  searchBox: {
    width: "90%",
    justifyContent: "center",
    height: 35,
    fontSize: 18,
    borderRadius: 15,
    borderColor: "#aaa",
    color: "#000",
    // backgroundColor: transparent,
    borderWidth: 1.5,
    paddingLeft: 15,
    alignSelf: "center",
    marginBottom: 5,
    width: width * 0.7,
  },
});
