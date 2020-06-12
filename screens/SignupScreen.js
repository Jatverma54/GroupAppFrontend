import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Platform,
  Alert
} from 'react-native';
import {
 
  Avatar,
 
} from 'react-native-paper';

import Email_Icon from '../Pictures/Email.png';
import lock_Icon from '../Pictures/lock.png';
import person from '../Pictures/person.png';
import DrawerLogo from '../Pictures/DrawerLogo.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


FAIcon.loadFont();
MDIcon.loadFont();

export default class SignupScreen extends Component {
  
  constructor(props) {
    super(props);
  }

  state = {
      userName: '',
      email   : '',
      password: '',
      confirmPassword: '',
       photo: null,
       full_name: '',
       date: new Date(1590842927000),
       mode: 'date',
       show: false,
      
    };

  
     onChange = (event, selectedDate) => {
        
      const currentDate = selectedDate || date;
     
      this.setState({show: Platform.OS === 'ios'});
     
      this.setState({date: currentDate});
    };
  
     showMode = currentMode => {
     
      this.setState({show: true});
    
      this.setState({mode: currentMode});
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
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ photo: result.uri });
        this.CameraOptions.close(); 
      }

      console.log(result);
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
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ photo: result.uri });
      this.CameraOptions.close(); 
    }

    console.log(result);
  } catch (E) {
    console.log(E);
  }

};
  


  signUp = async () => {
      alert("****inside sign up");
    const { userName, password, email, full_name,confirmPassword,date,photo } = this.state
    console.log(this.DOB,"ffff");
    try {
        var data = {
            username: userName,
            password: password,
            email: email,
            profile:{
              full_name: full_name,
             
              dob:date.toDateString(),
              profile_pic:photo,
            }
        }
        const response = await fetch("http://192.168.0.101:3000/users/", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
        
        
    });
   
    let responseJson = await response.json();
    alert("Successfully Singed up");
    console.log(responseJson);
    this.props.navigation.navigate('LoginScreen');

    } catch (err) {
      console.log('error signing up: ', err)
    }
 
  }
  
  
 

   render() {
    let { photo,date ,show,mode} = this.state;
    return (
      <View style={styles.container}>

<TouchableOpacity  onPress={() => this.CameraOptions.open()}>
              <View style={{ height: 100,padding:10 }}>
                              
                <View style={{ flex: 3 ,backgroundColor:"#3498db" }}>
                         
                      <View>
                   
                        <Avatar.Image 
                            style={{alignSelf:"center", marginTop:-70,marginHorizontal:2, borderColor: 'black', borderWidth: 2 }}
                             source={{ uri: photo }} size={100}/>
                         
                         
                           <Text style={{fontSize:12,alignSelf:"center",paddingTop:6,fontWeight:"bold",width:"100%"}}>Choose an Avatar</Text>
                      </View>                
                    
                </View>
                            
              </View>
              </TouchableOpacity>
   
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
          <Image style={styles.inputIcon} source={person}/>
          <TextInput style={styles.inputs}
              placeholder="Full Name"
            
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(full_name) => this.setState({full_name})}/>
        </View>

       

        <View style={styles.inputContainer}>
        
     
        <TouchableOpacity  onPress={this.showDatepicker}>
      <View>
          
      
        <Image style={styles.inputIcon} source={person}/>
            <Text style={{marginLeft:60,marginTop:-22,color:'grey'}}>
             DOB: 
             <Text style={{color:'black'}}>{date.toDateString()} </Text>
            
             
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




 {/* List Menu */}
 <RBSheet
          ref={ref => {
            this.CameraOptions = ref;
          }}
          height={330}
        >
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Create</Text>
          
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
  },
  listContainer: {
    flex: 1,
    padding: 25,
    
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666"
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
  



