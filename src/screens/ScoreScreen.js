import React from "react";
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

const ScoreScreen = () => {
  return (
    <ScrollView>
      <View style={styles.center}>
        {/* The First Score Card */}
        {/* <Card containerStyle={styles.firstCardContainer}>
          <Text style={styles.firstCardText}>Travel With High Caution</Text>
        </Card> */}

        {/* The Second Score Card */}
        <Card containerStyle={styles.secondCardContainer}>
          <View style={{ width: 300, alignItems: "left" }}>
            <Text style={styles.secondCardTitleText}>Travel Safety Score</Text>
          </View>
          {/* <Separator /> */}
          <View style={{ width: 300, flexDirection: "row", padding: 10 }}>
            <View style={{ width: "100%", textAlign: "center" , alignItems: "center"}}>
                <Text style={styles.scoreText}>4.5/5</Text>
            </View>
          </View>
          <View style={{ width: 300, flexDirection: "row", padding: 10 }}>
            <View style={{ width: "100%", textAlign: "center" , alignItems: "center"}}>
              <Text style={styles.warningText}>Travel to India at the moment is not recommended. Travel with higher caution.</Text>
            </View>
          </View>
        </Card>



        <Card containerStyle={styles.secondCardContainer}>
          <View style={{ width: 300, alignItems: "left" }}>
            <Text style={styles.secondCardTitleText}>Covid-19 Stats</Text>
          </View>
          {/* <Separator /> */}
          <View style={{ width: 130, flexDirection: "row", padding: 0 }}>
            <Card containerStyle={styles.innerCardContainer}>
            <View style={{ width: "100%", textAlign: "center" , alignItems: "center"}}>
              <Text style={styles.warningText}>Total Cases</Text>
              <Text style={styles.statsText}>234,540</Text>
            </View>
            </Card>

            <Card containerStyle={styles.innerCardContainer}>
            <View style={{ width: "100%", textAlign: "center" , alignItems: "center"}}>
              <Text style={styles.warningText}>Active Cases</Text>
              <Text style={styles.statsText}>24,640</Text>
            </View>
            </Card>

          </View>

          <View style={{ width: 130, flexDirection: "row", padding: 0 }}>

          <Card containerStyle={styles.innerCardContainer}>
            <View style={{ width: "100%", textAlign: "center" , alignItems: "center"}}>
              <Text style={styles.warningText}>Total Deaths</Text>
              <Text style={styles.statsText}>4,540</Text>
            </View>
            </Card>

            <Card containerStyle={styles.innerCardContainer}>
            <View style={{ width: "100%", textAlign: "center" , alignItems: "center"}}>
              <Text style={styles.warningText}>Deaths Today</Text>
              <Text style={styles.statsText}>40</Text>
            </View>
            </Card>
          </View>
        </Card>

        {/* The Third Score Card */}
        {/* <Card containerStyle={styles.secondCardContainer}>
          <View style={{ width: 300, alignItems: "left" }}>
            <Text style={styles.secondCardTitleText}>Covid Safety Score</Text>
          </View>
          <Separator />

          <View style={{ width: 300, flexDirection: "row" }}>
            <Card.Image
              containerStyle={{ flex: 1, width: 50 }}
              source={{
                uri:
                  "https://www.cdc.gov/coronavirus/2019-ncov/travelers/images/COVID-19-Global-Travel-Badge_300x250.jpg",
              }}
            ></Card.Image>
            <Text containerStyle={{ flex: 2 }}> The Covid Safety Score </Text>
          </View>
        </Card> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#d1d5de"
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
    borderColor: "white"
  },
  innerCardContainer: {
    width: "90%",
    padding: 3,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    borderColor: "white",
    shadowColor: "grey"
  },
  secondCardTitleText: {
    fontSize: 20,
    width: "100%",
    alignItems: "flex-start",
    textAlign: "center",
    fontFamily: "Verdana",
    padding: 10,
    
  },
  scoreText: {
    fontSize: 24,
    width: 100,
    alignItems: "flex-start",
    textAlign: "center",
    fontFamily: "Verdana",
    padding: 10,
    textAlign: "center",
    backgroundColor: "red"

  },
  warningText: {
    fontSize: 16,
    fontFamily: "Verdana", 
    textAlign: "center"
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
    marginTop: 10
  }
});

export default ScoreScreen;
