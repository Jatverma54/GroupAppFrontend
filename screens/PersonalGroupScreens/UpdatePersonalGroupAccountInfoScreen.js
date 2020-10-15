import 'react-native-gesture-handler';
import React, { useState , Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  Alert
  
} from 'react-native';
import Group_Name from '../../Pictures/Group_Name.png';
import GroupBio from '../../Pictures/GroupBio.png';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Loader from '../../components/Loader';
const { width, height } = Dimensions.get('window');

export default class UpdatePersonalGroupAccountInfoScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    
      loading: false,
     height:45,
     Group_name:this.props.route.params.GroupName,
     Group_Bio:this.props.route.params.group_Bio,

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





CreateGroup = async () => {
  Keyboard.dismiss();

  const {  Group_name, Group_Bio } = this.state;

  if (  Group_name && Group_Bio) {
    this.setState({ loading: true,data:'' });
    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var GroupInfo = {
        GroupName: Group_name,
        group_Bio: Group_Bio,
        // GroupCategory: selectedGroupCategoryValue,
        //privacy: Value ? "Closed Group" : "Open Group",
        //owner_id: userId,
        // groupMembers:userId,
         group_type:"personal",
        // admin_id : userId,
      //  GroupCategory_id: selectedGroupCategoryValue,
        // image:photo
        //  countMembers:1,
        groupid: this.props.route.params._id
      }

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(GroupInfo), //formdata,
        //redirect: 'follow'
      };

      const response = await fetch("http://192.168.0.102:3000/groups/updateGroupinformation", requestOptions);

      if (response.ok) {
        this.setState({ loading: false });
        Alert.alert(
          "",
          "Group updated successfully",

          [
            { text: "Ok", onPress: () => this.props.navigation.navigate('PersonalGroupsScreen') }
          ],
          { cancelable: false }
        );
      }
      else {

        Alert.alert(
          "Something went wrong.",
          "Please try again.",

          [
            { text: "Ok", onPress: () => null }
          ],
          { cancelable: false }
        );

      }
    }
    catch (e) {
      this.setState({ loading: false });
      console.log('error Updating group: ', e)
      Alert.alert(

        "Something went wrong!!",
        "Please try again",
        [
          { text: "Ok", onPress: () => null }
        ],
        { cancelable: false }
      );
    }
  }
  else {

    if (!Group_name) {
      alert("Please enter a Group Name");
    }
    else if (!Group_Bio) {
      alert("Please enter a Group Bio");
    }
  }

}







  render() {
    
   
    
    
   
    return (
        
          <View style={styles.container}>

            
<Loader isLoading={this.state.loading} />
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


     
      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}  onPress={this.CreateGroup}>
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
 