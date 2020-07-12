import 'react-native-gesture-handler';
import React, {   Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
 Image,  
} from 'react-native';
import lock_Icon from '../Pictures/lock.png';

export default class ChangePassword extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    
     
     Password:"",
     ConfirmPassword:""

    }
  }


  render() {
    

    return (
        
          <View style={styles.container}>

       
         
        <View style={styles.inputContainer}>
        
          <Image style={[styles.icon, styles.inputIcon]} source={lock_Icon}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
           
            //  value={this.state.Email}             
            
              onChangeText={(Password) => this.setState({Password})}
              //keyboardType="email-address"
              underlineColorAndroid='transparent'
              />
             
        </View>

        <View style={styles.inputContainer}>
        
        <Image style={[styles.icon, styles.inputIcon]} source={lock_Icon}/>
        <TextInput style={styles.inputs}
              placeholder="Confirm Password"
            
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(ConfirmPassword) => this.setState({ConfirmPassword})}/>
           
      </View>
 
     
      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>Change Password</Text>
        </TouchableOpacity>

      

       


        </View>
      
    );
  }
}





const styles = StyleSheet.create({
  
  container: {
   flex:2,
    backgroundColor: '#B0E0E6',
   justifyContent: 'center',
    alignItems: 'center',
  
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:300,
      height:45,
      marginBottom:19,
      flexDirection: 'row',

      //alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
      fontSize:16
  },
  icon:{
    width:30,
    height:30,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center',
    marginTop:10
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
  
  Imagecontainer:{
    
   // flex:2,
   
  // height: 20,
    //alignItems: 'center', 
    
      resizeMode: 'contain',
      height: 200,
      width: 200,
      marginTop:-80,
      marginBottom:20
  },

  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  //  paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom:20
  },


  listContainer: {
    flex: 1,
    padding: 25,
    
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
    fontWeight:"bold"
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },
  listIcon: {
    fontSize: 26,
    color: "#666",
    width: 60
  },
  listLabel: {
    fontSize: 16
  },
});
 