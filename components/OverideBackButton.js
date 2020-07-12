import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";

const OverideBackButton=()=> {
 
  const backAction = () => {
    Alert.alert("See You Later!", "Do you want to exit From App", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  return(null);
 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default OverideBackButton;
