import React, { Component } from "react";
import {
  View,
  ScrollView,
  DatePickerIOS,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  Modal,TouchableHighlight, Platform,NativeMethods,
  
} from "react-native";


import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import FbImages from '../Posts/NewPostImagesTile';
     
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from 'expo-document-picker';
import Post_Add from '../../Pictures/Post_Add.png';
import Attach_Icon from '../../Pictures/Attach_Icon.png';
import Camera_Icon from '../../Pictures/Camera_Icon.png';


import { Video } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PDFReader from 'rn-pdf-reader-js'
import * as ScreenOrientation from 'expo-screen-orientation';
import ImageBrowser from './ImageBrowser'
import * as Linking from 'expo-linking';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
FAIcon.loadFont();
MDIcon.loadFont();

export default class CreateaNewPost extends Component {

  constructor(props){
    super(props);
  this.state = {   
     photo: [],
     video: null,
     document: null,   
     newValue: '',
     height: 40,
     //fontWeight
     fontSize:20,
     width:"100%",
     marginLeft:16,
     marginRight:16,
     borderBottomColor: '#FFFFFF',
     flex:1,
     marginTop:20, 
     isVisible: false,
     MaximizeImage:'',
     isDocumentVisible: false,
     OpenDucumentUri:'',
     PhotoPresent:false,
     downloadProgress:null,
     photos: []
  };
}

updateSize = (height) => {
  this.setState({
    height
  });
}

componentDidMount() {
  this.getPermissionAsync();
  this.getCameraPermissionAsync();
  this.changeScreenOrientation();
}


getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};


async changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
}

_pickDocument = async () => {
  try {
  let result = await DocumentPicker.getDocumentAsync({

    type : "application/pdf"
  });
  
  if (!result.cancelled) {
    this.setState({ document: result.uri });
  }
 // console.log(result);
 

} catch (E) {
  console.log(E);
}

}




 _pickImage = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection:true,
     
      //aspect: [1.100,1],
      quality: 1,
    });
    if (!result.cancelled) {
   
    this.state.photo.push(result.uri )
    
    this.setState({ PhotoPresent: true });
      this.CameraOptions.close(); 
    
     // this.props.myHookValue.navigate("CreateaImagePost",this.state.photo);
    }
   
   // console.log(result);
  } catch (E) {
    console.log(E);
  }

};


_pickVideo = async () => {
  try {
    let result = await ImagePicker .launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
     // allowsEditing: true,
   
      //aspect: [1.100,1],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ video: result.uri });
      this.CameraOptions.close(); 
      
     // this.props.myHookValue.navigate("CreateaImagePost",this.state.photo);
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
     // aspect: [1.85,1],
      quality: 1,
    });
    if (!result.cancelled) {
     
      this.state.photo.push(result.uri )
    
      this.setState({ PhotoPresent: true });

      this.CameraOptions.close(); 
    //  this.props.myHookValue.navigate("CreateaImagePost",this.state.photo);
    }

  //  console.log(result);
  } catch (E) {
    console.log(E);
  }

};



_clickVideo = async () => {
  try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
     // aspect: [1.85,1],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ video: result.uri });
      this.CameraOptions.close(); 
    //  this.props.myHookValue.navigate("CreateaImagePost",this.state.photo);
    }

  //  console.log(result);
    
  } catch (E) {
    console.log(E);
  }

};


// ShowImageorVideo(){

//   if(this.state.photo!=null&&!this.state.photo.toString().includes(".mp4")){
//     return(
//     <View style={styles.ImageView} >
//   {this.state.photo&&<TouchableOpacity onPress={() => this.setState({ photo: null })} ><Text style={{marginLeft:5}}>Remove</Text></TouchableOpacity> }
  
//   <Image
// style={styles.stretch}
// source={{uri:this.state.photo}}

// />
// </View>)
//     }
//     else if(this.state.photo!=null&&this.state.photo.toString().includes(".mp4")) {
//       return(
//       <View style={styles.ImageView} >
//       {this.state.photo&&<TouchableOpacity onPress={() => this.setState({ photo: null })} ><Text style={{marginLeft:5}}>Remove</Text></TouchableOpacity> }
//       <Video
//       source={{ uri: this.state.photo }}
//       rate={1.0}
//       volume={1.0}
//       isMuted={false}
//       resizeMode="cover"
//       shouldPlay={false}
//       isLooping={false}
//       useNativeControls
//       style={styles.video}

//     />
//     </View>) 
//     } 
 
// }

imageBrowserCallback = (callback) => {
  callback.then((photo) => {
  
    this.setState({
      imageBrowserOpen: false,
      photo
    })
    
    // console.log(this.state.photos[0].uri,"final")
   //for



  }).catch((e) => console.log(e))
 
}


async openDocument (url) {

 FileSystem.getContentUriAsync(url).then(cUri => {
  
  IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
    data: cUri,
    flags: 1,
  });
 
});

 
};



  render() {

    if (this.state.imageBrowserOpen) {
      return (
        <ImageBrowser
        max={101} // Maximum number of pickable image. default is None
        headerCloseText={'Close '} // Close button text on header. default is 'Close'.
        headerDoneText={'Done '} // Done button text on header. default is 'Done'.
        headerButtonColor={'black'} // Button color on header.
        headerSelectText={'Selected'} // Word when picking.  default is 'n selected'.
     //   mediaSubtype={'screenshot'} // Only iOS, Filter by MediaSubtype. default is display all.
        badgeColor={'black'} // Badge color when picking.
        emptyText={'No Image'} // Empty Text
     callback={this.imageBrowserCallback} // Callback functinon on press Done or Cancel Button. Argument is Asset Infomartion of the picked images wrapping by the Promise.
          />
      )
    }
   
   
       const {photo,newValue,marginLeft,borderBottomColor,marginRight,flex,marginTop, width,height,fontWeight,fontSize} = this.state;
   let newStyle = {
      height,fontSize,marginLeft,borderBottomColor,flex,marginTop, width,marginRight
    }
 
    return (
      <View style={styles.containerNewPost}>
      <View   style={styles.container} >

        <ScrollView>
           
        <View style={styles.inputContainer} >
       
          <TextInput style={styles.inputs}
          //maxLength={500}
              placeholder="Click and Type your thoughts here.."
             // placeholderTextColor="black"
             // keyboardType="email-address"
              //underlineColorAndroid='transparent'
              autoCapitalize="none"
              style={[newStyle]}
              editable={true}
              multiline={true}
              value={newValue}
              onChangeText={(newValue) => this.setState({newValue})}             
              onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
              
               multiline style={{
                    ...styles.editor, fontSize: 22,
                    color: "black", 
             }}>
                      
              </TextInput> 
              </View>
        
              {(this.state.photo.length>0&&!this.state.photo.toString().includes(".mp4")&&!this.state.photo.toString().includes(".txt")&&!this.state.photo.toString().includes(".pdf"))?
      
    
      <View style={styles.ImageView} >
      
        
         {this.state.photo.length>0&&<TouchableOpacity onPress={() => this.setState({ photo: [],PhotoPresent:false })} ><Text style={{marginLeft:5}}>Remove</Text></TouchableOpacity> }
       
        
       
         <FbImages imagesdata={ this.state.photo}/>
      


  </View>:
      
    (this.state.video) ?
      <View style={styles.ImageView} >
        {this.state.video&&<TouchableOpacity onPress={() => this.setState({ video: null })} ><Text style={{marginLeft:5}}>Remove</Text></TouchableOpacity> }
        <Video
        source={{ uri: this.state.video }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        isLooping={false}
        useNativeControls
        style={styles.video}
  
      />
      </View>:
      ((this.state.document) ?
      ( 
      
      
      
      <View  style={styles.ImageView} >
        
      {this.state.document&&<TouchableOpacity onPress={() => this.setState({ document: null })} ><Text style={{marginLeft:5}}>Remove</Text></TouchableOpacity> }
        
      <TouchableHighlight   style={styles.DocumentIcon} 
        
        onPress={()=>this.openDocument(this.state.document)}> 
      <MaterialCommunityIcons
              name="file-document"                
              size={70}
            // style={styles.DocumentIcon} 
            />
       </TouchableHighlight>
  
  <Text style={{alignSelf:"center"}}>PDF</Text>
  

  {/* {this.state.isDocumentVisible===true&&
    
    <Modal>
   
    <View style={{height:height,width:width,flex:1}}>
      

 <PDFReader style={{height:height,width:width}} 
        source={{
          uri: this.state.OpenDucumentUri,

        }}    />
        
   



      <TouchableHighlight
        style={styles.overlayCancel}
        onPress={()=>{this.setState({isDocumentVisible: false})}}>
       
            <MaterialCommunityIcons
              name="close"                
              size={27}
             style={styles.cancelIcon} 
            />
      
         
      </TouchableHighlight>
    </View>
   
    </Modal>
    
    
    }   
       */}




 
  </View>  ):null)}
 

  
  
        
        </ScrollView>
       
      
        <View >
      
        <TouchableOpacity style={styles.inputIcon} onPress={() => this.CameraOptions.open()} > 
        <Image style={{width:60,
    height:60,}} source={Post_Add}/>
             
             <Text style={styles.TextStyle}>Share</Text> 
             </TouchableOpacity>
        </View>
          
  

        <View>
       <TouchableOpacity style={styles.inputIconLeft} onPress={() => this.CameraOptions.open()} > 
        <Image style={{width:30,
    height:30,}} source={Camera_Icon}/>
             
             <Text style={styles.TextStyleLeft}>Add Photo/Video</Text> 
             </TouchableOpacity>

        </View>
        <View >
        <TouchableOpacity style={styles.inputIconRight} onPress={() => this._pickDocument()} >
        <Image style={{width:30,
    height:30}} source={Attach_Icon}/>
             
             <Text style={styles.TextStyleRight}>Attach PDF</Text> 
             </TouchableOpacity>  
        </View>
         
      
      </View>
 
    













        {/* List Menu */}
        <RBSheet
          ref={ref => {
            this.CameraOptions = ref;
          }}
          height={330}
        >
          <View style={styles.listContainerNewPost}>
            <Text style={styles.listTitleNewPost}>Choose an Option</Text>
          
              <TouchableOpacity
                
                style={styles.listButtonNewPost}
                onPress={() => this._clickImage()}
              >
                <MDIcon name="photo-camera" style={styles.listIconNewPost} />
                <Text style={styles.listLabelNewPost}>Take photo</Text>
              </TouchableOpacity>

                
              <TouchableOpacity
                
                style={styles.listButtonNewPost}
                onPress={() => this._clickVideo()}
              >
                <MaterialCommunityIcons name="video-vintage" style={styles.listIconNewPost} />
                <Text style={styles.listLabelNewPost}>Take Video</Text>
              </TouchableOpacity>



              <TouchableOpacity
                
                style={styles.listButtonNewPost}
                onPress={() => this.setState({ imageBrowserOpen: true })}
              >
                <MDIcon name="photo" style={styles.listIconNewPost} />
                <Text style={styles.listLabelNewPost}>Choose Photo</Text>
              </TouchableOpacity>


              <TouchableOpacity
                
                style={styles.listButtonNewPost}
                onPress={() => this._pickVideo()}
              >
                <MaterialCommunityIcons name="library-video" style={styles.listIconNewVideoPost} />
                <Text style={styles.listLabelVideoNewPost}>Choose Video</Text>
              </TouchableOpacity>

             
           
          </View>
        </RBSheet>

      
      
        
      </View>
    );
  }
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  containerNewPost: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  video: {
    width: width,
    height: height / 3
  },
  textTitleNewPost: {
    fontSize: 25,
    marginTop: 120,
    fontWeight: "bold",
    width:"100%",
    marginLeft:200
    
  },
  buttonContainerNewPost: {
    alignItems: "center",
    marginTop: 50
  },
  buttonNewPost: {
    width: 150,
    backgroundColor: "#4EB151",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 3,
    margin: 10
  },
  buttonTitleNewPost: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    width:"100%",
    marginLeft:30

  },
  listContainerNewPost: {
    flex: 1,
    padding: 25
  },
  listTitleNewPost: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
    fontWeight:"bold"
  },
  listButtonNewPost: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },
  listIconNewPost: {
    fontSize: 26,
    color: "#666",
    width: 60
  },
  listIconNewVideoPost: {
    fontSize: 26,
    color: "#666",
    width: 50,
    marginLeft:-22
    
  },
  listLabelNewPost: {
    fontSize: 16
  },
  listLabelVideoNewPost: {
    fontSize: 16,
    marginLeft:33
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    marginBottom: 20
  },
  gridButtonContainer: {
    flexBasis: "25%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  gridButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  gridIcon: {
    fontSize: 30,
    color: "white"
  },
  gridLabel: {
    fontSize: 14,
    paddingTop: 10,
    color: "#333"
  },
  dateHeaderContainer: {
    height: 45,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dateHeaderButton: {
    height: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  dateHeaderButtonCancel: {
    fontSize: 18,
    color: "#666",
    fontWeight: "400"
  },
  dateHeaderButtonDone: {
    fontSize: 18,
    color: "#006BFF",
    fontWeight: "500"
  },
 
 
  inputIconSend: {
    color: "#006BFF"
  },
  input: {
    flex: 1,
    height: 36,
    borderRadius: 36,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    marginHorizontal: 10
  },
  messageContainer: {
    flex: 1,
    padding: 25
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222"
  },
  message: {
    fontSize: 17,
    lineHeight: 24,
    marginVertical: 20
  },
  messageButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  messageButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#3385ff",
    marginLeft: 10
  },
  messageButtonText: {
    color: "#3385ff",
    fontSize: 16,
    fontWeight: "bold"
  },
  messageButtonRight: {
    backgroundColor: "#3385ff"
  },
  messageButtonTextRight: {
    color: "#fff"
  },
  container: {
    flex: 1,
    width:"97%",
    backgroundColor: "white",
  },
  inputContainer: {
      flex:2,
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:"100%",
      height:"60%",
      marginBottom:30,
     // flexDirection: 'row',
      //alignItems:'center'
      marginTop:10
  },
  inputs:{
      height:45,
      width:"100%",
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:2,
    //  marginTop:10,
     fontWeight:"bold",
     fontSize:25,
    
  },
  inputIcon:{
     flex:1,
   
 //alignSelf:"center",
  //marginLeft:180,
 
  width:120,
    
  //alignSelf:"center",
  marginLeft:175,

  marginBottom:30,
  paddingTop:20
  },
  
  TextStyle:{
  
  fontWeight:"bold",
  width:"100%",
 
marginLeft:9,


//marginBottom:10
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
  editor: {
   // justifyContent: 'center',
    height: '100%',
    width: '100%'
},
stretch: {
   // flex:1,
   justifyContent:'center',
   // width: '100%',
   // height: "100%",
    resizeMode: "center",
    width:400,
    height:400,
  alignSelf:"center",

  },
  ImageView:{

    flex:1,
//justifyContent:'center',
    width: '100%',
    height: "100%",
  //  resizeMode: "stretch",
  },
  inputIconLeft:{
     width:120,
    
  //alignSelf:"center",
 marginLeft:30,


  },
  
  TextStyleLeft:{
  
  fontWeight:"600",
  fontSize:13,
  width:"100%",
marginLeft:-30,
marginBottom:10
  },
  inputIconRight:{
     
    width:120,
 // alignSelf:"center",

 marginLeft:330,
 marginTop:-59
  },
  
  TextStyleRight:{
  
  fontWeight:"600",
  fontSize:13,
  width:"100%",
  marginLeft:-10,
marginBottom:10

  },
  ImageView:{

    flex:1,
//justifyContent:'center',
    width: '100%',
    height: "100%",
  //  resizeMode: "stretch",
  },
  overlayCancel: {
    padding: 20,
    position: 'absolute',
    right: 10,
    top: 0,
  },
   cancelIcon: {
    color: 'black',
    marginTop:10,
    

  },
  DocumentIcon: {
   // color: 'black',
    marginTop:10,
    alignSelf:"center"

  },
  stretch: {
    // flex:1,
    width: width,
    height: height / 3,
    resizeMode: "contain",
   },
   video: {
    width: width,
    height: height / 3
  },

});


