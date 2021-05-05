import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Stylesheet,
  ActivityMonitor,
  FlatList,
} from "react-native";
import Newscard from "../components/Newscard";
import newsAPI from "../APIs/Newsapi";

const NewsScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNewsFromAPI();
  }, []);

  function getNewsFromAPI() {
    newsAPI
      .get("everything?q=bitcoin&apiKey=b875c051fb364f538cf93b357340d105")
      .then(async function (response) {
        setNews(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (!news) {
    return null;
  }

  return (
    <View>
      <FlatList
        data={news.articles}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item }) => {
          return <Newscard item={item} />;
        }}
      />
    </View>
  );
};

export default NewsScreen;
