import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator  } from '@react-navigation/stack';
import colors from '../constants/colors';
import PersonalGroupsScreen from '../screens/PersonalGroupsScreen';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet,TouchableOpacity, Text,Left,StatusBar ,View, ImageBackground, Image, Button } from 'react-native';
import {NavigationContainer,DrawerActions} from '@react-navigation/native';
import JoinedPublicGroupsScreen from '../screens/JoinedPublicGroupsScreen';

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


  const JoinedPublicGroupStack = createStackNavigator();
  const JoinedPublicGroupStackNavigator =()=>{
    
    return (
  
    
        <JoinedPublicGroupStack.Navigator>
         

        <JoinedPublicGroupStack.Screen 
         options={{headerShown:false}} 
            name='JoinedPublicGroupsScreen' 
            component={JoinedPublicGroupsScreen}   />


         
        </JoinedPublicGroupStack.Navigator>
    
    
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
  
  export default JoinedPublicGroupStackNavigator;