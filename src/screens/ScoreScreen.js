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
        <Card containerStyle={styles.firstCardContainer}>
          <Text style={styles.firstCardText}>Travel With High Caution</Text>
        </Card>

        {/* The Second Score Card */}
        <Card containerStyle={styles.secondCardContainer}>
          <View style={{ width: 300, alignItems: "left" }}>
            <Text style={styles.secondCardTitleText}>Travel Safety Score !</Text>
          </View>
          <Separator />

          <View style={{ width: 300, flexDirection: "row" }}>
            <Card.Image
              containerStyle={{ flex: 1, width: 50 }}
              source={{
                uri:
                  "https://pattitravels.files.wordpress.com/2018/01/safe-travel.jpg",
              }}
            ></Card.Image>
            <Text containerStyle={{ flex: 2, maxWidth: '50% !important', objectFit: 'contain' }}> The Travel Safety Score </Text>
          </View>
        </Card>

        {/* The Third Score Card */}
        <Card containerStyle={styles.secondCardContainer}>
          <View style={{ width: 300, alignItems: "left" }}>
            <Text style={styles.secondCardTitleText}>Covid Safety Score !</Text>
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
        </Card>
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
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 6,
  },
  secondCardTitleText: {
    fontSize: 24,
    width: "100%",
    alignItems: "flex-start",
  },
  thirdCardContainer: {
    width: "90%",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 6,
  },
});

export default ScoreScreen;
