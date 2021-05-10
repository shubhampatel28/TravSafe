import React , { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AppContext from "../context/app-context";
import { withAuthenticator } from "aws-amplify-react-native";

import { Auth } from 'aws-amplify';
import axios from 'axios';

const DATA = [
  {
    id: 0,
    title: "Country Name 1",
    score: "3.4",
  },
  {
    id: 1,
    title: "Country Name 2",
    score: "3.4",
  },
  {
    id: 2,
    title: "Country Name 3",
    score: "3.4",
  },
  {
    id: 3,
    title: "Country Name 4",
    score: "3.4",
  },
  {
    id: 4,
    title: "Country Name 5",
    score: "3.4",
  },
];

const Item = ({ title, score }) => (
  <View style={styles.item}>
    <Text style={styles.title}> {title}  <Text style={styles.score}> {score} </Text>
</Text>
  </View>
);

const HistoryScreen = () => {
  const { user, SET_USER_NAME, destinationName } = React.useContext(
    AppContext
  );

  const [userScores] = useState([]);

  const getUserScores = () => {
    const queryurl = "https://1pa8hubn2h.execute-api.us-west-2.amazonaws.com/travamplif/userdata?username=" + user;
    axios
      .get(queryurl)
      .then(function (response) {
        // console.log("-----------------------", response.data.data.Items)
        const arr = response.data.data.Items;
        userScores.length = 0;
        arr.map((value) => {
          userScores.push(value)
        })
      })
      .catch(function (error) {
        console.log(error.message);
      })
  }

  getUserScores()

  useEffect(() => {
    if (user === null) {
      Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
          SET_USER_NAME(user.attributes.email)
        })
        .catch(err => console.log(err));
    } else {
      getUserScores()
    }
  }, [user]);

  useEffect(() => {
    getUserScores()
  }, [destinationName]);

  const renderItem = ({ item }) => (
    <View>
      <Item title={item.location} score={item.score} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userScores}
        renderItem={renderItem}
        keyExtractor={(item) => item.searchid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#DCDCDC",
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    alignSelf: "flex-start"
  },
  score: {
    fontSize: 20,
    alignSelf: "flex-end",
    backgroundColor: "orange"
  }
});

export default withAuthenticator(HistoryScreen, true)
