import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { makeStyles } from "@material-ui/core/styles";
import { Card, ListItem, Icon } from "react-native-elements";
import Separator from "../components/Separator";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppContext from "../context/app-context";
import axios from "axios";
import { Auth } from "aws-amplify";

const ScoreScreen = () => {
  const {
    destinationName,
    stateName,
    countryName,
    user,
    SET_USER_NAME,
    travelWarning,
    SET_TRAVEL_WARNING,
  } = React.useContext(AppContext);
  const [travelWarningMe, setTravelWarningMe] = useState("");
  const [travelScore, setTravelScore] = useState("");
  const [totalCases, setTotalCases] = useState("");
  const [totalDeaths, setTotalDeaths] = useState("");
  const [newCasesToday, setNewCasesToday] = useState("");
  const [deathsToday, setDeathsToday] = useState("");
  const [graphUrl, setGraphUrl] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [locationfound, setLocationFound] = useState(false);

  // https://restcountries.eu/rest/v2/name/India?fullText=true

  const countryCodeUrl =
    "https://restcountries.eu/rest/v2/name/" + countryName + "?fullText=true";
  useEffect(() => {
    if (user) {
      console.log(user, destinationName, countryName, stateName);
    }
  }, [destinationName]);

  const getCountryCode = () => {
    axios
      .get(countryCodeUrl)
      .then(function (response) {
        // handle success
        const code = response.data[0].alpha2Code;
        setCountryCode(code);
        setLocationFound(true);
      })
      .catch(function (error) {
        setLocationFound(false);
        console.log(error.message);
      });
  };

  const getScore = () => {
    const urlforscore =
      "https://w465h03xn2.execute-api.us-west-2.amazonaws.com/travamplif/score?countryCode=" +
      countryCode;
    // setTravelScore("")
    axios
      .get(urlforscore)
      .then(function (response) {
        // handle success
        setTravelScore(response.data.data[countryCode].advisory.score);
        setTravelWarningMe(response.data.data[countryCode].advisory.message);
        // SET_TRAVEL_WARNING(response.data.data[countryCode].advisory.message)
      })
      .catch(function (error) {
        setTravelScore("Data Unavailable, API Error");
        setTravelWarningMe("Data Unavailable, API Error");
      });
  };

  const getStats = () => {
    const urlforstats =
      "https://w465h03xn2.execute-api.us-west-2.amazonaws.com/travamplif/covidstats?countryCode=" +
      countryCode;
    axios
      .get(urlforstats)
      .then(function (response) {
        setTotalCases(response.data.data.latest_data.confirmed);
        setTotalDeaths(response.data.data.latest_data.deaths);
        setDeathsToday(response.data.data.today.deaths);
        setNewCasesToday(response.data.data.today.confirmed);
      })
      .catch(function (error) {
        setTotalCases("Data Unavailable, API Error");
        setTotalDeaths("Data Unavailable, API Error");
        setDeathsToday("Data Unavailable, API Error");
        setNewCasesToday("Data Unavailable, API Error");
      });
  };

  const getGraph = () => {
    const urlforstats =
      "https://w465h03xn2.execute-api.us-west-2.amazonaws.com/travamplif/covidgraph?countryCode=" +
      countryCode;
    axios
      .get(urlforstats)
      .then(function (response) {
        setGraphUrl(response.data.imageUrl);
      })
      .catch(function (error) {
        setGraphUrl("Data Unavailable, API Error");
      });
  };

  getCountryCode();
  getScore();
  getStats();
  getGraph();

  if (locationfound == false) {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          textAlign: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Card containerStyle={styles.innerCardContainer}>
          <View
            style={{
              width: "100%",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Text>Please select a destination to get the Score!</Text>
          </View>
        </Card>
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View style={styles.center}>
          <Card containerStyle={styles.secondCardContainer}>
            <View style={{ width: 300, alignItems: "left" }}>
              <Text style={styles.secondCardTitleText}>
                Travel Caution Score for {countryName}
              </Text>
            </View>
            {/* <Separator /> */}
            <View style={{ width: 300, flexDirection: "row", padding: 10 }}>
              <View
                style={{
                  width: "100%",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                {travelScore <= 2 ? (
                  <Text style={styles.scoreTextGreen}>{travelScore}/5</Text>
                ) : travelScore > 2 && travelScore < 3.5 ? (
                  <Text style={styles.scoreTextOrange}>{travelScore}/5</Text>
                ) : (
                  <Text style={styles.scoreTextRed}>{travelScore}/5</Text>
                )}
                {/* <Text style={styles.scoreTextOne}>{travelScore}/5</Text> */}
              </View>
            </View>
            <View style={{ width: 300, flexDirection: "row", padding: 10 }}>
              <View
                style={{
                  width: "100%",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                {/* {travelWarningMe !== null ? <Text style={styles.warningText}>{travelWarningMe}</Text>: <Text> Hello</Text>} */}
                <Text style={styles.warningText}>{travelWarningMe}</Text>
              </View>
            </View>
          </Card>

          <Card containerStyle={styles.secondCardContainer}>
            <View style={{ width: 300, alignItems: "left" }}>
              {/* { countryName !== "" ?  <Text style={styles.secondCardTitleText}>Covid-19 Stats for {countryName}</Text>: <Text style={styles.secondCardTitleText}>Covid-19 Stats for Country loading ....</Text>} */}
              <Text style={styles.secondCardTitleText}>
                Covid-19 Stats for {countryName}
              </Text>
            </View>
            <View style={{ width: 130, flexDirection: "row", padding: 0 }}>
              <Card containerStyle={styles.innerCardContainer}>
                <View
                  style={{
                    width: "100%",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.warningText}>Total Cases</Text>
                  <Text style={styles.statsText}>{totalCases}</Text>
                </View>
              </Card>
              <Card containerStyle={styles.innerCardContainer}>
                <View
                  style={{
                    width: "100%",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.warningText}>Cases Today</Text>
                  <Text style={styles.statsText}>{newCasesToday}</Text>
                </View>
              </Card>
            </View>

            <View style={{ width: 130, flexDirection: "row", padding: 0 }}>
              <Card containerStyle={styles.innerCardContainer}>
                <View
                  style={{
                    width: "100%",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.warningText}>Total Deaths</Text>
                  <Text style={styles.statsText}>{totalDeaths}</Text>
                </View>
              </Card>
              <Card containerStyle={styles.innerCardContainer}>
                <View
                  style={{
                    width: "100%",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.warningText}>Deaths Today</Text>
                  <Text style={styles.statsText}>{deathsToday}</Text>
                </View>
              </Card>
            </View>
          </Card>

          <Card containerStyle={styles.secondCardContainer}>
            <View style={{ width: 300, alignItems: "left" }}>
              <Text style={styles.secondCardTitleText}>
                Covid Cases Graph for {countryName}
              </Text>
            </View>
            <View>
              <Image style={styles.imageStyle} source={{ uri: graphUrl }} />
            </View>
          </Card>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#d1d5de",
    paddingBottom: 50,
    paddingTop: 20,
  },
  firstCardContainer: {
    width: "90%",
    borderRadius: 20,
    borderWidth: 6,
  },
  firstCardText: {
    fontSize: 24,
  },
  secondCardContainer: {
    width: "90%",
    padding: 3,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    borderColor: "white",
  },
  innerCardContainer: {
    width: "90%",
    padding: 3,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    borderColor: "white",
    shadowColor: "grey",
  },
  secondCardTitleText: {
    fontSize: 20,
    width: "100%",
    alignItems: "flex-start",
    textAlign: "center",
    fontFamily: "Verdana",
    padding: 10,
  },
  scoreTextRed: {
    fontSize: 24,
    width: 100,
    alignItems: "flex-start",
    textAlign: "center",
    fontFamily: "Verdana",
    padding: 10,
    textAlign: "center",
    backgroundColor: "red",
  },
  scoreTextOrange: {
    fontSize: 24,
    width: 100,
    alignItems: "flex-start",
    textAlign: "center",
    fontFamily: "Verdana",
    padding: 10,
    textAlign: "center",
    backgroundColor: "orange",
  },
  scoreTextGreen: {
    fontSize: 24,
    width: 100,
    alignItems: "flex-start",
    textAlign: "center",
    fontFamily: "Verdana",
    padding: 10,
    textAlign: "center",
    backgroundColor: "green",
  },
  warningText: {
    fontSize: 16,
    fontFamily: "Verdana",
    textAlign: "center",
  },
  thirdCardContainer: {
    width: "90%",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 6,
  },
  statsText: {
    padding: 4,
    fontSize: 16,
    backgroundColor: "yellow",
    marginTop: 10,
  },
  imageStyle: {
    height: 200,
    width: 300,
  },
});

export default ScoreScreen;
