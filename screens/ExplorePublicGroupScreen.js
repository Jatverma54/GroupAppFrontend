import React from 'react';
import { StyleSheet, Text, View,  Image, Button } from 'react-native';
import colors from '../constants/colors';
import OverideBackButton from '../components/OverideBackButton';
import { FloatingAction } from "react-native-floating-action";
import actions from '../components/FloatingActionsButton';



const ExplorePublicGroupScreen = ({navigation}) => {
  
   return(

<View style={styles.container}>
    <OverideBackButton/> 
  <FloatingAction
    actions={actions}
    onPressItem={name => {
  navigation.push('Create a Public Group');

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


export default ExplorePublicGroupScreen;

