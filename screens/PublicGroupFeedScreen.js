import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Button } from 'react-native';
import colors from '../constants/colors';
import OverideBackButton from '../components/OverideBackButton'


const PublicGroupFeedScreen = ({navigation}) => {
    return(
        <View style={styles.ButtonContainer}>
     {/* <OverideBackButton/> */}
      {/* <Button style={styles.button} color={colors.LoginButtonColor} title="Menu " onPress={()=>navigation.toggleDrawer()}/> */}

      <Text>Public Groups Feed Screen</Text>
      
      </View> 
      );
   };
   const styles = StyleSheet.create({
     
      ButtonContainer: {   
         flexDirection:'column', 
         width: '100%',
         justifyContent: 'flex-start',
         alignItems: 'stretch',
          
      },
      button: {
          
         width: 300,
           marginVertical: 10,
           fontWeight: "bold",
          
      },
   });

export default PublicGroupFeedScreen;