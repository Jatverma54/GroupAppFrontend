import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image, 
} from 'react-native';

import { 
  Button,
} from 'react-native-paper';

import ImageView from "react-native-image-viewing";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
FAIcon.loadFont();
MDIcon.loadFont();


export default class ProfileScreen extends Component {


  constructor(props) {
    super(props);
  }

  state = {    
       photo: null,
       isVisible:false
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
  
      //console.log(result);
    } catch (E) {
      console.log(E);
    }
  
  };
    



  render() {

    const images = [
      {
        uri: this.state.photo,
      },
  
    ];
  



    return (


      <View style={styles.container}>
          <View style={styles.header}>

          <Button color="white" style={{marginLeft:350}}   onPress={()=>{this.props.navigation.navigate("ChangePassword")}} >
                       
                       <MaterialCommunityIcons
                               name='account-edit'                
                             //  color={color}
                               size={20}
                             />     
                         </Button>

         
            <View style={styles.headerContent}>
            <TouchableOpacity  onPress={() => this.setState({isVisible:true})}>
                <Image style={styles.avatar}
                  source={{uri: this.state.photo}}/>

<Button color="white" style={{marginLeft:90,marginTop:-30,marginBottom:10}}   onPress={() => this.CameraOptions.open()}>
                  <MaterialIcons
                  name='edit'
                  
                //  color={color}
                  size={20}
                /></Button>


{this.state.isVisible&&
            
            <ImageView
  images={images}
  imageIndex={0}
  visible={this.state.isVisible}
  onRequestClose={() =>  this.setState({isVisible:false})}
 
/> }

                <Text style={styles.name}>
                  Jatin Verma
                </Text>
                </TouchableOpacity>
            </View>
           
          </View>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.textInfo}>
                johndoe@gmail.com
              </Text>
          
              
                {/* <Button   color="white" style={{marginTop:20,width:"100%"}} onPress={() => {this.props.navigation.navigate("ChangePassword")}}>Change Password</Button>
              */}
                     
             
            </View>
        </View>




{/* List Menu */}
<RBSheet
          ref={ref => {
            this.CameraOptions = ref;
          }}
          height={330}
        >
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Change Profile Picture</Text>
          
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
  header:{
    backgroundColor: "#0489B1",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
    alignSelf:"center"
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "white",
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
 