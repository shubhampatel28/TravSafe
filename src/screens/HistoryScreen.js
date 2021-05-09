import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";


import { withAuthenticator } from "aws-amplify-react-native";

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
  const renderItem = ({ item }) => (
    <View>
      <Item title={item.title} score={item.score} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  },
  score: {
    fontSize: 20,
    textAlign: "right",
  }
});

export default withAuthenticator(HistoryScreen,true)
