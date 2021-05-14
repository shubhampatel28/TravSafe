import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicon from "react-native-vector-icons/Ionicons";
//import {Icon} from 'react-native-elements';
//import  Icon  from '@material-ui/icons/HomeOutlined';
//import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";
import ScoreScreen from "../screens/ScoreScreen";
import Settings from "../screens/Settings";
import History from "../screens/HistoryScreen";
import NewsScreen from "../screens/NewsScreen";
import WeatherScreen from "../screens/WeatherScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Score") {
            iconName = focused ? "alert-circle" : "alert-circle-outline";
          } else if (route.name === "Extra") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "History") {
            iconName = focused ? "ios-bookmark" : "ios-bookmark-outline";
          } else if (route.name === "News") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (route.name === "Weather") {
            iconName = focused ? "cloudy-night" : "cloudy-night-outline";
          }

          // You can return any component that you like here!
          return <Ionicon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "lightgrey",
        style: {
          backgroundColor: "#383234"
        }
      }}
    >
      <Tab.Screen
        containerStyle={styles.tab}
        name="Score"
        component={ScoreScreen}
      />
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Weather" component={WeatherScreen} />
      <Tab.Screen name="History" component={History} />
      {/* <Tab.Screen name="Extra" component={Settings} /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    fontSize: 10,
  },
});

export default BottomTabNavigator;
