import 'react-native-gesture-handler';
import React,{useEffect,useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, TouchableOpacity, View, Image,AsyncStorage,Alert,BackHandler } from 'react-native';
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
import StartupScreen from '../screens/StartupScreen';


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
        name='MainScreenPage'
        component={MainScreenPage}
        options={{ headerShown: false }} />



      <RootMainStack.Screen
        options={{ headerShown: false }}
        name='LoginScreen'
        component={LoginScreen} />


      <RootMainStack.Screen
        options={{ headerTitle: "Password Assistance" }}
        name='ForgotPassword'
        component={ForgotPassword} />

      <RootMainStack.Screen
        options={{ headerShown: false }}
        name='SignupScreen'
        component={SignupScreen} />

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

// const backAction = () => {
//   Alert.alert("See You Later!", "Do you want to exit From App", [
//     {
//       text: "Cancel",
//       onPress: () => null,
//       style: "cancel"
//     },
//     { text: "YES", onPress: () => BackHandler.exitApp() }
//   ]);
//   return true;
// };



const DrawerStack = createDrawerNavigator();
const DrawerScreen = ({ route,navigation }) => {

  

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", backAction);

  //   return () =>
  //     BackHandler.removeEventListener("hardwareBackPress", backAction);
  // }, []);

  // const [userdata, setuserdata] = useState('');

  // useEffect(() => {
  //   const tryLogin = async () => {
     
  //     try {
  //       const userData = await AsyncStorage.getItem('userData');
       
  //       const transformedData = JSON.parse(userData);
  //       const { token, userId } = transformedData;
  //       //const expirationDate = new Date(expiryDate);

        
  //       //  const expirationTime = expirationDate.getTime() - new Date().getTime();



  //       var myHeaders = new Headers();
  //       myHeaders.append("Content-Type", "application/json");
  //       myHeaders.append("Authorization", "Bearer " + token);
  //       var requestOptions = {
  //         method: 'GET',
  //         headers: myHeaders,

  //       };

  //       const response = await fetch("http://192.168.0.102:3000/users/userInformation", requestOptions);


  //       if (response.ok) {
         
  //         const json = await response.json();
  //         setuserdata(json.result)
  //        // navigation.navigate('DrawerScreen', json.result)
  //       } else {

  //         await AsyncStorage.clear();
  //         Alert.alert(

  //           "Something went wrong!!",
  //           "Please Re login",
  //           [
  //             { text: "Ok", onPress: () => navigation.navigate('LoginScreen',json.result) }
  //           ],
  //           { cancelable: false }
  //         );
  //       }
  //       // setuserimageUrl(json.result.profile.profile_pic);
  //       //setuserName(json.result.profile.full_name);

  //     } catch (e) {

  //       await AsyncStorage.clear();
  //       Alert.alert(

  //         "Something went wrong!!",
  //         "Please Re login",
  //         [
  //           { text: "Ok", onPress: () => navigation.navigate('LoginScreen') }
  //         ],
  //         { cancelable: false }
  //       );

  //       //this.setState({ error: 'Reload the Page',  });
  //       console.log("Error ", e)
  //     }


  //     //dispatch(authActions.authenticate(userId, token, expirationTime));
  //   };

  //   tryLogin();
  // }, []);
  
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
        //initialRouteName="Public Groups"
      />}
      initialRouteName="Public Groups"
    >


      <DrawerStack.Screen name="Public Groups" component={PublicGroupStackNavigator} />
      <DrawerStack.Screen name="Public Groups Feed" component={PublicGroupFeedStackNavigator} />
      <DrawerStack.Screen name="Personal Groups" component={PersonalGroupRootStackNavigator} />
      {/* <DrawerStack.Screen name="Professional groups" component={ProfessionalGroupRootStackNavigator}/> */}
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