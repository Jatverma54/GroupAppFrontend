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
  Keyboard

} from 'react-native';
import Email_Icon from '../Pictures/Email.png';
import APIBaseUrl from '../constants/APIBaseUrl';
import Loader from '../components/Loader';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
setTestDeviceIDAsync('EMULATOR')

export default class ForgotPassword extends Component {
  controller = new AbortController();
  constructor(props) {
    super(props);
    this.state = {


      Email: "",
      loading: false,

    }
  }

  // authenticateEmail(){
  //   this.props.navigation.navigate('ConfirmYourIdentity',this.state.Email)
  // }
  
  EmailValidation(matchingString) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let match = matchingString.match(pattern);
    return match ? true : false;

  }

  bannerError=(error)=>{
		console.log("Error while loading banner"+error)
	  }


  authenticateEmail = async () => {
    Keyboard.dismiss();

    const { Email } = this.state

    if (Email ) {

      let emailValidation = this.EmailValidation(Email)

      if(emailValidation){

      this.setState({ loading: true,data:'' });
      try {

        var EmailInfo = {
          "Email": Email,
        
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //myHeaders.append("Authorization", 'Basic ' + encode(userName + ":" + password));


        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(EmailInfo)

        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/users/ForgetPassword/AuthenticateEmail`, requestOptions
,{signal: this.controller.signal}

        );


        if (response.ok) {
          this.setState({ loading: false });
          const json = await response.json();

          Alert.alert(

            "Confirmation code sent successfully",
            "",
            [
              { text: "Ok", onPress: () =>  this.props.navigation.navigate('ConfirmYourIdentity',json.result)}
            ],
            { cancelable: false }
          );
         
          this.controller.abort()

        }
        else {

          this.setState({ loading: false });
          Alert.alert(

            "Please verify your email",
            "User with Email id "+Email+" does not exist",
            [
              { text: "Ok", onPress: () => null }
            ],
            { cancelable: false }
          );
          this.controller.abort()

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
        this.controller.abort()

      }
    }else{
      alert("Please enter a valid email id");
    }
    } else {
     
        alert("Please enter an email id");
        

    }

  }



  render() {


    return (

      <View style={styles.container}>

<Loader isLoading={this.state.loading} />
<View style={{justifyContent:"flex-start",flex:1}} >
        <AdMobBanner style={{marginBottom:70}} bannerSize="mediumRectangle" adUnitID={'ca-app-pub-3940256099942544/6300978111'}
        servePersonalizedAds={true}
        onDidFailToReceiveAdWithError={this.bannerError} 
        />
       
        <View style={styles.inputContainer}>

          <Image style={[styles.icon, styles.inputIcon]} source={Email_Icon} />
          <TextInput style={styles.inputs}
            placeholder="Email"
            multiline={true}
            //  value={this.state.Email}
            maxLength={75}
            editable={true}
            onChangeText={(Email) => this.setState({ Email })}
            //keyboardType="email-address"
            underlineColorAndroid='transparent'
          />

        </View>


        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={()=>this.authenticateEmail()}>
          <Text style={styles.loginText}>Send confirmation code in email</Text>
        </TouchableOpacity>


        



      </View>
      </View>
    );
  }
}





const styles = StyleSheet.create({

  container: {
    flex: 1,
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
marginLeft:30
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
});
