import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React, { useEffect } from 'react';
import { StyleSheet, View, LogBox } from 'react-native';
import colors from './constants/colors';
import RootMainStackNavigator from './stacks/RootStackNavigator';
import { NavigationContainer, DrawerActions, Header } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import UserToken from './constants/APIPasswordCollection'
import * as Notifications from 'expo-notifications';
import {
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
setTestDeviceIDAsync('EMULATOR')
AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917')//REWARDED_ID
enableScreens();
//console.disableYellowBox = true;
//LogBox.ignoreAllLogs()


Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,

    };
  },
});


export default function App() {
  _openRewarded = async () => {
    try {
     
      await AdMobRewarded.requestAdAsync({ servePersonalizedAds: true})
      await AdMobRewarded.showAdAsync()
    } catch (error) {
      console.log(error)
    } 
  }

  // useEffect(() => {
  //   const tryLogin = async () => {
  //     const userData = await AsyncStorage.getItem('userData');
  //     if (!userData) {
  //     //  props.navigation.navigate('LoginScreen');
  //       return null;
  //     }
  //     const transformedData = JSON.parse(userData);
  //     const { token, userId } = transformedData;
  //     //const expirationDate = new Date(expiryDate);

  //     if ( !token || !userId) {//expirationDate <= new Date() ||
  //      // props.navigation.navigate('LoginScreen');
  //       return null;
  //     }

  //   //  const expirationTime = expirationDate.getTime() - new Date().getTime();
  //   UserToken.userToken =token;
  //   UserToken.UserId = userId;    
  //     //dispatch(authActions.authenticate(userId, token, expirationTime));
  //   };

  //   tryLogin();
  // }, []);
  useEffect(() => {

     const time=   setTimeout(() => {
          this._openRewarded();
        }, 10000);

    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(

      (response) => {
        // console.log(response);

      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
      clearTimeout(time)
    };
  }, []);

  //Notifications.getExpoPushTokenAsync();
  return (
    <NavigationContainer>
      <View style={styles.Rootscreen}>
        <StatusBar
          barStyle={colors.StatusBarStyle}
          hidden={false}
          backgroundColor={colors.StatusbackgroundColor}
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <PaperProvider>
          <RootMainStackNavigator />
        </PaperProvider>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  Rootscreen: {
    flex: 1,
    backgroundColor: colors.rootscreenColor,
  }

});

