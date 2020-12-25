import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  AsyncStorage
} from 'react-native';
import AddGroup from '../../Pictures/AddGroup.png';
import Group_Name from '../../Pictures/Group_Name.png';
import {
  Button,
} from 'react-native-paper';
import ImageView from "react-native-image-viewing";
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import Loader from '../../components/Loader';
import APIBaseUrl from '../../constants/APIBaseUrl';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import moment from "moment";
FAIcon.loadFont();
MDIcon.loadFont();
const { width } = Dimensions.get('window');
export default class PersonalGroupBio extends Component {
  controller = new AbortController();
  constructor(props) {

    super(props);

    this.state = {
      data: this.props.GroupName,

      isVisible: false,
      loading: false,
      error: null,


    }
  }


  componentDidMount() {
    this.getPermissionAsync();
    this.getCameraPermissionAsync();

  }


  getuser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const transformedData = JSON.parse(userData);
    return transformedData;


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
        base64: true,
        quality: 1,
      });

      this.CameraOptions.close();
      if (!result.cancelled) {

        this.setState({ loading: true, });
        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var UpdateImage = {
          "groupid": this.state.data._id,
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

        const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/updateGroupimage`, requestOptions, { signal: this.controller.signal });

        if (response.ok) {
          this.setState({ loading: false });
          this.state.data.image = `data:image/jpg;base64,${result.base64}`;
          let Data = this.state.data;

          this.setState({ data: Data });
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

    } catch (e) {

      this.setState({ loading: false });
      this.controller.abort()
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


        this.setState({ loading: true });
        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var UpdateImage = {
          "groupid": this.state.data._id,
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

        const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/updateGroupimage`, requestOptions, { signal: this.controller.signal });


        if (response.ok) {
          this.setState({ loading: false });
          this.state.data.image = `data:image/jpg;base64,${result.base64}`;
          let Data = this.state.data;

          this.setState({ data: Data });
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


  addMemberorShare = () => {

    return (

      <View style={{ flex: 1 }} >
        <View>

          <TouchableOpacity style={styles.buttonContainerInviteMember} onPress={() => { this.props.navigation.navigate("ViewMembers", { Group: this.props.GroupName }) }}>
            <View>
              <View style={styles.bodyContentInviteMember}  >
                <Text style={{ fontWeight: "bold", width: "100%", alignSelf: "center", marginLeft: 40, marginTop: 11 }}>View Members</Text>
              </View>
              <View>

                <Image
                  style={{ marginHorizontal: 5, height: 30, width: 35, marginLeft: width / 2 - 30 - 20, marginTop: -40 }}
                  source={Group_Name} />

              </View>
            </View>
          </TouchableOpacity>

          <View>

            <TouchableOpacity style={styles.buttonContainerShare} onPress={() => this.AddMembers()}>
              <View>
                <View style={styles.bodyContentShare}  >
                  <Text style={{ fontWeight: "bold", width: "100%", alignSelf: "center", marginLeft: 40, marginTop: 11 }}>Add Members</Text>
                </View>
                <View>

                  <Image
                    style={{ marginHorizontal: 5, height: 30, width: 35, marginLeft: width / 2 - 30 - 20, marginTop: -40 }}
                    source={AddGroup} />

                </View>
              </View>
            </TouchableOpacity>

          </View>

        </View>

      </View>


    );


  }





  DeleteGroup(item) {

    Alert.alert(
      "",
      "Do you want to delete " + item + " group",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.deleteGroupfromDb(item) }
      ],
      { cancelable: false }
    );

  }



  deleteGroupfromDb = async (item) => {
    try {

      const {
        _id,

      } = this.state.data;
      this.setState({ loading: true });
      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,


      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/` + _id, requestOptions,
        { signal: this.controller.signal }


      );


      if (response.ok) {
        this.setState({ loading: false });

        Alert.alert(

          "We will miss you!!",
          item + " group deleted successfully",
          [
            { text: "Ok", onPress: () => this.props.navigation.navigate('PersonalGroupsScreen') }
          ],
          { cancelable: false }
        );
        this.controller.abort()
      }
      else {

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

    } catch (err) {
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




  leaveGroup(item) {

    Alert.alert(
      "",
      "Do you want to leave " + item + " group",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.LeaveGroupfromDb(item) }
      ],
      { cancelable: false }
    );

  }


  LeaveGroupfromDb = async (item) => {
    try {

      const { image,
        _id,
        GroupName,
        countMembers,
        privacy,
        group_Bio,
        GroupCategory,
        GroupAdminName,
        currentUser,
        admin_id,
        owner_id
      } = this.state.data;

      this.setState({ loading: true });

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var isAdmin = (admin_id.find(id => id._id === userId)) ? true : false;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var RemoveUser = {
        "groupid": _id,
        "userId": userId,
        "isAdmin": isAdmin
      }

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(RemoveUser)

      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/leaveGroup`, requestOptions, { signal: this.controller.signal });


      if (response.ok) {
        this.setState({ loading: false });

        Alert.alert(

          "User Removed",
          "You left the " + item + " group",
          [
            { text: "Ok", onPress: () => this.props.navigation.navigate('PersonalGroupsScreen') }
          ],
          { cancelable: false }
        );
        this.controller.abort()
      }
      else {
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

    } catch (e) {
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



  AddMembers() {

    if (this.state.data.admin_id.find(id => id._id === this.state.data.currentUser)) {
      this.props.myHookValue.push("AddMembers", this.state.data._id);

    }
    else {

      Alert.alert(
        "",
        "You need to be admin to add members to the group",
        [
          {
            text: "Ok",
            onPress: () => null,
            style: "cancel"
          },

        ],
        { cancelable: false }
      );

    }


  }





  render() {



    const { image,
      _id,
      GroupName,
      countMembers,
      privacy,
      group_Bio,
      GroupCategory,
      GroupAdminName,
      currentUser,
      admin_id,
      owner_id,
      createdAt
    } = this.state.data;


    const images = [
      {
        uri: image,
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
          } disabled={this.state.disabled} >
            <MaterialCommunityIcons name="reload" size={30} style={{ height: 15, width: 15, }} />
          </Button>
        </View> :
        <View style={styles.container}>
          <Loader isLoading={this.state.loading} />

          <ScrollView >

            <View>
              <View style={styles.header}>
                {(owner_id.includes(currentUser)) ? <Button color="black" style={styles.groupMembersContent} onPress={() => this.DeleteGroup(GroupName)} >Delete Group</Button> :
                  <Button color="black" style={styles.groupMembersContent} onPress={() => this.leaveGroup(GroupName)} >Leave Group</Button>}

                {(admin_id.find(id => id._id === currentUser)) && <Button color="white" style={{ marginLeft: width - 30 - 30, marginTop: -20 }} onPress={() => { this.props.myHookValue.navigate("UpdatePersonalGroupAccountInfoScreen", this.state.data) }} >

                  <MaterialCommunityIcons
                    name='account-edit'
                    size={20}
                  />
                </Button>}
                <View style={styles.headerContent}>


                  <TouchableOpacity onPress={() => this.setState({ isVisible: true })}>
                    <Image style={styles.avatar} source={{ uri: image }} />

                  </TouchableOpacity>


                  {(admin_id.find(id => id._id === currentUser)) && <Button color="white" style={{ marginLeft: 120, marginTop: -30, marginBottom: 10 }} onPress={() => this.CameraOptions.open()}>
                    <MaterialIcons
                      name='edit'
                      size={20}
                    /></Button>}





                  {this.state.isVisible &&

                    <ImageView
                      images={images}
                      imageIndex={0}
                      visible={this.state.isVisible}
                      onRequestClose={() => this.setState({ isVisible: false })}

                    />}
                  <Text style={styles.name}>
                    {GroupName}
                  </Text>
                  <Text style={styles.CountMember}>
                    Members: {countMembers}
                  </Text>


                  <Text style={styles.GroupAdminName}>
                    Group Admin:  {admin_id.map((prop, key) => {
                    return (
                      prop.profile.full_name
                    );
                  }).join(" , ")}
                  </Text>

                  <Text style={styles.GroupAdminName}>Created {moment(createdAt).fromNow()}</Text>

                </View>


              </View>
              {this.addMemberorShare()}

              <View style={styles.body}>
                <View style={styles.bodyContent}>

                  <Text style={styles.description}>{group_Bio}</Text>

                </View>
              </View>

            </View>



          </ScrollView>



          <RBSheet
            ref={ref => {
              this.CameraOptions = ref;
            }}
            height={330}
          >
            <View style={styles.listContainer}>
              <Text style={styles.listTitle}>Change Group Avatar</Text>

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
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
    width: "100%",
    alignSelf: 'center',
    marginBottom: 5
  },
  GroupAdminName: {
    fontSize: 15,
    color: "#FFFFFF",
    marginLeft: 5,
    width: "100%",
    alignSelf: 'center',
    marginTop: 5
  },

  CountMember: {
    fontSize: 15,
    color: "#FFFFFF",
    marginLeft: 5,
    width: "100%",
    alignSelf: 'center',
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 250,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: "#ffffff"
  },
  detailContent: {
    margin: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: "#00CED1"
  },
  count: {
    fontSize: 18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    marginTop: 0
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00CED1",
  },
  description: {
    fontSize: 20,
    color: "#00CED1",
    marginTop: 10,
    textAlign: 'center'
  },
  groupMembersContent: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: -20
  },
  mainContent: {
    marginRight: 60
  },
  memberImage: {
    height: 30,
    width: 30,
    marginRight: 4,
    borderRadius: 10,

  },
  bodyContentInviteMember: {
    flex: 2,
    alignItems: 'center',
  },
  buttonContainerInviteMember: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
    width: "50%",
    borderRadius: 30,
    backgroundColor: "#0489B1",
  },


  bodyContentShare: {
    flex: 2,
    alignItems: 'center',

  },
  buttonContainerShare: {
    marginTop: -55,
    height: 45,
    marginLeft: width / 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
    width: "50%",
    borderRadius: 30,
    backgroundColor: "#0489B1",
  },

  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    marginLeft: 10,
    color: "#666",
    fontWeight: "bold",
    marginTop: 10
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginLeft: 10,
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
