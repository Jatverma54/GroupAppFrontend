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

import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

FAIcon.loadFont();
MDIcon.loadFont();

export default class CreateaPersonalGroup extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      Value: false,
      photo:null,
      height:45,
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

    //  console.log(result);
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















  render() {

    const {Value,photo} = this.state;
   
    
    return (
        
          <View style={styles.container}>

            
<TouchableOpacity  onPress={() => this.CameraOptions.open()}>
              <View style={{ height: 100,padding:10 }}>
                              
                <View style={{ flex: 3 ,backgroundColor:"#B0E0E6" }}>
                         
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
        
          <Image style={[styles.icon, styles.inputIcon]} source={Group_Name}/>
         
          <TextInput style={styles.inputs}
              placeholder="Group Name"
              multiline={true}
              maxLength={75}
              editable={true}
              //keyboardType="email-address"
              underlineColorAndroid='transparent'/>
             
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
            underlineColorAndroid='transparent'
             onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
             multiline style={{
              width: '100%',height:this.state.height,marginLeft:10, fontSize:16,padding:10}}

             />
           </ScrollView>

      </View>

     


       

        {/* <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
         <PrivacySettingsPickerList/>
        </View>
      */}
     
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>Create Group</Text>
        </TouchableOpacity>

    
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
 