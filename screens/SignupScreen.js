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
import { MaterialCommunityIcons ,FontAwesome} from '@expo/vector-icons';

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
       First_name: '',
       Last_name: '',
       date: new Date(1590842927000),
       mode: 'date',
       show: false,
       datechanged:false,
    };

  
     onChange = (event, selectedDate) => {
        
      const currentDate = selectedDate || date;
     
      this.setState({show: Platform.OS === 'ios'});
     
      this.setState({date: currentDate,datechanged:true});
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
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ photo: result.uri });
      this.CameraOptions.close(); 
    }

   // console.log(result);
  } catch (E) {
    console.log(E);
  }

};
  
 


  signUp = async () => {

 
     
    const { userName, password, email, First_name,Last_name,confirmPassword,date,photo ,datechanged,} = this.state
  
  let emailValidation= this.EmailValidation(email)  

  let PasswordValidation= this.PasswordValidation(password)  

    if(datechanged&&password===confirmPassword&&userName&&password&&email&&First_name&&Last_name&&emailValidation&&PasswordValidation){
    
    try {
        var data = {
            username: userName,
            password: password,
            emailId: email,
            firstName: First_name,
            lastName: Last_name,
            enabled: true,
            role:"user",
            phoneNumber:"123456789"
             // dob:date.toDateString(),
            
            
        }
        const response = await fetch("http://apnagroup-env.eba-wwsbsfmm.us-west-2.elasticbeanstalk.com/user/register", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          
        'Content-Type': 'application/json'
        
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
       
        
    });
    //console.log(JSON.stringify(data),"data")
   
   

    let responseJson = await response.json();

       //console.log(response.status)
    if(responseJson.ok){

    Alert.alert(

      "Thank you! Welcome to the Group",
      "Successfully Singed up",
      [
        { text: "Ok", onPress: () => this.props.navigation.navigate('LoginScreen')}
      ],
      { cancelable: false }
    );
    }
    else{
      
   let errorstring= responseJson.errors.toString().replace(",","\n")
    alert(errorstring )
  //  console.log(responseJson);
    }

    } catch (err) {
      console.log('error signing up: ', err)
    }
  }else{
   
    if(!userName){
      alert("Please enter an Username");
    }
    else if(!password){
      alert("Please enter Password");
    }
    else if(!email){
      alert("Please enter an Email Id");
    }
    else if(!First_name){
      alert("Please enter the First Name");
    }
    else if(!Last_name){
      alert("Please enter the Last Name");
    }
    else if(!datechanged){
    alert("Please Select the D.O.B");
    }else if (!(password===confirmPassword)){
      alert("Password Missmatch");
    
  }else if (!emailValidation){
    alert("Enter a valid Email Id");
  }
else if (!PasswordValidation){
 
  
  Alert.alert(

    "Password must contain",
    "At least 8 characters\nAt least one digit[0-9]\nAt least one lowercase character [a-z]\nAt least one uppercase character [A-Z]\nAt least one special character",
    [
      { text: "Ok", onPress: () => null}
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
 return   match?true:false  ;
   
  }
  
  PasswordValidation(matchingString) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    
    let match = matchingString.match(pattern);
 return   match?true:false  ;
   
  }
  
  // let pattern = /@(\w+)/;
  // let match = matchingString.match(pattern);
  // return `${match[1]}`;
 
  
   render() {
   

    let { photo,date ,show,mode} = this.state;
    return (
      <View style={styles.container}>

<TouchableOpacity  onPress={() => this.CameraOptions.open()}>
              <View style={{ height: 100,padding:10,marginTop:50 }}>
                              
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
          {/* <Image style={styles.inputIcon} source={Email_Icon}/> */}
          <FontAwesome name="users" size={25} style={styles.inputIconUsername} />
          <TextInput style={styles.inputs}
              placeholder="Username"
            maxLength={21}
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
              placeholder="First Name"
              maxLength={15}
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(First_name) => this.setState({First_name})}/>
        </View>


        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={person}/>
          <TextInput style={styles.inputs}
              placeholder="Last Name"
              maxLength={15}
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(Last_name) => this.setState({Last_name})}/>
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

        <TouchableOpacity style={styles.buttonSignupContainer} onPress={()=>this.props.navigation.push('LoginScreen')}   >
            <Text style={{fontWeight:'bold',width:"100%",marginLeft:100}}>Already have an account?Log in</Text>
        </TouchableOpacity>


 {/* List Menu */}
 <RBSheet
          ref={ref => {
            this.CameraOptions = ref;
          }}
          height={330}
        >
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Upload Group Avatar</Text>
          
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

  buttonSignupContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    alignSelf:'center',
    marginLeft:-65,
   
  },

  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  inputIconUsername:{
  
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
  



