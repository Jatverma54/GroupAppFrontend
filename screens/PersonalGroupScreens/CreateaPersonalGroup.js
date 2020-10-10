import 'react-native-gesture-handler';
import React, { useState, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,

  ScrollView,
  Keyboard,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from 'react-native';

import {
  Avatar,

} from 'react-native-paper';


import Group_Name from '../../Pictures/Group_Name.png';
import GroupBio from '../../Pictures/GroupBio.png';
import Category from '../../Pictures/Category.png';
import * as Permissions from 'expo-permissions';
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import PlaceHolderImage from '../../Pictures/PlaceholderImage.png';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import UserToken from '../../constants/APIPasswordCollection'
import Loader from '../../components/Loader';
const { width, height } = Dimensions.get('window');
FAIcon.loadFont();
MDIcon.loadFont();

export default class CreateaPersonalGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
     
      photo: null,
      height: 45,
      GroupName: '',
      GroupBioName: '',
      loading: false,
    }
  }



  updateSize = (height) => {

    if (height < 200) {
      this.setState({
        height
      });
    }
  }

 



  CreateGroup = async () => {
    Keyboard.dismiss();




    const {   photo, GroupName, GroupBioName } = this.state;

    if (  GroupName && GroupBioName) {

      try {
        this.setState({ loading: true,data:'' });
        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var GroupInfo = {
          GroupName: GroupName,
          group_Bio: GroupBioName,
          owner_id: userId,
          group_type: "private",
          admin_id: userId,       
          image: photo,
          GroupCategory_id:userId

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

        const response = await fetch("http://192.168.0.107:3000/groups/createNewGroup", requestOptions);

        if (response.ok) {
          this.setState({ loading: false });
          Alert.alert(

            "Group created successfully",
            "Let's explore the power of group conversation",
            [
              { text: "Ok", onPress: () => this.props.navigation.goBack() }
            ],
            { cancelable: false }
          );
        }
        else {
          this.setState({ loading: false });
          let responseJson = await response.json();

          let errorstring = responseJson.error.toString();
          alert(errorstring)

        }
      }
      catch (e) {
        this.setState({ loading: false });
        console.log('error signing up: ', e)
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

      if (!GroupName) {
        alert("Please enter a Group Name");
      }
      else if (!GroupBioName) {
        alert("Please enter a Group Bio");
      }
    }

  }

  componentDidMount() {
    this.getPermissionAsync();
    this.getCameraPermissionAsync();
  }

  componentWillUnmount() {
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
        base64: true,
      });
      if (!result.cancelled) {
        this.setState({ photo: `data:image/jpg;base64,${result.base64}` });
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
        base64: true,
      });
      if (!result.cancelled) {
        this.setState({ photo: `data:image/jpg;base64,${result.base64}` });
        this.CameraOptions.close();
      }

      //  console.log(result);
    } catch (E) {
      console.log(E);
    }

  };













  render() {

    const {  photo, GroupName, GroupBioName } = this.state;
   
    return (

      <View style={styles.container}>
 <Loader isLoading={this.state.loading} />

        <TouchableOpacity onPress={() => this.CameraOptions.open()}>
          <View style={{ height: 100, padding: 10 }}>

            <View style={{ flex: 3, backgroundColor: "#B0E0E6" }}>

              <View>

                <Avatar.Image
                  style={{ alignSelf: "center", marginTop: -70, marginHorizontal: 2, borderColor: 'black', borderWidth: 2 }}
                  source={photo ? { uri: photo } : PlaceHolderImage} size={100} />


                <Text style={{ fontSize: 12, alignSelf: "center", paddingTop: 6, fontWeight: "bold", width: "100%" }}>Choose an Avatar</Text>
              </View>

            </View>

          </View>
        </TouchableOpacity>

        <View style={styles.inputContainer}>

          <Image style={[styles.icon, styles.inputIcon]} source={Group_Name} />
          <TextInput style={styles.inputs}
            placeholder="Group Name"
            multiline={true}

            maxLength={75}
            editable={true}
            value={GroupName}
            //keyboardType="email-address"

            underlineColorAndroid='transparent'
            onChangeText={(GroupName) => this.setState({ GroupName })}

          />

        </View>





        <View style={{
          borderBottomColor: '#F5FCFF',
          backgroundColor: '#FFFFFF',
          borderRadius: 30,
          borderBottomWidth: 1,
          width: 300,
          height: this.state.height,
          marginBottom: 19,
          flexDirection: 'row',


        }}>

          <Image style={[styles.icon, styles.inputIcon]} source={GroupBio} />

          <ScrollView>
            <TextInput style={styles.inputs}
              placeholder="Group Bio"
              multiline={true}
              editable={true}
              value={GroupBioName}
              // keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(GroupBioName) => this.setState({ GroupBioName })}

              onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
              multiline style={{
                width: '100%', height: this.state.height, marginLeft: 10, fontSize: 16, padding: 10
              }}

            />
          </ScrollView>

        </View>





    

        {/* <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
         <PrivacySettingsPickerList/>
        </View>
      */}
      
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.CreateGroup}>
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




const styles = StyleSheet.create({

  container: {
    flex: 2,
    backgroundColor: '#B0E0E6',
    justifyContent: 'center',
    alignItems: 'center',

  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 19,
    flexDirection: 'row',

    //alignItems:'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontSize: 16
  },
  icon: {
    width: 30,
    height: 30,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
    marginTop: 10
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
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
  restoreButtonContainer: {
    width: 250,
    marginBottom: 15,
    alignItems: 'flex-end'
  },
  socialButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    color: "#FFFFFF",
    marginRight: 5
  },

  Imagecontainer: {

    // flex:2,

    // height: 20,
    //alignItems: 'center', 

    resizeMode: 'contain',
    height: 200,
    width: 200,
    marginTop: -80,
    marginBottom: 20
  },

  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //  paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20
  },


  listContainer: {
    flex: 1,
    padding: 25,

  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
    fontWeight: "bold"
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
