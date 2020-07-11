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
  ScrollView
  
} from 'react-native';

import {
 
  
  TouchableRipple,
  Switch,
} from 'react-native-paper';

import lock_Icon from '../../Pictures/lock.png';
import AddGroup_Icon from '../../Pictures/AddGroup.png';
import Group_Name from '../../Pictures/Group_Name.png';
import GroupBio from '../../Pictures/GroupBio.png';
import lock from '../../Pictures/lock.png';
import Category from '../../Pictures/Category.png';
import * as Permissions from 'expo-permissions';
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


FAIcon.loadFont();
MDIcon.loadFont();

export default class UpdatePersonalGroupAccountInfoScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    
     
     height:45,
     Group_name:this.props.route.params.GroupName,
     Group_Bio:this.props.route.params.Bio,

    }
  }


   IsPrivate=(Value)=> {
    // We will pass this function to Drawer and invoke it on theme switch press
    this.setState({
      Value
    });
   
  }

  updateSize = (height) => {

    if(height<200){
    this.setState({
      height
    });
  }
  }

  handleChangeOption(itemValue) {
    if (itemValue !== "0") {
      
    }
  }






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

      //console.log(result);
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

  //  console.log(result);
  } catch (E) {
    console.log(E);
  }

};













  render() {
    

    
    
   
    return (
        
          <View style={styles.container}>

            
         
        <View style={styles.inputContainer}>
        
          <Image style={[styles.icon, styles.inputIcon]} source={Group_Name}/>
          <TextInput style={styles.inputs}
              placeholder="Group Name"
              multiline={true}
              value={this.state.Group_name}
              maxLength={75}
              editable={true}
              onChangeText={(Group_name) => this.setState({Group_name})}
              //keyboardType="email-address"
              underlineColorAndroid='transparent'
              />
             
        </View>
         
 
 

      
        <View style={{
   borderBottomColor: '#F5FCFF',
   backgroundColor: '#FFFFFF',
   borderRadius:30,
   borderBottomWidth: 1,
   width:300,
   height:this.state.height,
   marginBottom:19,
   flexDirection: 'row',


        }}>
        
        <Image style={[styles.icon, styles.inputIcon]} source={GroupBio}/>

        <ScrollView>
        <TextInput style={styles.inputs}
            placeholder="Group Bio"
            multiline={true}
            editable={true}
           // keyboardType="email-address"
           onChangeText={(Group_Bio) => this.setState({Group_Bio})}
            underlineColorAndroid='transparent'
             onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
             multiline style={{
              width: '100%',height:this.state.height,marginLeft:10, fontSize:16,padding:10}}
              value={this.state.Group_Bio}
             />
           </ScrollView>

           
      </View>


     
      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>Update</Text>
        </TouchableOpacity>

      

       


        </View>
      
    );
  }
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
      fontSize:16
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
 