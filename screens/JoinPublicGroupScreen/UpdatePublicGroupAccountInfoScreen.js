import 'react-native-gesture-handler';
import React, { useState, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Picker,
  ScrollView,
  Keyboard,
  Alert,
  AsyncStorage,
  Dimensions,
} from 'react-native';

import {
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import Group_Name from '../../Pictures/Group_Name.png';
import GroupBio from '../../Pictures/GroupBio.png';
import Category from '../../Pictures/Category.png';
import * as Permissions from 'expo-permissions';
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Loader from '../../components/Loader';
import APIBaseUrl from '../../constants/APIBaseUrl';
FAIcon.loadFont();
MDIcon.loadFont();
// import {
//   setTestDeviceIDAsync,
// } from 'expo-ads-admob';

//setTestDeviceIDAsync('EMULATOR')


export default class UpdatePublicGroupAccountInfoScreen extends Component {
  controller = new AbortController();
  constructor(props) {
    super(props);
    this.state = {
      Value: this.props.route.params.privacy.toString().includes("Private Group") ? true : false,
      selectedGroupCategoryValue: this.props.route.params.GroupCategory_id,
      FirstGroupCategoryValue: this.props.route.params.GroupCategory,
      photo: null,
      height: 45,
      Group_name: this.props.route.params.GroupName,
      Group_Bio: this.props.route.params.group_Bio,
      loading: false,

    }
  }


  IsPrivate = (Value) => {
    // We will pass this function to Drawer and invoke it on theme switch press
    this.setState({
      Value
    });

  }

  updateSize = (height) => {

    if (height < 200) {
      this.setState({
        height
      });
    }
  }

  handleChangeOption(itemValue) {
    if (itemValue !== "0") {

    }
  }

  GroupCategoryPickerList() {
    const { selectedGroupCategoryValue, FirstGroupCategoryValue } = this.state;

    return (

      <Picker
        selectedValue={selectedGroupCategoryValue}
        style={{ height: 50, width: "80%" }}
        onValueChange={(itemValue, itemIndex) => this.setState({ selectedGroupCategoryValue: itemValue })}
      >
        <Picker.Item label={FirstGroupCategoryValue} value={selectedGroupCategoryValue} />
        <Picker.Item label="Home Remedies" value="5f63b02895358640bc482a27" />
        <Picker.Item label="Healthcare" value="5f63b02895358640bc482a28" />
        <Picker.Item label="Family" value="5f63b02895358640bc482a29" />
        <Picker.Item label="School" value="5f63b02895358640bc482a2a" />
        <Picker.Item label="Things" value="5f63b02895358640bc482a2b" />
        <Picker.Item label="World" value="5f63b02895358640bc482a2c" />
        <Picker.Item label="Remember" value="5f63b02895358640bc482a2d" />
        <Picker.Item label="Game" value="5f63b02895358640bc482a2e" />

      </Picker>

    );
  }


  cleanup = null;

  componentDidMount() {
    this.getPermissionAsync();
    this.getCameraPermissionAsync();
   // this._openRewarded();


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

    } catch (E) {

    }

  };


  CreateGroup = async () => {
    Keyboard.dismiss();

    const { Value, selectedGroupCategoryValue, photo, Group_name, Group_Bio } = this.state;

    if (selectedGroupCategoryValue && Group_name && Group_Bio) {
      this.setState({ loading: true, data: '' });
      try {

        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var GroupInfo = {
          GroupName: Group_name,
          group_Bio: Group_Bio,
          privacy: Value ? "Private Group" : "Open Group",
          group_type: "public",
          GroupCategory_id: selectedGroupCategoryValue,
          groupid: this.props.route.params._id
        }

        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(GroupInfo),
        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/updateGroupinformation`, requestOptions, { signal: this.controller.signal });

        if (response.ok) {
          this.setState({ loading: false });
          Alert.alert(
            "",
            "Group updated successfully",

            [
              { text: "Ok", onPress: () => this.props.navigation.navigate('JoinedPublicGroupsScreen') }
            ],
            { cancelable: false }
          );
          this.controller.abort()
        }
        else {
          this.setState({ loading: false });
          Alert.alert(
            "Something went wrong.",
            "Please try again.",

            [
              { text: "Ok", onPress: () => null }
            ],
            { cancelable: false }
          );
          this.controller.abort()
        }
      }
      catch (e) {
        this.setState({ loading: false });

        Alert.alert(

          "Something went wrong!!",
          "Please try again",
          [
            { text: "Ok", onPress: () => null }
          ],
          { cancelable: false }
        );
        this.controller.abort()
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

    } catch (E) {

    }

  };


  render() {


    const { Value, selectedGroupCategoryValue, photo } = this.state;


    return (

      <View style={styles.container}>

        <Loader isLoading={this.state.loading} />

        <View style={styles.inputContainer}>

          <Image style={[styles.icon, styles.inputIcon]} source={Group_Name} />
          <TextInput style={styles.inputs}
            placeholder="Group Name"
            multiline={true}
            value={this.state.Group_name}
            maxLength={75}
            editable={true}
            onChangeText={(Group_name) => this.setState({ Group_name })}
            underlineColorAndroid='transparent'
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
              onChangeText={(Group_Bio) => this.setState({ Group_Bio })}
              underlineColorAndroid='transparent'
              onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
              multiline style={{
                width: '100%', height: this.state.height, marginLeft: 10, fontSize: 16, padding: 10
              }}
              value={this.state.Group_Bio}
            />
          </ScrollView>

        </View>





        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={Category} />
          {this.GroupCategoryPickerList()}
        </View>
        <TouchableRipple onPress={() => this.IsPrivate(!Value)}  >
          <View style={styles.preference}>
            <Text style={{ paddingRight: 70, marginTop: 1 }}>Private Group</Text>
            <View pointerEvents="none">
              <Switch value={Value} />
            </View>
          </View>
        </TouchableRipple>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.CreateGroup}>
          <Text style={styles.loginText}>Update</Text>
        </TouchableOpacity>




      </View>

    );
  }
}



const PrivacySettingsPickerList = () => {
  const [selectedPrivacySettingsValue, setselectedPrivacySettingsValue] = useState("");
  return (

    <Picker
      selectedValue={selectedPrivacySettingsValue}
      style={{ height: 50, width: "80%" }}
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
    resizeMode: 'contain',
    height: 200,
    width: 200,
    marginTop: -80,
    marginBottom: 20
  },

  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
