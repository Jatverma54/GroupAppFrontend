import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  AsyncStorage,
  Dimensions
} from 'react-native';

import { FloatingAction } from "react-native-floating-action";
import actions from '../../components/FloatingActionsButton';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';
import { SearchBar } from "react-native-elements";
import DialogInput from 'react-native-dialog-input';
import PlaceHolderImage from '../../Pictures/PlaceholderImage.png';
import NoGroups from '../../Pictures/NoGroups.png';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
export default class PublicGroupListScreen extends Component {


  constructor(props) {

    super(props);

    this.state = {
      data: "",
      temp: "",

      isFetching: false,

      loading: false,
      error: null,
      isDialogVisible: false,
      inputText: '',
      itemData: ''
    }
  }


  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({ data: "", temp: "" })
      this.getData(); // do something
    });
  }

  componentWillUnmount() {
    this._unsubscribe;
    this.props.navigation.removeListener('focus', () => {
      //this.setState({data:"",temp:""})
      //this.getData(); // do something
    });
  }

  // componentWillUnmount(){
  //   this.getData();
  // }

  getData = async () => {

    this.setState({ loading: true });

    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;


      var GroupData = {
        GroupCategory_id: this.props.Category._id,
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(GroupData),
      };

      const response = await fetch("http://192.168.0.107:3000/groups/getPublicGroupsWithCategory", requestOptions);
      const json = await response.json();
      //   console.log("Error ",json)
      this.setResult(json.result);

    } catch (e) {

      this.setState({ error: 'Reload the Page', isFetching: false, loading: false });

      //   console.log("Error ",e)
    }




  };


  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      temp: [...this.state.temp, ...res],
      error: res.error || null,
      loading: false,
      isFetching: false
    });
  }





  onRefresh() {
    this.setState({ isFetching: true, data: "", temp: "" }, function () { this.getData() });
  }





  renderGroupMembers = (group) => {

    if (group.members) {
      return (
        <View style={styles.groupMembersContent}>
          {group.members.map((prop, key) => {
            return (
              <Image key={key} style={styles.memberImage} source={{ uri: prop }} />
            );
          })}
        </View>
      );
    }
    return null;
  }

  DeleteJoinRequest = async (data) => {

    try {
      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;


      var GroupRequestData = {
        groupid: data.item._id,

      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(GroupRequestData),
      };

      const response = await fetch("http://192.168.0.107:3000/groups/DeleteSentJoinRequest", requestOptions);

      if (response.ok) {

        data.item.isRequested = !data.item.isRequested;

        const index = this.state.data.findIndex(
          item => data.item._id === item._id
        );


        this.state.data[index] = data.item;

        const index1 = this.state.temp.findIndex(
          item => data.item._id === item._id
        );

        this.state.temp[index1] = data.item;

        this.setState({
          data: this.state.data,
          temp: this.state.temp
        });
      } else {
        Alert.alert(

          "Something went wrong",
          "Please try again",
          [
            { text: "Ok", onPress: () => null }
          ],
          { cancelable: false }
        );
      }
    }
    catch (e) {


      console.log("Error ", e)
    }



  }

  SendJoinRequestPopUp = async (data, inputText) => {

    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;


      var GroupRequestData = {
        groupid: data.item._id,
        GroupName: data.item.GroupName,
        requestMessage: inputText,
        privacy:data.item.privacy,
        GroupCategory_id:data.item.GroupCategory_id
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(GroupRequestData),
      };

      const response = await fetch("http://192.168.0.107:3000/groups/SendJoinRequest", requestOptions);





      if (response.ok) {

        if(data.item.privacy==="Open Group"){
          data.item.isJoined = !data.item.isJoined;
        }else{
          data.item.isRequested = !data.item.isRequested;
        }
       


        const index = this.state.data.findIndex(
          item => data.item._id === item._id
        );


        this.state.data[index] = data.item;


        const index1 = this.state.temp.findIndex(
          item => data.item._id === item._id
        );

        this.state.temp[index1] = data.item;


        this.setState({
          data: this.state.data,
          temp: this.state.temp

        });
      } else {
        Alert.alert(

          "Something went wrong",
          "Please try again",
          [
            { text: "Ok", onPress: () => null }
          ],
          { cancelable: false }
        );
      }
    }
    catch (e) {


      console.log("Error ", e)
    }


    //console.log(this.state.data,"Ccccccccccccccccccccccc")

  }



  renderHeader = () => {
    return <SearchBar
      // height: 0.5,
      // backgroundColor: "#CCCCCC",
      // width:"78%",
      // marginLeft:80

      placeholder="Type a group name.."
      lightTheme round editable={true}
      // containerStyle={{height:35,paddingBottom:40,}}
      containerStyle={{
        borderBottomColor: "#CCCCCC",
        borderBottomWidth: 0.5,
        borderBottomStartRadius: 170,
        borderBottomEndRadius: 40,
      }}
      platform="android"
      inputStyle={{ color: "black" }}
      value={this.state.search}


      onChangeText={this.updateSearch} />;
  };

  updateSearch = search => {
    this.setState({ search }, () => {
      if ('' == search) {


        this.setState({
          data: [...this.state.temp],

        });
        return;
      }

      this.setState({

        searchStarted: true


      })

      this.state.data = this.state.temp.filter(function (item) {
        return item.GroupName.includes(search);
      }).map(function ({ _id, GroupName, image, countMembers, isJoined, isRequested, GroupCategory }) {
        return { _id, GroupName, image, countMembers, isJoined, isRequested, GroupCategory };
      });
    });


    this.setState({

      searchStarted: false


    })
  };




  showDialog(isShow, item) {
    this.setState({ isDialogVisible: isShow, itemData: item });
  }

  sendInput(inputText) {

    this.showDialog(false)
    this.SendJoinRequestPopUp(this.state.itemData, inputText)
  }









  render() {

    if (this.state.loading) {
      return (
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff"
        }}>
          <ActivityIndicator size="large" color="black" />
          <Text style={{ marginLeft: width - 100 - 20, fontWeight: "bold", width: "100%", justifyContent: "center", alignItems: "center" }}>Loading..Please wait.</Text>
        </View>
      );
    }


    return (
      this.state.error != null ?
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text>{this.state.error}</Text>
          <Button onPress={
            () => {
              this.getData();
            }
          }  >
            <MaterialCommunityIcons name="reload" size={30} style={{ height: 15, width: 15, }} />
          </Button>
        </View> :
        <View style={styles.FloatButtonPlacement} >


          <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Why do you want to be a group member"}
            message={"Let admin know the reason"}
            hintInput={"Please Type here.."}

            submitInput={(inputText) => { this.sendInput(inputText) }}
            closeDialog={() => { this.showDialog(false) }}>
          </DialogInput>


          <FlatList
            style={styles.root}
            data={this.state.data}
            extraData={this.state}
            ListHeaderComponent={this.renderHeader}
            refreshControl={
              <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
            }

            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator} />
              )
            }}
            keyExtractor={(item) => {
              return item._id;
            }}

            renderItem={(item) => {
              const Group = item.item;
              let mainContentStyle;
              if (Group.attachment) {
                mainContentStyle = styles.mainContent;
              } //uri:Group.image
              return (

                <View style={styles.container}>

                  <TouchableOpacity onPress={() => this.props.myHookValue.navigate("PublicGroupBio", { groupInformation: Group })}>
                    <Image source={Group.image ? { uri: Group.image } : PlaceHolderImage} style={styles.avatar} />
                  </TouchableOpacity>
                  <View style={styles.content}>
                    <View style={mainContentStyle}>
                      <View style={styles.text}>
                        <TouchableOpacity onPress={() => Group.isJoined ? this.props.myHookValue.navigate("JoinedGroupInsideGroup", Group) : this.props.myHookValue.navigate("PublicGroupBio", Group)}>
                          <Text style={styles.groupName}>{Group.GroupName}</Text>
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.countMembers}>
                        {Group.countMembers} members
                  </Text>

                      <View style={styles.ButtonContainer}>
                        <View style={styles.button}>

                          {Group.isJoined ?
                            <Button title="Joined" />

                            : (Group.isRequested) ?
                              <Button title="Requested" color="grey" onPress={() => this.DeleteJoinRequest(item)} />

                              : <Button title="Join Group" color={colors.ExploreGroupsLoginButtonColor} onPress={() => this.showDialog(true, item)} />
                          }

                        </View>
                      </View>
                    </View>

                  </View>

                </View>

              );
            }} />
          {this.state.data.length === 0 &&
            <View style={{ flex: 1 }}>
              <Image source={NoGroups} style={{
                alignSelf: "center", alignItems: "center", width: 53,
                height: 53,
                borderRadius: 25,
              }} />
              <Text style={{ marginLeft: 170, color: "grey", fontWeight: "bold" }}>No Groups</Text>
            </View>}
          <FloatingActionButton />
        </View>



    );
  }
};

const FloatingActionButton = () => {
  const navigation = useNavigation();
  return (
    <FloatingAction
      actions={actions}
      onPressItem={name => {
        navigation.push('Create a Public Group');
        //  console.log(`selected button: ${name}`);
      }} />
  )
}



const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 13,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width: 53,
    height: 53,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
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
  separator: {
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width: "78%",
    marginLeft: 80

  },

  countMembers: {
    color: "#20B2AA"
  },
  timeAgo: {
    marginRight: -70,
    fontSize: 12,
    color: "#696969"
  },
  groupName: {
    fontSize: 19,
    color: "#1E90FF"
  },
  groupMembersContent: {
    flexDirection: 'row',
    marginTop: 10
  },
  FloatButtonPlacement: {
    flex: 1,
    backgroundColor: "white"
  },
  button: {
    //flexDirection:'row',
    width: "50%",
    fontWeight: "bold",
    // justifyContent: 'center',
    //alignItems: 'center',
  },
  ButtonContainer: {
    flex: 2,
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    //paddingTop: 10,
    marginVertical: 10,
    // marginRight: -40
  },
});   