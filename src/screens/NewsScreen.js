import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityMonitor,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Newscard from "../components/Newscard";
import newsAPI from "../APIs/Newsapi";
import { Tab, Button } from "react-native-elements";
import { useLinkTo } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../context/app-context";

const { width, height } = Dimensions.get("window");

const NewsScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [crimeNews, setCrimeNews] = useState([]);
  const linkTo = useLinkTo();
  const routeNavigation = useNavigation();
  const [covidNewsDisplay, setCovidNewsDisplay] = useState(false);
  const [crimeNewsDisplay, setCrimeNewsDisplay] = useState(false);
  const { destinationName, stateName, countryName } = React.useContext(
    AppContext
  );

  const [tab1, setTab1] = useState(false);
  const [tab2, setTab2] = useState(false);
  const [tab, setTab] = useState({
    tab1: false,
    tab2: true,
  });
  const handleTab = (swap) => {
    if (swap === "tab1") {
      setTab1(true);
      setTab2(false);
    } else {
      setTab2(true);
      setTab1(false);
    }
  };

  useEffect(() => {
    getCovisNewsFromAPI();
    getCrimeNewsFromAPI();
  }, [destinationName]);

  function getCovisNewsFromAPI() {
    newsAPI
      .get(
        `?newsQuery=${
          countryName !== ""
            ? "(" + countryName + "%20AND%20Covid)"
            : "(Global%20AND%20Covid)"
        }&sortBy=relevance`
      )
      .then(async function (response) {
        // console.log(response);
        setNews(response.data);
      })
      .catch(function (error) {
        alert("Failed to fetch news: ", error);
        console.log(error);
      });
  }

  function getCrimeNewsFromAPI() {
    newsAPI
      .get(
        `?newsQuery=${
          countryName !== ""
            ? "(" + countryName + "%20AND%20(Police))"
            : "(Global%20AND%20Crime)"
        }&pageSize=20`
      )
      .then(async function (response) {
        setCrimeNews(response.data);
      })
      .catch(function (error) {
        alert("Failed to fetch news: ", error);
        console.log(error);
      });
  }

  if (!news) {
    return null;
  }
  const covidButtonPressed = (e) => {
    // e.preventDefault();
    setCovidNewsDisplay(true);
  };
  const crimeButtonPressed = (e) => {
    // e.preventDefault();
    setCovidNewsDisplay(false);
    setCrimeNewsDisplay(true);
  };

  return (
    <View>
      <View style={styles.buttonTabView}>
        <TouchableOpacity
          activeOpacity={0.6}
          underlayColor="#0000ff"
          onPress={() => {
            handleTab("tab1");
            crimeButtonPressed();
          }}
          style={[styles.tabButton, tab1 && styles.tabButtonActive]}
        >
          <Text
            style={[styles.tabButtonTitle, tab1 && styles.tabButtonTitleActive]}
          >
            Crime
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          underlayColor="#0000ff"
          onPress={() => {
            handleTab("tab2");
            covidButtonPressed();
          }}
          style={[styles.tabButton, tab2 && styles.tabButtonActive]}
        >
          <Text
            style={[styles.tabButtonTitle, tab2 && styles.tabButtonTitleActive]}
          >
            Covid
          </Text>
        </TouchableOpacity>
      </View>

      {covidNewsDisplay ? (
        <View>
          <FlatList
            data={news.articles}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              return <Newscard item={item} />;
            }}
          />
        </View>
      ) : crimeNewsDisplay ? (
        <View style={styles.flatList}>
          <FlatList
            data={crimeNews.articles}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              return <Newscard item={item} />;
            }}
          />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  buttonTabView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  tabButtons: {
    alignSelf: "center",
    width: width / 2,
  },
  tabGroup: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent", // "rgba(11, 93, 30, 0.11)",
    marginHorizontal: 20,
    paddingVertical: 6,
    justifyContent: "space-between",
  },
  tabButton: {
    backgroundColor: "transparent",
    borderRadius: 36,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: "#c0f0ff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
  },
  tabButtonTitle: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "center",
    color: "#000",
  },
  tabButtonTitleActive: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "center",
    color: "#000",
  },
  flatList: {
    alignContent: "center",
    marginBottom: 10,
  },
});

export default NewsScreen;
