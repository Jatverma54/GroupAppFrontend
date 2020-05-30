import React, { Component ,useState} from 'react';
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

export default class SignupScreen extends Component {
  
  constructor(props) {
    super(props);
    state = {
      userName: '',
      email   : '',
      password: '',
      confirmPassword: '',
       photo: null,
       full_name: '',
       date: new Date(1590842927000),
       profile_pic: '',
      
    };

  }

  

  DOB= '';
  DatePicker=()=> {
    const [date, setDate] = useState(new Date(1590842927000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
        
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      this.DOB=currentDate.toDateString();
    };
  
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  
    return (
      <TouchableOpacity  onPress={showDatepicker}>
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
            onChange={onChange}
          />
  
        )}
       
        
          
     
      </TouchableOpacity>
     
      
    );
  };



  signUp = async () => {
      alert("****inside sign up");
    const { userName, password, email, full_name,confirmPassword } = this.state
    console.log(this.DOB,"ffff");
    try {
        var data = {
            username: userName,
            password: password,
            email: email,
            profile:{
              full_name: full_name,
             
              dob:this.DOB,
              profile_pic:'',
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
    
    return (
      <View style={styles.container}>
              <View style={{ height: 100,padding:10 }}>
               
                
                <View style={{ flex: 3 ,backgroundColor:"#00b5ec" }}>
                         
                      <View>
                       
                         <Avatar.Image 
                            style={{alignSelf:"center", marginTop:-70,marginHorizontal:2, borderColor: 'black', borderWidth: 2 }}
                             source={DrawerLogo} size={100}/>
                       
                           <Text style={{fontSize:12,alignSelf:"center",paddingTop:6,fontWeight:"bold",width:"100%"}}>Choose an Avatar</Text>
                      </View>                
                    
                </View>
                            
              </View>
            
   
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
        
     
          <this.DatePicker/>
                        
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
  