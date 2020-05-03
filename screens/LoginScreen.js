import 'react-native-gesture-handler';
import React, { Component } from 'react';
 
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Facebook_login_Icon from '../Pictures/Facebook_Login_Button.png';
import GooglePlus_login_Icon from '../Pictures/Google_Plus.png';



const LoginScreen=({navigation})=>{

return(

    <View style={styles.MainContainer}>

    <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}  onPress={()=>navigation.push('DrawerScreen')}>

       <Image 
        source={Facebook_login_Icon} 
        style={styles.ImageIconStyle} 
        />

       <View style={styles.SeparatorLine} />

       <Text style={styles.TextStyle}> Login Using Facebook </Text>

     </TouchableOpacity>
     
    
     <TouchableOpacity style={styles.GooglePlusStyle} activeOpacity={0.5} onPress={()=>navigation.push('DrawerScreen')}>

       <Image 
        source={GooglePlus_login_Icon} 
        style={styles.ImageIconStyle} 
        />

       <View style={styles.SeparatorLine} />

       <Text style={styles.TextStyle}> Login Using Google Plus </Text>

     </TouchableOpacity>

   </View>


);

};



const styles = StyleSheet.create({
 
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
    },
    
    GooglePlusStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#dc4e41',
      borderWidth: .5,
      borderColor: '#fff',
      height: 40,
      borderRadius: 5 ,
      margin: 5,
    
   },
    
   FacebookStyle: {
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: '#485a96',
     borderWidth: .5,
     borderColor: '#fff',
     height: 40,
     borderRadius: 5 ,
     margin: 5,
    
   },
    
   ImageIconStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode : 'stretch',
    
   },
    
   TextStyle :{
    
     color: "#fff",
     marginBottom : 4,
     marginRight :20,
     
   },
    
   SeparatorLine :{
    
   backgroundColor : '#fff',
   width: 1,
   height: 40
    
   }
    
   });


   export default LoginScreen;