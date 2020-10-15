import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  Keyboard,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import {

  Avatar,

} from 'react-native-paper';
import Email_Icon from '../Pictures/Email.png';
import lock_Icon from '../Pictures/lock.png';
import person from '../Pictures/person.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import mime from "mime";
import PlaceHolderImage from '../Pictures/PlaceholderImage.png';
import { MaterialCommunityIcons, } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
FAIcon.loadFont();
MDIcon.loadFont();
import Loader from '../components/Loader';
export default class SignupScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      photo: null,
      Full_Name: '',
      // Last_name: '',
      date: new Date("2020-07-15"),
      mode: 'date',
      show: false,
      datechanged: false,
      ImageFormData: null,
      loading: false,
      hidePassword: true,
      hideConfirmPassword:true
    };
  }

  setPasswordVisibility(){
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  setConfirmPasswordVisibility(){
    this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword });
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



  componentDidMount() {
    this.getPermissionAsync();
    this.getCameraPermissionAsync();
  }

  componentWillUnmount() {
    this.getPermissionAsync();
    this.getCameraPermissionAsync();
  }

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

        // let imageUri = pickerResult ?     `data:image/jpg;base64,${pickerResult.base64}` : null
        // this.setState({ photo: result });
        this.setState({ photo: `data:image/jpg;base64,${result.base64}`, ImageFormData: result });
        this.CameraOptions.close();

        //  console.log(result)

      }

      // console.log(result);
    } catch (E) {
      console.log(E);
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

      // console.log(result);
    } catch (E) {
      console.log(E);
    }

  };




  signUp = async () => {


    Keyboard.dismiss();

    const { userName, password, email, Full_Name, confirmPassword, date, ImageFormData, photo, datechanged, } = this.state

    let emailValidation = this.EmailValidation(email)

   // let PasswordValidation = 

    if (datechanged && password === confirmPassword && userName && password && email && Full_Name && emailValidation && this.PasswordValidation(password)) {
      this.setState({ loading: true,data:'' });
      try {

        var personInfo = {
          username: userName,
          password: password,
          email: email,

          // lastName: Last_name,
          // enabled: true,
          //  role:"user",
          //  phoneNumber:"123456789",

          //  profilePic:photo 
          profile: {
            profilePic: photo,
            dob: this.formatDate(date),
            full_name: Full_Name,
            //  role:"User"
          }

        }

        //     var img=''
        //     if(ImageFormData){
        //     let  mediaUrl_string = ImageFormData.uri.trim().split("/");
        // 		let mediaUrl_Length = mediaUrl_string.length - 1;
        //     let Media_Name = ImageFormData.uri.split("/")[mediaUrl_Length];

        //      img =  {
        //       uri : ImageFormData.uri,
        //       name: Media_Name,
        //       type: mime.getType(ImageFormData.uri)
        //   }
        // }



        var myHeaders = new Headers();
        //myHeaders.append("Content-Type", "multipart/form-data");
        myHeaders.append("Content-Type", "application/json");

        myHeaders.append("Accept", "application/json");

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

        const response = await fetch("http://192.168.43.42:3000/users/", requestOptions);

        if (response.ok) {


          this.setState({ loading: false });
          Alert.alert(

            "Thank you! Welcome to the Group",
            "We have sent an email with account verification link to your email address. Please verify your email id before login",
            [
              { text: "Ok", onPress: () => this.props.navigation.navigate('LoginScreen') }
            ],
            { cancelable: false }
          );
        }
        else {
          // let responseJson = await response.text();
          // console.log(responseJson)
          this.setState({ loading: false });
          let responseJson = await response.json();
          let errorstring = responseJson.error.toString();
          alert(errorstring)

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
      else if (!email) {
        alert("Please enter an Email Id");
      }
      else if (!Full_Name) {
        alert("Please enter the Full Name");
      }
      // else if(!Last_name){
      //   alert("Please enter the Last Name");
      // }
      else if (!datechanged) {
        alert("Please Select the D.O.B");
      } else if (!(password === confirmPassword)) {
        alert("Confirm Password and Password does not match");

      } else if (!emailValidation) {
        alert("Enter a valid Email Id");
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

  EmailValidation(matchingString) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let match = matchingString.match(pattern);
    return match ? true : false;

  }

  PasswordValidation(matchingString) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

    let match = matchingString.match(pattern);
    return match ? true : false;

  }

  // let pattern = /@(\w+)/;
  // let match = matchingString.match(pattern);
  // return `${match[1]}`;
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }









  render() {
   

    let { photo, date, show, mode, userName, password, email, Full_Name, confirmPassword, } = this.state;

    // let imageUri = photo ? `data:image/jpg;base64,${photo.base64}` : null;
    // imageUri && console.log({uri: imageUri.slice(0, 100)});


    return (
      <View style={styles.container}>
 <Loader isLoading={this.state.loading} />
        <TouchableOpacity onPress={() => this.CameraOptions.open()}>
          <View style={{ height: 100, padding: 10, marginTop: 50 }}>

            <View style={{ flex: 3, backgroundColor: "#3498db" }}>

              <View>

                <Avatar.Image
                  style={{ alignSelf: "center", marginTop: -70, marginHorizontal: 2, borderColor: 'black', borderWidth: 2 }}
                  source={photo ? { uri: photo } : PlaceHolderImage} size={100} />

                <Text style={{ fontSize: 12, alignSelf: "center", paddingTop: 6, fontWeight: "bold", width: "100%" }}>Choose an Avatar</Text>
              </View>

            </View>

          </View>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          {/* <Image style={styles.inputIcon} source={Email_Icon}/> */}
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
          <Image style={styles.inputIcon} source={Email_Icon} />
          <TextInput style={styles.inputs}
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({ email })} />
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


        {/* <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={person}/>
          <TextInput style={styles.inputs}
              placeholder="Last Name"
              maxLength={15}
              value={Last_name}
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(Last_name) => this.setState({Last_name})}/>
        </View> */}



        <View style={styles.inputContainer}>


          <TouchableOpacity onPress={this.showDatepicker}>
            <View>


              <Image style={styles.inputIcon} source={person} />
              <Text style={{ marginLeft: 60, marginTop: -22, color: 'grey' }}>
                DOB:
             <Text style={{ color: 'black' }}>{this.formatDate(date)}</Text>


              </Text>

            </View>

            {show && (
              <DateTimePicker
                testID="DOB"
                value={date}
                timeZoneOffsetInMinutes={0}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />

            )}

          </TouchableOpacity>

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
  

<View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={lock_Icon} />
          <TextInput style={styles.inputs}
            placeholder="Confirm Password"
            value={confirmPassword}
            secureTextEntry={this.state.hideConfirmPassword}
            underlineColorAndroid='transparent'
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          />
            <TouchableOpacity activeOpacity={0.8} style={styles.touachableButton} onPress={()=>this.setConfirmPasswordVisibility()}>
           {(this.state.hideConfirmPassword)?
            <MaterialCommunityIcons name="eye" size={25} style={styles.buttonImage} />:
<MaterialCommunityIcons name="eye-off" size={25} style={styles.buttonImage} />}
           
         
         
          </TouchableOpacity>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.signUp}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableHighlight>

        <TouchableOpacity style={styles.buttonSignupContainer} onPress={() => this.props.navigation.push('LoginScreen')}   >
          <Text style={{ fontWeight: 'bold', width: "100%", marginLeft: 100 }}>Already have an account?Log in</Text>
        </TouchableOpacity>


        {/* List Menu */}
        <RBSheet
          ref={ref => {
            this.CameraOptions = ref;
          }}
          height={330}
        >
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Upload an Avatar</Text>

            <TouchableOpacity

              style={styles.listButton}
              onPress={() => this._clickImage()}
            >
              <MDIcon name="photo-camera" style={styles.listIcon} />
              <Text style={styles.listLabel}>Take photo</Text>
            </TouchableOpacity>

            <TouchableOpacity

              style={styles.listButton}
              onPress={() => this._pickImage()}
            >
              <MDIcon name="photo" style={styles.listIcon} />
              <Text style={styles.listLabel}>Choose image</Text>
            </TouchableOpacity>

          </View>
        </RBSheet>






      </View>
    );
  }
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
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
    backgroundColor: "#FF4DFF",
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
  touachableButton: {
    //position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 2,
    marginTop:10
  },
});




