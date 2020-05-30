import 'react-native-gesture-handler';
import React, { useState , Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Picker,
  
} from 'react-native';

import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  
  TouchableRipple,
  Switch,
} from 'react-native-paper';

import lock_Icon from '../../Pictures/lock.png';
import AddGroup_Icon from '../../Pictures/AddGroup.png';
import Group_Name from '../../Pictures/Group_Name.png';
import GroupBio from '../../Pictures/GroupBio.png';
import lock from '../../Pictures/lock.png';
import Category from '../../Pictures/Category.png';


export default class CreateaProfessionalGroup extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      Value: false,
   
    }
  }


   IsPrivate=(Value)=> {
    // We will pass this function to Drawer and invoke it on theme switch press
    this.setState({
      Value
    });
   
  }

  render() {

    const {Value} = this.state;
   
    
    return (
        
          <View style={styles.container}>

            
          <Image  style={styles.Imagecontainer} source={AddGroup_Icon}/>
         
        <View style={styles.inputContainer}>
        
          <Image style={[styles.icon, styles.inputIcon]} source={Group_Name}/>
          <TextInput style={styles.inputs}
              placeholder="Group Name"
            
              keyboardType="email-address"
              underlineColorAndroid='transparent'/>
             
        </View>
         
 
 

        <View style={styles.inputContainer}>
        
        <Image style={[styles.icon, styles.inputIcon]} source={GroupBio}/>
        <TextInput style={styles.inputs}
            placeholder="Group Bio"
          
            keyboardType="email-address"
            underlineColorAndroid='transparent'/>
           
      </View>

     


       

        {/* <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
         <PrivacySettingsPickerList/>
        </View>
      */}
     
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>Create Group</Text>
        </TouchableOpacity>

    

        </View>
      
    );
  }
}

const GroupCategoryPickerList=()=> {
  const [selectedGroupCategoryValue, setselectedGroupCategoryValue] = useState("");
  return (
   
      <Picker
        selectedValue={selectedGroupCategoryValue}
        style={{ height: 50, width: "80%"}}
        onValueChange={(itemValue, itemIndex) => setselectedGroupCategoryValue(itemValue)}
      >
        <Picker.Item label="Group Category" value="" />
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="Java" value="Java" />
        <Picker.Item label="Html" value="Html" />
        <Picker.Item label="Php" value="Php" />
        <Picker.Item label="C++" value="C++" />
        <Picker.Item label="JavaScript" value="JavaScript" />
        
      </Picker>
     
  );
}

const PrivacySettingsPickerList=()=> {
  const [selectedPrivacySettingsValue, setselectedPrivacySettingsValue] = useState("");
  return (
   
      <Picker
        selectedValue={selectedPrivacySettingsValue}
        style={{ height: 50, width: "80%"}}
        onValueChange={(itemValue, itemIndex) => setselectedPrivacySettingsValue(itemValue)}
      >
        <Picker.Item label="Privacy Settings" value="" />
        <Picker.Item label="Open Group" value="Open Group" />
        <Picker.Item label="Close Group" value="js" />
        
        
      </Picker>
     
  );
}

const styles = StyleSheet.create({
  
  container: {
   flex:2,
    backgroundColor: '#B0E0E6',
   justifyContent: 'center',
    alignItems: 'center',
  
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:300,
      height:45,
      marginBottom:19,
      flexDirection: 'row',

      //alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  icon:{
    width:30,
    height:30,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center',
    marginTop:10
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
  restoreButtonContainer:{
    width:250,
    marginBottom:15,
    alignItems: 'flex-end'
  },
  socialButtonContent:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  socialIcon:{
    color: "#FFFFFF",
    marginRight:5
  },
  
  Imagecontainer:{
    
   // flex:2,
   
  // height: 20,
    //alignItems: 'center', 
    
      resizeMode: 'contain',
      height: 200,
      width: 200,
      marginTop:-80,
      marginBottom:20
  },

  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  //  paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom:20
  },

});
 