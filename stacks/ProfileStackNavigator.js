import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Image, Modal, } from 'react-native';
import colors from '../constants/colors';
import ProfileScreen from '../screens/ProfileScreen';
import ChangePassword from '../screens/ChangePassword';
import BackArrow from '../Pictures/BackArrow.png';

const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image style={styles.ImageIconStyle}
          source={require('../Pictures/menu.png')} />
      </TouchableOpacity>
    </View>
  );
};




const ProfileScreenStack = createStackNavigator();
const ProfileScreenStackNavigator = () => {
  return (

    <ProfileScreenStack.Navigator headerMode='float' screenOptions={{
      headerLeft: ({ }) => <HeaderLeft />, cardStyle: { backgroundColor: colors.cardStyleBackgroundColor },
      cardOverlayEnabled: true,
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 0.9, 1],
            outputRange: [0, 0.25, 0.7, 1],
          }),
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
            extrapolate: 'clamp',
          }),
        },
      }),
      headerTintColor: colors.StackheaderTintColor,
      headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor },
    }}>


      <ProfileScreenStack.Screen

        options={{
          headerTitle: 'Profile'
        }}
        name='ProfileScreen'
        component={ProfileScreen} />


      <ProfileScreenStack.Screen

        options={{ headerShown: false }}
        name='ChangePassword'
        component={ChangePasswordStackNavigator} />


    </ProfileScreenStack.Navigator>

  );

};



const ChangePasswordStack = createStackNavigator();
const ChangePasswordStackNavigator = () => {
  return (

    <ChangePasswordStack.Navigator headerMode='float' screenOptions={{
      headerLeft: ({ }) => <HeaderLeftFeed />, cardStyle: { backgroundColor: colors.cardStyleBackgroundColor },
      cardOverlayEnabled: true,
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 0.9, 1],
            outputRange: [0, 0.25, 0.7, 1],
          }),
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
            extrapolate: 'clamp',
          }),
        },
      }),
      headerTintColor: colors.StackheaderTintColor,
      headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor },
    }}>





      <ChangePasswordStack.Screen

        options={{
          headerTitle: 'Change Password',
        }}
        name='ChangePassword'
        component={ChangePassword} />


    </ChangePasswordStack.Navigator>

  );

};
const HeaderLeftFeed = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.ImageHeader}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
        <Image style={styles.ImageIconStyle}
          source={BackArrow} />

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  DrawerText: {

    backgroundColor: colors.rootscreenColor,
  }
  , ImageIconStyle: {

    padding: 10,
    margin: 5,
    height: 30,
    width: 50,
    resizeMode: 'stretch',
  },

  ImageIconStyle: {

    padding: 10,
    margin: 5,
    height: 30,
    width: 50,
    resizeMode: 'stretch',

  },
  ImageHeader: {
    padding: 5,
    marginLeft: 7,
    justifyContent: 'flex-end'
  },



});


export default ProfileScreenStackNavigator;