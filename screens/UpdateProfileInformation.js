import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Platform,
  Alert,
  Keyboard,
  AsyncStorage
} from 'react-native';
import person from '../Pictures/person.png';
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import Loader from '../components/Loader';
import APIBaseUrl from '../constants/APIBaseUrl';
FAIcon.loadFont();
MDIcon.loadFont();


export default class UpdateProfileInformation extends Component {
  controller = new AbortController();
  constructor(props) {
    super(props);

    this.state = {
      userName: this.props.route.params.username,
      Full_Name: this.props.route.params.profile.full_name,
      loading: false,
    };
  }




  onChange = (event, selectedDate) => {

    const currentDate = selectedDate || date;

    this.setState({ show: Platform.OS === 'ios' });

    this.setState({ date: currentDate, datechanged: true });
  };

  showMode = currentMode => {

    this.setState({ show: true });

    this.setState({ mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };

  cleanup = null;

  // componentDidMount() {
  // //  this.getPermissionAsync();
  //   //this.getCameraPermissionAsync();
  // }



  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });
      if (!result.cancelled) {

        this.setState({ photo: `data:image/jpg;base64,${result.base64}`, ImageFormData: result });
        this.CameraOptions.close();

      }

    } catch (E) {

    }

  };

  getCameraPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };


  _clickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ photo: `data:image/jpg;base64,${result.base64}`, ImageFormData: result });

        this.CameraOptions.close();
      }

    } catch (E) {
    }

  };




  signUp = async () => {


    Keyboard.dismiss();

    const { userName, Full_Name } = this.state



    if (userName && Full_Name) {
      this.setState({ loading: true, data: '' });
      try {
        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var personInfo = {
          username: userName,
          full_name: Full_Name,
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(personInfo),
        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/users/updateUserinformation`, requestOptions, { signal: this.controller.signal });

        if (response.ok) {
          this.setState({ loading: false });
          const json = await response.json();

          Alert.alert(

            "Account information updated Successfully",
            "",
            [
              { text: "Ok", onPress: () => this.props.navigation.push('DrawerScreen', json.result) }
            ],
            { cancelable: false }
          );
          this.controller.abort()
        }
        else {
          this.setState({ loading: false });
          let responseJson = await response.json();
          let errorstring = responseJson.error.toString();
          alert(errorstring)
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

      if (!userName) {
        alert("Please enter an Username");
      }

      else if (!Full_Name) {
        alert("Please enter the Full Name");
      }


    }

  }

  render() {



    let { userName, email, Full_Name, } = this.state;

    return (
      <View style={styles.container}>

        <Loader isLoading={this.state.loading} />

        <View style={styles.inputContainer}>


          <FontAwesome name="users" size={25} style={styles.inputIconUsername} />
          <TextInput style={styles.inputs}
            placeholder="Username"
            maxLength={21}
            keyboardType="email-address"
            value={userName}
            underlineColorAndroid='transparent'
            onChangeText={(userName) => this.setState({ userName })} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={person} />
          <TextInput style={styles.inputs}
            placeholder="Full Name"
            maxLength={15}
            value={Full_Name}
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(Full_Name) => this.setState({ Full_Name })} />
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.signUp}>
          <Text style={styles.signUpText}>Update Information</Text>
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
    backgroundColor: '#B0E0E6',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
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
    marginLeft: -65,

  },

  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  inputIconUsername: {

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
  },
  signupButton: {
    backgroundColor: '#3498db',
  },
  signUpText: {
    color: 'white',
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




