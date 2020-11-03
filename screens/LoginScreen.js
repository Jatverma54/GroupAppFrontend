import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from 'react-native';
// import Facebook_login_Icon from '../Pictures/Facebook_Login_Button.png';
// import GooglePlus_login_Icon from '../Pictures/Google_Plus.png';
import jwt_decode from "jwt-decode";
import Email_Icon from '../Pictures/Email.png';
import lock_Icon from '../Pictures/lock.png';
import APIPasswordCollection from '../constants/APIPasswordCollection';
import { encode } from "base-64";
import UserToken from '../constants/APIPasswordCollection';
import Loader from '../components/Loader';
import { MaterialCommunityIcons, } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import APIBaseUrl from '../constants/APIBaseUrl';
export default class LoginScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      Password: '',
      loading: false,
      hidePassword: true
    };
  }

  login = async () => {
    Keyboard.dismiss();

    const { userName, password } = this.state

    if (userName && password) {
      this.setState({ loading: true,data:'' });
      try {

        var LoginInfo = {
          "username": userName,
          "password": password,
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //myHeaders.append("Authorization", 'Basic ' + encode(userName + ":" + password));


        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(LoginInfo)

        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/users/login`, requestOptions


        );


        if (response.ok) {
          this.setState({ loading: false });
          let responseJson = await response.json();
          UserToken.userToken = responseJson.token;
          const payload = jwt_decode(responseJson.token);

          this.saveDataToStorage(responseJson.token, payload._id)//changedLogin

          Alert.alert(

            "Welcome to the Group App " + responseJson.user.profile.full_name,
            "Login Successful",
            [
              { text: "Ok", onPress: () => this.props.navigation.navigate('DrawerScreen',responseJson.user) }
            ],
            { cancelable: false }
          );
         

        }
        else {

          this.setState({ loading: false });
          Alert.alert(

            "Login Failed",
            "Please verify your email or check your Username and Password",
            [
              { text: "Ok", onPress: () => null }
            ],
            { cancelable: false }
          );

          //  console.log(responseJson);
        }

      } catch (err) {
        this.setState({ loading: false });
        console.log('error signing up: ', err)
        Alert.alert(

          "Something went wrong!!",
          "Please try again",
          [
            { text: "Ok", onPress: () => null }
          ],
          { cancelable: false }
        );
      }
    } else {

      if (!userName) {
        alert("Please enter an Username");
      }
      else if (!password) {
        alert("Please enter Password");
      }

    }

  }
  setPasswordVisibility(){
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  
  saveDataToStorage = (token, userId) => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        userId: userId,

      })
    );
  };


  render() {
 
    const { userName, password } = this.state
    return (

      <View style={styles.container}>
        <Loader isLoading={this.state.loading} />
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={Email_Icon} />
          <TextInput style={styles.inputs}
            placeholder="Username"
            value={userName}
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(userName) => this.setState({ userName })}
          />

        </View>

        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={lock_Icon} />
          <TextInput style={styles.inputs}
            placeholder="Password"
            value={password}
            secureTextEntry={this.state.hidePassword}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({ password })}
          />
            <TouchableOpacity activeOpacity={0.8} style={styles.touachableButton} onPress={()=>this.setPasswordVisibility()}>
           {(this.state.hidePassword)?
            <MaterialCommunityIcons name="eye" size={25} style={styles.buttonImage} />:
<MaterialCommunityIcons name="eye-off" size={25} style={styles.buttonImage} />}
           
         
         
          </TouchableOpacity>
        </View>
      



        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.login()}   >
          <Text style={styles.loginText} >Login</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.restoreButtonContainer} onPress={() => this.props.navigation.push('ForgotPassword')}   >
          <Text style={{ fontWeight: 'bold', width: "100%", marginLeft: 100 }}>Forgot your Password?Get help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSignupContainer} onPress={() => this.props.navigation.push('SignupScreen')}   >
          <Text style={{ fontWeight: 'bold', width: "100%", marginLeft: 100 }}>Don't have an account?signup </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}  onPress={()=>{}}>

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

</TouchableOpacity> */}
      </View>

    );
  }
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
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    marginRight:16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    alignSelf: 'center'
  },

  buttonSignupContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    alignSelf: 'center',
    marginLeft: 10,
    marginLeft: -50
  },
  loginButton: {
    backgroundColor: '#3498db',
    marginTop: 30
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
  restoreButtonContainer: {
    width: 250,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    marginLeft: -50
  },
  socialButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    color: "#FFFFFF",
    marginRight: 5
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
    borderRadius: 5,
    margin: 5,

  },

  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: .5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    margin: 5,

  },

  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',

  },

  TextStyle: {

    color: "#fff",
    marginBottom: 4,
    marginRight: 20,

  },

  SeparatorLine: {

    backgroundColor: '#fff',
    width: 1,
    height: 40

  },
  touachableButton: {
    //position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 2,
    marginTop:10
  },
  buttonImage: {
  //  resizeMode: 'contain',
    height: '100%',
    width: '100%',
  
  }

});
