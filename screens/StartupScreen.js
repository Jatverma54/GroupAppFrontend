import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';



const StartupScreen = props => {
  

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('LoginScreen');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;
      //const expirationDate = new Date(expiryDate);

      if ( !token || !userId) {//expirationDate <= new Date() ||
        props.navigation.navigate('LoginScreen');
        return;
      }

    //  const expirationTime = expirationDate.getTime() - new Date().getTime();

      props.navigation.navigate('DrawerScreen');
      //dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, []);

  return null
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
