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
  Alert
} from 'react-native';
import APIBaseUrl from '../constants/APIBaseUrl';
import Email_Icon from '../Pictures/Email.png';
import Loader from '../components/Loader';
import {
  AdMobBanner,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
setTestDeviceIDAsync('EMULATOR')


export default class ForgotPassword extends Component {
  controller = new AbortController();
  constructor(props) {
    super(props);
    this.state = {


      confrimationCode: "",
      loading: false,
    }
  }


  resetCodeValidation(matchingString) {

    let pattern = /^[0-9]+$/;
    let match = matchingString.match(pattern);
    return match ? true : false;

  }

 


  AuthenticateConfirmCode = async () => {
    Keyboard.dismiss();

    const { confrimationCode } = this.state

    let resetCodeValidation = this.resetCodeValidation(confrimationCode)

    if (confrimationCode && resetCodeValidation) {



      this.setState({ loading: true });
      try {

        var CodeInfo = {
          "confrimationCode": parseInt(confrimationCode),
          "Userid": this.props.route.params
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(CodeInfo)

        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/users/ForgetPassword/AuthenticateConfirmationCode`, requestOptions,
          { signal: this.controller.signal }

        );


        if (response.ok) {
          this.setState({ loading: false });

          const json = await response.json();

          Alert.alert(

            "Confirmation code verified successfully",
            "",
            [
              { text: "Ok", onPress: () => this.props.navigation.navigate('ChangePasswordFromForgetPassword', json.result) }
            ],
            { cancelable: false }
          );
          this.controller.abort()

        }
        else {

          this.setState({ loading: false });
          Alert.alert(

            "Invalid comfirmation code",
            "Please verify the comfirmation code and try again",
            [
              { text: "Ok", onPress: () => null }
            ],
            { cancelable: false }
          );
          this.controller.abort()

        }

      } catch (err) {
        this.setState({ loading: false });
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

    } else {

      if (!confrimationCode) {
        alert("Please enter a confrimation Code");
      }
      else if (!resetCodeValidation) {
        alert("Please enter a valid Code");
      }

    }

  }

  bannerError = (error) => {

  }

  render() {


    return (

      <View style={styles.container}>

        <Loader isLoading={this.state.loading} />
        <View style={{ justifyContent: "flex-start", flex: 1 }} >
          <AdMobBanner style={{ marginBottom: 70 }} bannerSize="mediumRectangle" adUnitID={'ca-app-pub-1558609691925120/4647645652'}
            servePersonalizedAds={true}
            onDidFailToReceiveAdWithError={this.bannerError}
          />
          <View style={styles.inputContainer}>

            <Image style={[styles.icon, styles.inputIcon]} source={Email_Icon} />
            <TextInput style={styles.inputs}
              placeholder="Confrimation code"
              multiline={true}
              maxLength={75}
              editable={true}
              onChangeText={(confrimationCode) => this.setState({ confrimationCode })}
              underlineColorAndroid='transparent'
            />

          </View>


          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.AuthenticateConfirmCode()}>
            <Text style={styles.loginText}>Confirm</Text>
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
    marginLeft: 30
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
    resizeMode: 'contain',
    height: 200,
    width: 200,
    marginTop: -80,
    marginBottom: 20
  },

  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
