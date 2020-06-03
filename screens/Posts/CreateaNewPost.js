import React, { Component } from "react";
import {
  View,
  ScrollView,
  DatePickerIOS,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import data from "./static.json";
import TextInputClass from "./TextInputClass";

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from 'expo-document-picker';
import Post_Add from '../../Pictures/Post_Add.png';
import Attach_Icon from '../../Pictures/Attach_Icon.png';
import Camera_Icon from '../../Pictures/Camera_Icon.png';
FAIcon.loadFont();
MDIcon.loadFont();

export default class CreateaNewPost extends Component {

  constructor(props){
    super(props);
  this.state = {   
     photo: null,  
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
}


getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};




_pickDocument = async () => {
  try {
  let result = await DocumentPicker.getDocumentAsync({});
  
  if (!result.cancelled) {
    this.setState({ photo: result.uri });
  }
  console.log(result);
} catch (E) {
  console.log(E);
}

}

 _pickImage = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [1.100,1],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ photo: result.uri });
      this.CameraOptions.close(); 
      
     // this.props.myHookValue.navigate("CreateaImagePost",this.state.photo);
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
     // aspect: [1.85,1],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ photo: result.uri });
      this.CameraOptions.close(); 
    //  this.props.myHookValue.navigate("CreateaImagePost",this.state.photo);
    }

    console.log(result);
  } catch (E) {
    console.log(E);
  }

};

  render() {
   
   
       const {newValue,marginLeft,borderBottomColor,marginRight,flex,marginTop, width,height,fontWeight,fontSize} = this.state;
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
              placeholder="Click and Type your thoughts here :)"
             // placeholderTextColor="black"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              style={[newStyle]}
              editable={true}
              multiline={true}
              value={newValue}
              onChangeText={(newValue) => this.setState({newValue})}             
              onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
              
               multiline style={{
                    ...styles.editor, fontSize: 22,
                    textAlign: 'center', color: "black", 
             }}>
                      
              </TextInput> 
              </View>
           <View style={styles.ImageView} >
             {this.state.photo&&<TouchableOpacity onPress={() => this.setState({ photo: null })} ><Text style={{marginLeft:5}}>Remove</Text></TouchableOpacity> }
                 <Image
        style={styles.stretch}
        source={{uri:this.state.photo}}
      
        
      />
      
             
        </View>
       
        </ScrollView>
       
        <View >

        <Image style={styles.inputIcon} source={Post_Add}/>
             
             <Text style={styles.TextStyle}>Share</Text> 

        </View>
        
        <View>
       <TouchableOpacity  onPress={() => this.CameraOptions.open()} > 
        <Image style={styles.inputIconLeft} source={Camera_Icon}/>
             
             <Text style={styles.TextStyleLeft}>Camera Options</Text> 
             </TouchableOpacity>
        </View>
       
         
        <TouchableOpacity   onPress={() => this._pickDocument()} >
        <View  >
       
        <Image style={styles.inputIconRight} source={Attach_Icon}/>
             
             <Text style={styles.TextStyleRight}>Attach File</Text> 
           
        </View>
        </TouchableOpacity>
      </View>
 
      














        {/* List Menu */}
        <RBSheet
          ref={ref => {
            this.CameraOptions = ref;
          }}
          height={330}
        >
          <View style={styles.listContainerNewPost}>
            <Text style={styles.listTitleNewPost}>Create</Text>
          
              <TouchableOpacity
                
                style={styles.listButtonNewPost}
                onPress={() => this._clickImage()}
              >
                <MDIcon name="photo-camera" style={styles.listIconNewPost} />
                <Text style={styles.listLabelNewPost}>Take photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                
                style={styles.listButtonNewPost}
                onPress={() => this._pickImage()}
              >
                <MDIcon name="photo" style={styles.listIconNewPost} />
                <Text style={styles.listLabelNewPost}>Choose image</Text>
              </TouchableOpacity>
           
          </View>
        </RBSheet>

       

      

      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerNewPost: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
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
    color: "#666"
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
  listLabelNewPost: {
    fontSize: 16
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
  inputContainer: {
    borderTopWidth: 1.5,
    borderTopColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    padding: 10
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
    
    backgroundColor: "white",
  },
  inputContainer: {
      flex:2,
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:"100%",
      height:"10%",
      marginBottom:20,
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
     
    width:60,
    height:60,
 alignSelf:"center",
  //marginLeft:180,
 

  },
  
  TextStyle:{
  
  fontWeight:"bold",
  width:"100%",
marginLeft:181,


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
    justifyContent: 'center',
    height: '100%',
    width: '100%'
},
stretch: {
   // flex:1,
   justifyContent:'center',
   // width: '100%',
   // height: "100%",
    resizeMode: "stretch",
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
     
    width:50,
    height:50,
  //alignSelf:"center",
 marginLeft:32,


  },
  
  TextStyleLeft:{
  
  fontWeight:"600",
  fontSize:13,
  width:"100%",
marginLeft:15,
marginBottom:10
  },
  inputIconRight:{
     
    width:50,
    height:50,
 // alignSelf:"center",
 marginTop:-81,
 marginLeft:310
  },
  
  TextStyleRight:{
  
  fontWeight:"600",
  fontSize:13,
  width:"100%",
  marginLeft:310,
marginBottom:10
  },
});


