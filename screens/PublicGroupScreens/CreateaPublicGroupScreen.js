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
  Avatar,
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
import PlaceHolderImage from '../../Pictures/PlaceholderImage.png';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Loader from '../../components/Loader';
import APIBaseUrl from '../../constants/APIBaseUrl';
FAIcon.loadFont();
MDIcon.loadFont();
//import {
 //AdMobBanner,
  //setTestDeviceIDAsync,
//} from 'expo-ads-admob';

//setTestDeviceIDAsync('EMULATOR')


export default class CreateaPublicGroupScreen extends Component {
  controller = new AbortController();
  constructor(props) {
    super(props);
    this.state = {
      Value: false,
      selectedGroupCategoryValue: this.props.route.params.GroupCategory_id ? this.props.route.params.GroupCategory_id : this.props.route.params._id,
      FirstGroupCategoryValue: this.props.route.params.title,
      photo: null,
      height: 45,
      GroupName: '',
      GroupBioName: '',
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
        <Picker.Item label="Healthcare" value="5fd46d4396aedd2228764e35" />
        <Picker.Item label="Fitness & Sports" value="5f952443f623833284fcb0ed" />
        <Picker.Item label="Shop & Sell" value="5fd46d4396aedd2228764e36" />
        <Picker.Item label="Job Alerts" value="5fd46d4396aedd2228764e37" />
        <Picker.Item label="Social News" value="5fd46d4396aedd2228764e38" />
        <Picker.Item label="Travel" value="5fd46d4396aedd2228764e39" />
        <Picker.Item label="Food & Recipes" value="5fd46d4396aedd2228764e3a" />
        <Picker.Item label="Entertainment" value="5fd46d4396aedd2228764e3b" />
        <Picker.Item label="Real Estate" value="5fd46d4396aedd2228764e3c" />
        <Picker.Item label="Education" value="5fd46d4396aedd2228764e3d" />
        <Picker.Item label="Science & Technology" value="5fd46d4396aedd2228764e3e" />
        <Picker.Item label="Home Remedies" value="5fd46d4396aedd2228764e3f" />
        <Picker.Item label="New Trend & Style" value="5fd46d4396aedd2228764e40" />
        <Picker.Item label="Spirituality" value="5fd46d4396aedd2228764e41" />
        <Picker.Item label="Consultation" value="5fd46d4396aedd2228764e42" />
        <Picker.Item label="Art & Hobbies" value="5fd46d4396aedd2228764e43" />
        <Picker.Item label="Automobile" value="5fd46d4396aedd2228764e44" />
        <Picker.Item label="Others" value="5fd46d4396aedd2228764e45" />

      </Picker>

    );
  }


  CreateGroup = async () => {
    Keyboard.dismiss();




    const { Value, selectedGroupCategoryValue, photo, GroupName, GroupBioName } = this.state;

    if (selectedGroupCategoryValue && GroupName && GroupBioName) {

      try {
        this.setState({ loading: true, data: '' });
        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var GroupInfo = {
          GroupName: GroupName,
          group_Bio: GroupBioName,
          privacy: Value ? "Private Group" : "Open Group",
          owner_id: userId,
          group_type: "public",
          admin_id: userId,
          GroupCategory_id: selectedGroupCategoryValue,
          image: photo,
        }

        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(GroupInfo),

        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/createNewGroup`, requestOptions, { signal: this.controller.signal });

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
          this.controller.abort()
        }
        else {
          this.setState({ loading: false });
          let responseJson = await response.json();

          let errorstring = responseJson.error.toString();
          alert(errorstring)
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

      if (!GroupName) {
        alert("Please enter a Group Name");
      }
      else if (!GroupBioName) {
        alert("Please enter a Group Bio");
      }
    }

  }
  cleanup = null;
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
        base64: true,
      });
      if (!result.cancelled) {
        this.setState({ photo: `data:image/jpg;base64,${result.base64}` });
        this.CameraOptions.close();
      }
    } catch (E) {

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


    } catch (E) {

    }

  };

  bannerError = (error) => {

  }

  render() {

    const { Value, selectedGroupCategoryValue, photo, GroupName, GroupBioName } = this.state;

    return (


      < View style={styles.container}>
        <Loader isLoading={this.state.loading} />
        <ScrollView contentContainerStyle={styles.scrollcontainer}>
          <TouchableOpacity onPress={() => this.CameraOptions.open()}>
            <View style={{ padding: 10, marginTop: 50, backgroundColor: "#B0E0E6", marginBottom: 20, width: "100%" }}>




              <Avatar.Image
                style={{ alignSelf: "center", marginHorizontal: 2, borderColor: 'black', borderWidth: 2, }}
                source={photo ? { uri: photo } : PlaceHolderImage} size={100} />


              <Text style={{ marginLeft: 10, fontSize: 12, alignSelf: "center", paddingTop: 6, fontWeight: "bold", width: "100%", }}>Choose an Avatar  </Text>
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

                underlineColorAndroid='transparent'
                onChangeText={(GroupBioName) => this.setState({ GroupBioName })}

                onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                multiline style={{
                  width: '100%', height: this.state.height, marginLeft: 10, fontSize: 16, padding: 10
                }}

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
          <Text style={{ paddingLeft: 70, marginTop: -20 }}>(Private: Group admin needs to approve the joining request)</Text>
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


        </ScrollView>
        {/* <AdMobBanner style={{ flex: 1, justifyContent: "flex-end" }} bannerSize="banner" adUnitID={'ca-app-pub-1558609691925120/6310961554'}
          servePersonalizedAds={true}
          onDidFailToReceiveAdWithError={this.bannerError}
        /> */}
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
    flex: 1,
    backgroundColor: '#B0E0E6',
    justifyContent: 'center',
    alignItems: 'center',

  },
  scrollcontainer: {

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
    fontSize: 16,

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

    marginTop: 30,

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
    marginBottom: 20,

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
