import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Image, Modal, } from 'react-native';
import colors from '../constants/colors';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateProfileInformation from '../screens/UpdateProfileInformation';
import changePasswordscreen from '../screens/changePassword';


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

    <ProfileScreenStack.Navigator headerMode="screen" screenOptions={{
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
        name='UpdateAccountProfileInformation'
        component={UpdateAccountProfileInformationStackNavigator} />

      <ProfileScreenStack.Screen

        options={{ headerShown: false }}
        name='changePassword'
        component={changePasswordStackNavigator} />


    </ProfileScreenStack.Navigator>

  );

};

const changePassword = createStackNavigator();
const changePasswordStackNavigator = ({ route }) => {

  return (

    <changePassword.Navigator headerMode='screen' screenOptions={{
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





      <changePassword.Screen

        options={{
          headerTitle: 'Change Password',

        }}
        name='changePassword'
        component={changePasswordscreen}
        initialParams={route.params}
      />


    </changePassword.Navigator>

  );

};








const UpdateAccountProfileInformation = createStackNavigator();
const UpdateAccountProfileInformationStackNavigator = ({ route }) => {

  return (

    <UpdateAccountProfileInformation.Navigator headerMode='float' screenOptions={{
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





      <UpdateAccountProfileInformation.Screen

        options={{
          // headerTitle: 'Change Password',
          headerTitle: 'Update Account Information',
        }}
        name='UpdateProfileInformation'
        component={UpdateProfileInformation}
        initialParams={route.params}
      />


    </UpdateAccountProfileInformation.Navigator>

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