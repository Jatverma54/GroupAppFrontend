import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, AsyncStorage, Alert, Dimensions } from 'react-native';
import APIBaseUrl from '../constants/APIBaseUrl';
import colors from '../constants/colors';
import MainScreenText from '../constants/MainScreenText';

import menu from '../Pictures/circle-312343.png';

const { width } = Dimensions.get('window');

const MainScreenPage = ({ navigation }) => {

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {

          return null;
        }
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        if (!token || !userId) {
          return null;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,

        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/users/userInformation`, requestOptions);


        if (response.ok) {
          const json = await response.json();
          saveDataToStorage(token, userId)
          navigation.navigate('DrawerScreen', json.result)


        } else {

          await AsyncStorage.clear();
          Alert.alert(

            "Something went wrong!!",
            "Please Re login",
            [
              { text: "Ok", onPress: () => navigation.navigate('LoginScreen') }
            ],
            { cancelable: false }
          );
        }

      } catch (e) {
        await AsyncStorage.clear();
        Alert.alert(

          "Something went wrong!!",
          "Please Re login",
          [
            { text: "Ok", onPress: () => navigation.navigate('LoginScreen') }
          ],
          { cancelable: false }
        );

      }
    };

    tryLogin();
  }, []);

  const saveDataToStorage = (token, userId) => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        userId: userId,

      })
    );
  };


  return (

    <View style={styles.Rootscreen}>
      <View style={styles.inputContainers}>

        <View>
          <Text style={styles.TextContainer}>{MainScreenText.PrimaryHeaderText}</Text>
        </View>
        <View>
          <Text style={styles.paragraph}>{MainScreenText.SubHeading} </Text>
        </View>
        <Image source={menu} style={styles.image} />
      </View>





      <View style={styles.ButtonContainer}>
        <View style={styles.button}><Button title="Login" color={colors.LoginButtonColor} onPress={({ }) => navigation.navigate('LoginScreen')} /></View>
        <View style={styles.button}><Button title="SignUp" color={colors.SignUpButton} onPress={({ }) => navigation.navigate('SignupScreen')} /></View>

      </View>
    </View>

  );

};




const styles = StyleSheet.create({
  Rootscreen: {
    flex: 1,
    backgroundColor: "white"
  },
  image: {
    height: "90%",
    width: "100%",
    resizeMode: 'contain',
    marginTop: 50,
    marginLeft: width / 150,

  },
  container: {
    paddingTop: 50,
  },
  inputContainers: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingTop: 80,
    padding: 30,
  },
  TextContainer: {
    margin: 24,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    width: "100%"
  },
  paragraph: {

    margin: -20,
    fontSize: 14,
    textAlign: 'right',

  },
  ButtonContainer: {
    flex: 2,
    width: '100%',
    justifyContent: "flex-end",
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 20
  },
  button: {
    width: 300,
    marginVertical: 10,
    fontWeight: "bold",

  },
});

export default MainScreenPage;