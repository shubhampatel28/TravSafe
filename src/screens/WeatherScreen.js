import React, { Component, useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import * as Location from "expo-location";
import AppContext from "../context/app-context";

let url = `https://hsxyjbrb23.execute-api.us-west-2.amazonaws.com/travamplif/weather`;

const WeatherScreen = () => {
  const {
    SET_LATLONG_OBJECT,
    latLongObject,
    destinationName,
  } = React.useContext(AppContext);

  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [latVal, setLatVal] = useState(null);
  const [lonVal, setLonVal] = useState(null);

  const loadForecast = async (dat) => {
    setRefreshing(true);
    const response = await fetch(`${url}?lat=${dat.lat}&lon=${dat.lng}`);
    const data = await response.json();

    if (!response.ok) {
      Alert.alert(`Error retrieving weather data: ${data.message}`);
    } else {
      setForecast(data);
    }

    setRefreshing(false);
  };

  const getGeoCode = async () => {
    if (destinationName === null) {
      Alert.alert(
        `Error retrieving Weather data: Please Enter a Destination Name to search for `
      );
    } else {
      const latLongData = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${destinationName}&key=AIzaSyBJd05HjOxl_jm2TXx3Ifx-kkrd551vxrs`
      );
      const data = await latLongData.json();
      if (!latLongData.ok) {
        Alert.alert(`Error retrieving GeoCode data: ${data.message}`);
      } else {
        loadForecast(data["results"][0]["geometry"]["location"]);
      }
    }
  };

  useEffect(() => {
    getGeoCode();
  }, [destinationName]);

  if (!forecast) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const current = forecast.current.weather[0];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              getGeoCode();
            }}
            refreshing={refreshing}
          />
        }
      >
        <Text style={styles.title}>Current Weather</Text>
        <View style={styles.current}>
          <Image
            style={styles.largeIcon}
            source={{
              uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
            }}
          />
          <Text style={styles.currentTemp}>
            {Math.round(forecast.current.temp)}°C
          </Text>
        </View>

        <Text style={styles.currentDescription}>{current.description}</Text>
        <View>
          <Text style={styles.subtitle}>Hourly Forecast</Text>
          <FlatList
            horizontal
            data={forecast.hourly.slice(0, 24)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(hour) => {
              const weather = hour.item.weather[0];
              var dt = new Date(hour.item.dt * 1000);
              return (
                <View style={styles.hour}>
                  <Text>{dt.toLocaleTimeString().replace(/:\d+ /, " ")}</Text>
                  <Text>{Math.round(hour.item.temp)}°C</Text>
                  <Image
                    style={styles.smallIcon}
                    source={{
                      uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                    }}
                  />
                  <Text>{weather.description}</Text>
                </View>
              );
            }}
          />
        </View>

        <Text style={styles.subtitle}>Next 7 Days</Text>
        {forecast.daily.slice(0, 7).map((d) => {
          //Only want the next 5 days
          const weather = d.weather[0];
          var dt = new Date(d.dt * 1000);
          return (
            <View style={styles.day} key={d.dt}>
              <Text style={styles.dayTemp}>{Math.round(d.temp.max)}°C</Text>
              <Image
                style={styles.smallIcon}
                source={{
                  uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                }}
              />
              <View style={styles.dayDetails}>
                <Text>{dt.toLocaleDateString()}</Text>
                <Text>{weather.description}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 42,
    color: "#0077fb",
  },
  subtitle: {
    fontSize: 24,
    marginVertical: 12,
    marginLeft: 4,
    color: "#0077fb",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  current: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  currentTemp: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  currentDescription: {
    width: "100%",
    textAlign: "center",
    fontWeight: "200",
    fontSize: 24,
    marginBottom: 24,
  },
  hour: {
    padding: 6,
    alignItems: "center",
  },
  day: {
    flexDirection: "row",
  },
  dayDetails: {
    justifyContent: "center",
  },
  dayTemp: {
    marginLeft: 12,
    alignSelf: "center",
    fontSize: 20,
  },
  largeIcon: {
    width: 250,
    height: 200,
  },
  smallIcon: {
    width: 100,
    height: 100,
  },
});

export default WeatherScreen;
