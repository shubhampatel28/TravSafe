import * as React from "react";
import { Text, View, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomTabNavigator from "./src/navigation/TabNavigator";
import Header from "./src/components/Header";
import GooglePlacesAutoCompleteComponent from "./src/components/GooglePlacesAutoCompleteComponent";
import AppState from "./src/context/AppState";

import Amplify from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure(config);

import { withAuthenticator } from "aws-amplify-react-native";
const { width, height } = Dimensions.get("window");

function App() {
  return (
    <AppState>
      <SafeAreaView style={styles.container}>
        <Header />
        <GooglePlacesAutoCompleteComponent />
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </AppState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  search: {
    alignSelf: "center",
    width: width * 0.8,
    marginBottom: 5,
  },
});

// export default withAuthenticator(App,true)

export default () => {
  return (
    <AppState>
      <App />
    </AppState>
  );
};
