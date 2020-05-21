import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

import Email_Icon from '../Pictures/Email.png';
import lock_Icon from '../Pictures/lock.png';

export default class SignupScreen extends Component {

  constructor(props) {
    super(props);
    state = {
      userName: '',
      email   : '',
      password: '',
      confirmPassword: ''
    }
  }

  signUp = async () => {
      alert("****inside sign up");
    const { userName, password, email, confirmPassword } = this.state
    try {
        var data = {
            username: userName,
            password: password,
            email: email
        }
        const response = await fetch("http://localhost:3000/users/", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    let responseJson = await response.json();
    alert(responseJson);
    console.log(responseJson); 
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={Email_Icon}/>
          <TextInput style={styles.inputs}
              placeholder="Username"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(userName) => this.setState({userName})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={Email_Icon}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={lock_Icon}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={lock_Icon}/>
          <TextInput style={styles.inputs}
              placeholder="Confirm Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.signUp}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b5ec',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
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
  signupButton: {
    backgroundColor: "#FF4DFF",
  },
  signUpText: {
    color: 'white',
  }
});
  