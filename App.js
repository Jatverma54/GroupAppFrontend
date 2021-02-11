import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React, { useEffect } from 'react';
import { StyleSheet, View, LogBox } from 'react-native';
import colors from './constants/colors';
import RootMainStackNavigator from './stacks/RootStackNavigator';
import { NavigationContainer, DrawerActions, Header } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
// import {
//   AdMobRewarded,
//   setTestDeviceIDAsync,
// } from 'expo-ads-admob';
 //setTestDeviceIDAsync('EMULATOR')
// AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917')//REWARDED_ID
enableScreens();

LogBox.ignoreAllLogs()

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,

    };
  },
});


export default function App() {
  // _openRewarded = async () => {
  //   try {

  //     await AdMobRewarded.requestAdAsync({ servePersonalizedAds: true })
  //     await AdMobRewarded.showAdAsync()
  //   } catch (error) {

  //   }
  // }
  getPermissionAsync = async () => {
    const { status } = Permissions.getAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
try{
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }catch(e){}
    }
  };

  getCameraPermissionAsync = async () => {
    const { status } = Permissions.getAsync(Permissions.CAMERA)
    if (status !== 'granted') {
      try{
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    }catch(e){}
  }
  };

  useEffect(() => {

    // const time = setTimeout(() => {
    //   this._openRewarded();
    // }, 10000);
   const permissions= getPermissionAsync();
   const Camerapermissions= getCameraPermissionAsync();
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    //  clearTimeout(time)
    };
  }, []);


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