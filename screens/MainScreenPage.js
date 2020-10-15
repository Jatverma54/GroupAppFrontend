import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, AsyncStorage, Alert } from 'react-native';


import colors from '../constants/colors';
import MainScreenText from '../constants/MainScreenText';

import menu from '../Pictures/Logo.png';


const MainScreenPage = ({ navigation }) => {

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
          //  props.navigation.navigate('LoginScreen');
          return null;
        }
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;
        //const expirationDate = new Date(expiryDate);

        if (!token || !userId) {//expirationDate <= new Date() ||
          // props.navigation.navigate('LoginScreen');
          return null;
        }

        //  const expirationTime = expirationDate.getTime() - new Date().getTime();



        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,

        };

        const response = await fetch("http://192.168.0.102:3000/users/userInformation", requestOptions);

        
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
        // setuserimageUrl(json.result.profile.profile_pic);
        //setuserName(json.result.profile.full_name);

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

        //this.setState({ error: 'Reload the Page',  });
        console.log("Error ", e)
      }


      //dispatch(authActions.authenticate(userId, token, expirationTime));
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

    // <View style={styles.Rootscreen}>
    <ImageBackground source={menu} style={styles.image}>

      <View style={styles.inputContainers}>

        <View>
          <Text style={styles.TextContainer}>{MainScreenText.PrimaryHeaderText}</Text>
        </View>
        <View>
          <Text style={styles.paragraph}>{MainScreenText.SubHeading} </Text>
        </View>
      </View>

      <View style={styles.ButtonContainer}>
        <View style={styles.button}><Button title="Login" color={colors.LoginButtonColor} onPress={({ }) => navigation.navigate('LoginScreen')} /></View>
        <View style={styles.button}><Button title="SignUp" color={colors.SignUpButton} onPress={({ }) => navigation.navigate('SignupScreen')} /></View>

      </View>

    </ImageBackground>
    // </View>

  );

};




const styles = StyleSheet.create({
  Rootscreen: {
    flex: 1,
  },
  image: {
    justifyContent: 'center',
    height: "100%",
    resizeMode: 'cover'
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

  },
  paragraph: {

    margin: -20,
    fontSize: 19,
    textAlign: 'right',

  },
  ButtonContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,

  },
  button: {
    width: 300,
    marginVertical: 10,
    fontWeight: "bold",

  },
});

export default MainScreenPage;