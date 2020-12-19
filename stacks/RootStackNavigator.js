import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, TouchableOpacity, View, Image, AsyncStorage, Alert, BackHandler } from 'react-native';
import MainScreenPage from '../screens/MainScreenPage';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import colors from '../constants/colors';
import PersonalGroupRootStackNavigator from '../stacks/PersonalGroupRootStackNavigator';
import PublicGroupStackNavigator from '../stacks/PublicGroupStackNavigator';
import PublicGroupFeedStackNavigator from '../stacks/PublicGroupFeedStackNavigator';
import DrawerContent from '../screens/DrawerContent';
import ProfileScreenStackNavigator from '../stacks/ProfileStackNavigator';
import StoryScreen from '../screens/StoryScreen';
import GroupAppFeatures from '../screens/GroupAppFeatures';
import ForgotPassword from '../screens/ForgotPassword';
import ConfirmYourIdentity from '../screens/ConfirmYourIdentity';
import StartupScreen from '../screens/StartupScreen';
import ChangePasswordFromForgetPassword from '../screens/ChangePasswordFromForgetPassword';
import TermsAndCondition from '../screens/TermsAndCondition';


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




const RootMainStack = createStackNavigator();
const RootMainStackNavigator = () => {


  return (

    <RootMainStack.Navigator>

      <RootMainStack.Screen
        options={{ headerShown: false }}
        name='MainScreenPage'
        component={MainScreenPage}
      />



      <RootMainStack.Screen
        options={{ headerShown: false }}
        name='LoginScreen'
        component={LoginScreen} />


      <RootMainStack.Screen
        options={{
          headerTitle: "Password Assistance",
          headerTintColor: colors.StackheaderTintColor,
          headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor, height: 80 },

        }}
        name='ForgotPassword'
        component={ForgotPassword} />

      <RootMainStack.Screen
        options={{
          headerTitle: "Confirm your identity",
          headerTintColor: colors.StackheaderTintColor,
          headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor, height: 80 },

        }}
        name='ConfirmYourIdentity'
        component={ConfirmYourIdentity} />

      <RootMainStack.Screen
        options={{
          headerTitle: "Change Password",
          headerTintColor: colors.StackheaderTintColor,
          headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor, height: 80 },

        }}
        name='ChangePasswordFromForgetPassword'
        component={ChangePasswordFromForgetPassword} />

      <RootMainStack.Screen
        options={{ headerShown: false }}
        name='SignupScreen'
        component={SignupScreen} />

      <RootMainStack.Screen
        options={{
          headerTitle: "Terms And Conditions",

          headerTintColor: colors.StackheaderTintColor,
          headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor, height: 80 },


        }}
        name='TermsAndCondition'
        component={TermsAndCondition} />

      <RootMainStack.Screen
        options={{
          headerTitle: "Welcome to the Group APP",

          headerTintColor: colors.StackheaderTintColor,
          headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor, height: 80 },


        }}
        name='StoryScreen'
        component={StoryScreen} />


      <RootMainStack.Screen
        options={{
          headerTitle: "Group APP Features",

          headerTintColor: colors.StackheaderTintColor,
          headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor, height: 80 },


        }}
        name='GroupAppFeatures'
        component={GroupAppFeatures} />


      <RootMainStack.Screen

        options={{ headerShown: false }}
        name='DrawerScreen'
        component={DrawerScreen} />

    </RootMainStack.Navigator>

  );

};


const DrawerStack = createDrawerNavigator();
const DrawerScreen = ({ route, navigation }) => {

  return (


    <DrawerStack.Navigator


      drawerContent={() => <DrawerContent Userdata={route.params} drawerContentOptions={{
        activeTintColor: colors.drawerHiglightcolor, marginTop: 20,
        labelStyle: {
          color: colors.drawerTextcolor, fontWeight: colors.drawerfontWeight, width: colors.drawerwidth, fontSize: colors.drawerfontSize,
        }
      }}
        drawerStyle={{
          backgroundColor: colors.drawerBackgroundcolor,
          width: 400,

          fontFamily: 'SomeFont',
        }}

      />}
      initialRouteName="Public Groups"
    >


      <DrawerStack.Screen name="Public Groups" component={PublicGroupStackNavigator} />
      <DrawerStack.Screen name="Public Groups Feed" component={PublicGroupFeedStackNavigator} />
      <DrawerStack.Screen name="Personal Groups" component={PersonalGroupRootStackNavigator} />
      <DrawerStack.Screen name="Profile" component={ProfileScreenStackNavigator} />

    </DrawerStack.Navigator>

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
  }
});


export default RootMainStackNavigator;