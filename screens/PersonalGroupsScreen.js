import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, Text, View, ImageBackground, Image, Button } from 'react-native';
import colours from '../constants/colors';
import DisplayAnImageWithStyle from '../components/DisplayAnImageWithStyle';
import colors from '../constants/colors';
import OverideBackButton from '../components/OverideBackButton'
import Floating_Button from '../Pictures/Floating_Button.png';
import { FloatingAction } from "react-native-floating-action";

 const actions = [
   
    {
      text: "Create a Personal Group",
      icon: {Floating_Button},
      name: "bt_CreateaPersonalGroup",
      position: 4
    }
  ];

 

const PersonalGroupsScreen = ({navigation}) => {
  
    return(
     
      <View style={styles.container}>
  
  <FloatingAction
    actions={actions}
    onPressItem={name => {
      console.log(`selected button: ${name}`);
      

    }}
  />
</View>

      );
   };

   const styles = StyleSheet.create({
  
      ButtonContainer: {   
         flexDirection:'row', 
         width: '100%',
         justifyContent: 'flex-start',
         alignItems: 'baseline',
          
      },
      button: {
          
         width: 300,
           marginVertical: 60,
           fontWeight: "bold",
          
      },
      container:{
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor : '#F5F5F5'
      },
      
   });
   

export default PersonalGroupsScreen;