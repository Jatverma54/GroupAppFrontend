import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  AsyncStorage,
  Alert,
} from 'react-native';
import lock_Icon from '../Pictures/lock.png';
import Loader from '../components/Loader';
import { MaterialCommunityIcons, } from '@expo/vector-icons';
export default class ChangePasswordFromForgetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      ConfirmPassword: '',
 
      loading:false,
      hidePassword: true,
      hideConfirmPassword: true,
    
    }
  }
  
  setPasswordVisibility(){
    this.setState({ hidePassword: !this.state.hidePassword });
  }
  setConfirmPasswordVisibility(){
    this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword });
  }


  signUp = async () => {

    Keyboard.dismiss();

    const {  password, ConfirmPassword } = this.state

    //let PasswordValidation = this.PasswordValidation(password)

    if ( password === ConfirmPassword  && password && this.PasswordValidation(password)) {
      this.setState({ loading: true,data:'' });
      try {


        var personInfo = {  
      
          password: password,   
          UserId:this.props.route.params._id   
        }

        var myHeaders = new Headers();
        //myHeaders.append("Content-Type", "multipart/form-data");
        myHeaders.append("Content-Type", "application/json");
     
       // myHeaders.append("Accept", "application/json");

        // var formdata = new FormData();
        // ImageFormData?formdata.append("file", img):formdata.append("file",null);
        // formdata.append("userDetails", JSON.stringify(personInfo));
        // console.log(formdata)

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(personInfo), //formdata,
          //redirect: 'follow'
        };

        const response = await fetch("http://192.168.0.104:3000/users/updateUserPasswordFromForget", requestOptions);

        if (response.ok) {


          this.setState({ loading: false });
         
          Alert.alert(

            "Password changed Successfully",
            "Please re-login",
            [
              { text: "Ok", onPress: () => this.props.navigation.navigate('LoginScreen') }
            ],
            { cancelable: false }
          );
        }
        else {
       
          this.setState({ loading: false });
         
        Alert.alert(

            "Something went wrong!!",
            "Please try again",
            [
              { text: "Ok", onPress: () => null }
            ],
            { cancelable: false }
          );

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
        
     
       if (!password) {
        alert("Please enter Password");
      }
       else if (!(password === ConfirmPassword)) {
        alert("Confirm Password and Password does not match");
       }
      else if (!this.PasswordValidation(password)) {


        Alert.alert(

          "Password must contain",
          "At least 8 characters\nAt least one digit[0-9]\nAt least one lowercase character [a-z]\nAt least one uppercase character [A-Z]\nAt least one special character",
          [
            { text: "Ok", onPress: () => null }
          ],
          { cancelable: false }
        );


      }

    }

  }

  PasswordValidation(matchingString) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

    let match = matchingString.match(pattern);
    return match ? true : false;

  }


  render() {


    return (

      <View style={styles.container}>

<Loader isLoading={this.state.loading} />







<View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={lock_Icon} />
          <TextInput style={styles.inputs}
            placeholder="New password"
            value={this.state.password}
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
		
        
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={lock_Icon} />
          <TextInput style={styles.inputs}
            placeholder="Confirm new password"
            value={this.state.ConfirmPassword}   
            secureTextEntry={this.state.hideConfirmPassword}
            underlineColorAndroid='transparent'
            onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })}
          />
            <TouchableOpacity activeOpacity={0.8} style={styles.touachableButton} onPress={()=>this.setConfirmPasswordVisibility()}>
           {(this.state.hideConfirmPassword)?
            <MaterialCommunityIcons name="eye" size={25} style={styles.buttonImage} />:
<MaterialCommunityIcons name="eye-off" size={25} style={styles.buttonImage} />}
           
         
         
          </TouchableOpacity>
        </View>
		

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}  onPress={()=> this.signUp()} >
          <Text style={styles.loginText}>Change Password</Text>
        </TouchableOpacity>






      </View>

    );
  }
}





const styles = StyleSheet.create({

  container: {
    flex: 2,
    backgroundColor: '#B0E0E6',
    justifyContent: 'center',
    alignItems: 'center',

  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 19,
    flexDirection: 'row',

    //alignItems:'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontSize: 16
  },
  icon: {
    width: 30,
    height: 30,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
    marginTop: 10
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,

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
  restoreButtonContainer: {
    width: 250,
    marginBottom: 15,
    alignItems: 'flex-end'
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

  Imagecontainer: {

    // flex:2,

    // height: 20,
    //alignItems: 'center', 

    resizeMode: 'contain',
    height: 200,
    width: 200,
    marginTop: -80,
    marginBottom: 20
  },

  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //  paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20
  },


  listContainer: {
    flex: 1,
    padding: 25,

  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
    fontWeight: "bold"
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
  touachableButton: {
    //position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 2,
    marginTop:10
  },
});
