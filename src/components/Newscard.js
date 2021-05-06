//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card, ListItem, Icon } from "react-native-elements";
import Separator from "./Separator";
import moment from "moment";
import Moment from "react-moment";

const { width, height } = Dimensions.get("window");

const Newscard = ({ item }) => {
  return (
    <View style={styles.cardView}>
      <View style={styles.newsHeaderContainer}>
        <Text style={styles.title}> {item.title} </Text>
        <Text style={styles.author}>{item.author} </Text>
      </View>
      <Separator />
      <View style={styles.imgdataContainer}>
        <Image
          style={styles.image}
          source={item.urlToImage ? { uri: item.urlToImage } : null}
        />
        <ScrollView style={styles.scrollView}>
          <Text style={styles.description}>{item.description}</Text>
        </ScrollView>
      </View>
      <Separator />
      <View style={styles.dateAndButtonContainer}>
        <Text style={styles.date}>
          {moment(item.publishedAt).format("MMMM Do YYYY")}
        </Text>
        <TouchableOpacity title="View More" style={styles.viewButton}>
          <Text> View More </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: "white",
    margin: width * 0.05,
    borderRadius: width * 0.05,
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 2,
    shadowRadius: 5,
  },
  newsHeaderContainer: {
    flexDirection: "column",
  },
  title: {
    marginHorizontal: width * 0.03,
    marginTop: width * 0.02,
    marginBottom: width * 0,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: "gray",
    fontSize: 18,
  },
  image: {
    flex: 1,
    height: height / 5.5,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    marginVertical: height * 0.001,
  },
  author: {
    marginHorizontal: width * 0.05,
    fontSize: 15,
    color: "gray",
    alignSelf: "flex-end",
  },
  imgdataContainer: {
    flexDirection: "row",
  },
  scrollView: {
    flex: 2,
    height: height / 6,
    marginLeft: width * 0.01,
    marginRight: width * 0.05,
    marginVertical: height * 0.001,
  },
  dateAndButtonContainer: {
    flexDirection: "row",
    height: 20,
  },
  date: {
    flex: 3.1,
    alignSelf: "flex-start",
    marginLeft: width * 0.05,
  },
  viewButton: {
    flex: 1,
    alignSelf: "flex-end",
    height: 20,
    alignItems: "center",
    marginBottom: height * 0.004,
    marginRight: width * 0.05,
    backgroundColor: "lightgrey",
    borderRadius: 8,
    justifyContent: "center",
  },
});

export default Newscard;
