import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Button,
} from 'react-native-paper';
import ImageView from "react-native-image-viewing";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
FAIcon.loadFont();
MDIcon.loadFont();
import Loader from '../components/Loader';
import APIBaseUrl from '../constants/APIBaseUrl';
import * as Notifications from 'expo-notifications';
const { width } = Dimensions.get('window');
import {
  AdMobBanner,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
setTestDeviceIDAsync('EMULATOR')


export default class ProfileScreen extends Component {
  controller = new AbortController();

  constructor(props) {
    super(props);
    this.state = {
      ProfileName: '',
      email: '',
      photo: null,
      isVisible: false,
      username: "",
      _id: "",
      data: "",
      loading: false,
      isImageLoaded: true,
      disabled: false

    }
  }

  bannerError = (error) => {

  }
  cleanup = null;


  componentDidMount() {

    let unsubscribe2;
   let unsubscribe1 = this.props.navigation.addListener('focus', () => {
    unsubscribe2=  this.setState({ data: "" })
      this.getData();
   });
    this.getPermissionAsync();
    this.getCameraPermissionAsync();

    this.cleanup = () => {  unsubscribe1();unsubscribe2; }

  }

  componentWillUnmount() {

    if (this.cleanup) this.cleanup();
    this.cleanup = null;
  }


  getData = async () => {

    this.setState({ loading: true, data: '' });

    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,

      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/users/userInformation`, requestOptions, { signal: this.controller.signal });
      if (response.ok) {
        this.setState({ loading: false, disabled: false });
        const json = await response.json();

        this.setState({
          photo: json.result.profile.profile_pic,
          ProfileName: json.result.profile.full_name,
          email: json.result.email,
          username: json.result.username,
          _id: json.result._id, data: json.result
        })
        this.controller.abort()


      } else {

        this.setState({ loading: false, disabled: false });
        Alert.alert(

          "Something went wrong!!",
          "Please try again.",
          [
            { text: "Ok", onPress: () => null }
          ],
          { cancelable: false }
        );
        this.controller.abort()
      }

    } catch (e) {
      this.setState({ error: 'Reload the Page', disabled: false, isFetching: false, loading: false });

      this.controller.abort()
    }
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
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
      this.CameraOptions.close();
      if (!result.cancelled) {


        this.setState({ loading: true, data: '' });

        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var UpdateImage = {
          "UserId": this.state.data._id,
          "image": `data:image/jpg;base64,${result.base64}`,
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(UpdateImage)

        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/users/updateUserImage`, requestOptions, { signal: this.controller.signal });


        if (response.ok) {
          this.setState({ loading: false });
          image = `data:image/jpg;base64,${result.base64}`;


          this.setState({ photo: image });
          const json = await response.json();
          this.props.navigation.push('DrawerScreen', json.result)
          this.controller.abort()
        }
        else {
          this.setState({ loading: false });
          Alert.alert(
            "Something went wrong",
            "Please try again",
            [
              { text: "Ok", onPress: () => null }
            ],
            { cancelable: false }
          );
          this.controller.abort()
        }

      }

    } catch (E) {

      this.setState({ loading: false });

      this.controller.abort()
    }

  };

  _pickImage = async () => {


    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });
      this.CameraOptions.close();
      if (!result.cancelled) {
        this.setState({ loading: true, data: '' });


        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var UpdateImage = {
          "UserId": this.state.data._id,
          "image": `data:image/jpg;base64,${result.base64}`,
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(UpdateImage)

        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/users/updateUserImage`, requestOptions, { signal: this.controller.signal });

        if (response.ok) {
          this.setState({ loading: false });

          this.setState({ photo: `data:image/jpg;base64,${result.base64}` });
          const json = await response.json();
          this.props.navigation.push('DrawerScreen', json.result)
          this.controller.abort()
        }
        else {
          this.setState({ loading: false });
          Alert.alert(
            "Something went wrong",
            "Please try again",
            [
              { text: "Ok", onPress: () => null }
            ],
            { cancelable: false }
          );
          this.controller.abort()
        }
        this.CameraOptions.close();
      }

    } catch (E) {
      this.setState({ loading: false });
      this.controller.abort()
    }

  };


  turnOffNotifications(){

    Alert.alert(

      this.state.data.ExpopushToken?"Do you want to turn off the notifications":"Do you want to turn on the notifications",
      "",
      [
        { text: "Yes", onPress: () => this.turnOffNotofication() }
      ,
      {
        text: "No",
        onPress: () => null,
        style: "cancel"
      }]
    );
  }

  turnOffNotofication=async()=>{
    
    try {
      this.setState({ loading: true });
      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

let pushToken;
if(!this.state.data.ExpopushToken){
  
        let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (statusObj.status !== 'granted') {
          statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        if (statusObj.status !== 'granted') {
          pushToken = null;
        } else {
          pushToken = (await Notifications.getExpoPushTokenAsync()).data;
        }
}

      var TurnOnOffNotification = {
       "notificationoff":this.state.data.ExpopushToken?true:false,
       "ownerPushToken": pushToken
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(TurnOnOffNotification)

      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/users/turnOnOffNotification`, requestOptions, { signal: this.controller.signal });


      if (response.ok) {
        this.setState({ loading: false });
        const json = await response.json();
        
        Alert.alert(
          json.message,
         "",
          [
            { text: "Ok", onPress: () => this.getData() }
          ],
          { cancelable: false }
        );

        this.controller.abort()


      } else {

        this.setState({ loading: false });
        Alert.alert(

          "Something went wrong!!",
          "Please try again.",
          [
            { text: "Ok", onPress: () => null }
          ],
          { cancelable: false }
        );
        this.controller.abort()
      }

    } catch (e) {
      this.setState({ loading: false });
      Alert.alert(

        "Something went wrong!!",
        "Please try again.",
        [
          { text: "Ok", onPress: () => null }
        ],
        { cancelable: false }
      );
      this.controller.abort()
    }

  }


  render() {

    const images = [
      {
        uri: this.state.photo,
      },

    ];

    return (

      this.state.error != null ?
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text>{this.state.error}</Text>
          <Button onPress={
            () => {
              this.getData(); this.setState({ disabled: true });
            }
          } disabled={this.state.disabled}>
            <MaterialCommunityIcons name="reload" size={30} style={{ height: 15, width: 15, }} />
          </Button>
        </View> :
        <View style={{ flex: 1 }}>
          <Loader isLoading={this.state.loading} />
          <View style={styles.header}>

            <Button color="white" style={{ marginLeft: width - 30 - 30 }} onPress={() => { this.props.navigation.navigate("UpdateAccountProfileInformation", this.state.data) }} >

              <MaterialCommunityIcons
                name='account-edit'
                size={20}
              />
            </Button>

            <Button color="white" style={{ marginLeft: width - 30 - 30 }} onPress={() => { this.props.navigation.navigate("changePassword", this.state.data) }} >

              <MaterialCommunityIcons
                name='onepassword'
                size={20}
              />
            </Button>

            <Button color="white" style={{ marginLeft: width - 30 - 30 }} onPress={() => this.turnOffNotifications()} >

            {this.state.data.ExpopushToken? <MaterialIcons
                name='notifications-off'
                size={20}
              />:<MaterialIcons
              name='notifications-active'
              size={20}
            />}
            </Button>

            <View style={styles.headerContent}>
              <TouchableOpacity onPress={() => this.setState({ isVisible: true })}>
                <Image
                  source={{ uri: this.state.photo }}
                  style={styles.avatar}
                  onLoad={() => this.setState({ isImageLoaded: true })}
                  onLoadEnd={() => this.setState({ isImageLoaded: false })}
                />
                <ActivityIndicator
                  animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
                />

                <Button color="white" style={{ marginLeft: 90, marginTop: -30, marginBottom: 10 }} onPress={() => this.CameraOptions.open()}>
                  <MaterialIcons
                    name='edit'
                    size={20}
                  /></Button>


                {this.state.isVisible &&

                  <ImageView
                    images={images}
                    imageIndex={0}
                    visible={this.state.isVisible}
                    onRequestClose={() => this.setState({ isVisible: false })}

                  />}

                <Text style={styles.name}>
                  {this.state.ProfileName}</Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.textInfo}>
                Email: {this.state.email}
              </Text>

              <Text style={styles.textInfo}>
                Username: {this.state.username}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            {/* <AdMobBanner bannerSize="banner" adUnitID={'ca-app-pub-1558609691925120/4647645652'}
              servePersonalizedAds={true}
              onDidFailToReceiveAdWithError={this.bannerError}
            /> */}
          </View>


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
  header: {
    backgroundColor: "#0489B1",
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center"
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    alignSelf: "center",
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
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
