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
      if (!token || !userId) {
        props.navigation.navigate('LoginScreen');
        return;
      }
      props.navigation.navigate('DrawerScreen');

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
