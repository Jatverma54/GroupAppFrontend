
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import Facebook_login_Icon from '../Pictures/Facebook_Login_Button.png';
import GooglePlus_login_Icon from '../Pictures/Google_Plus.png';
import Email_Icon from '../Pictures/Email.png';
import lock_Icon from '../Pictures/lock.png';
import { useNavigation } from '@react-navigation/native';

export default class CreateaPublicGroupScreen extends Component {

  render() {
    return (
      <PublicScreenLogic/>
        );
  }
}

const PublicScreenLogic=()=>{
  const navigation = useNavigation();
return(
  <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={Email_Icon}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={lock_Icon}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'/>
        </View>
     
        <TouchableOpacity style={styles.restoreButtonContainer}>
            <Text>Forgot?</Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}  onPress={()=>navigation.push('DrawerScreen')}   >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}>
            <Text>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}  onPress={()=>{}}>

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

<Text style={styles.TextStyle}> Login Using Google</Text>

</TouchableOpacity>
      </View>

);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B0E0E6',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:15,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  icon:{
    width:30,
    height:30,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: '#3498db',
  },
  fabookButton: {
    backgroundColor: "#3b5998",
  },
  googleButton: {
    backgroundColor: "#ff0000",
  },
  loginText: {
    color: 'white',
  },
  restoreButtonContainer:{
    width:250,
    marginBottom:15,
    alignItems: 'flex-end'
  },
  socialButtonContent:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  socialIcon:{
    color: "#FFFFFF",
    marginRight:5
  },
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
 