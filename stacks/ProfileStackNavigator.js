import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator  } from '@react-navigation/stack';
import {DrawerActions,useNavigation} from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet,TouchableOpacity,  View, Image, Modal,  } from 'react-native';
import MainScreenPage from '../screens/MainScreenPage';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import colors from '../constants/colors';
import PersonalGroupRootStackNavigator from '../stacks/PersonalGroupRootStackNavigator';
import PublicGroupStackNavigator from '../stacks/PublicGroupStackNavigator';
import NotificatioStackNavigator from '../stacks/NotificatioStackNavigator';
import PublicGroupFeedStackNavigator from '../stacks/PublicGroupFeedStackNavigator';
import ProfessionalGroupRootStackNavigator from '../stacks/ProfessionalGroupRootStackNavigator';
import DrawerContent from '../screens/DrawerContent';
import ProfileScreen from '../screens/ProfileScreen';

const HeaderLeft = () => {
    const navigation = useNavigation();
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image   style={styles.ImageIconStyle} 
         source={require('../Pictures/menu.png')}/>
         </TouchableOpacity>
      </View>
    );
  };
  
  
  
  
  const ProfileScreenStack = createStackNavigator();
  const ProfileScreenStackNavigator=()=>{
  return( 
  
  <ProfileScreenStack.Navigator    headerMode='float' screenOptions={{ headerLeft: ({}) => <HeaderLeft/>,  cardStyle: { backgroundColor: colors.cardStyleBackgroundColor},
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
    headerTitle: 'Profile' }} 
        name='ProfileScreen' 
        component={ProfileScreen}/>
  
  </ProfileScreenStack.Navigator>
  
  );
  
  };


  const styles = StyleSheet.create({

    DrawerText: {
    
      backgroundColor: colors.rootscreenColor,
    }
  ,ImageIconStyle:{
    
    padding: 10,
    margin: 5,
    height: 30,
    width: 50,
    resizeMode : 'stretch',
  }
  });  


  export default ProfileScreenStackNavigator;