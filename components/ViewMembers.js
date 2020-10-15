import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { SearchBar } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  Button,
} from 'react-native-paper';

import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Loader from '../components/Loader';
const { width, height } = Dimensions.get('window');
FAIcon.loadFont();
MDIcon.loadFont();

export default class ViewMembers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      temp: "",
      error: null,
      search: null,
      Role: '',
      searchStarted: "false",
      AdminTab: '',
      isFetching: false,
      loading: false,
      error: null,
      userId: '',
    };
  }


  getData = async () => {

    this.setState({ loading: true,data:'', temp: "", });

    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      this.setState({ userId });

      var GroupData = {
        groupid: this.props.route.params.Group._id,
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(GroupData),
      };

      const response = await fetch("http://192.168.0.102:3000/groups/ViewGroupMembers", requestOptions);
      const json = await response.json();
      //  console.log("Error ",json)
      this.setResult(json.result);

    } catch (e) {

      this.setState({ error: 'Reload the Page', isFetching: false, loading: false });
      console.log("Error ", e)
    }




  };


  componentDidMount() {
    this._unsubscribe = this.getData();
  }

  componentWillUnmount() {
    this._unsubscribe;

  }

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



  delete(item) {

    if (this.props.route.params.Group.owner_id.includes(item._id)) {

      alert("Group owner cannot be deleted from the group");

    }
    else {
      Alert.alert(
        "",
        "Do you want to remove " + item.profile.full_name + " from the group",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => this.deletearray(item) }
        ],
        { cancelable: false }
      );
    };


  }

  deletearray = async (item) => {
    try {
      this.AdminOptions.close();
      this.setState({ loading: true,data:'' });
      //console.log(item.id, "first ")
      var isAdmin = item.admin_id.includes(item._id) ? true : false;


      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      //myHeaders.append("Authorization", 'Basic ' + encode(userName + ":" + password));
      var RemoveUser = {
        "groupid": this.props.route.params.Group._id,
        "userId": item._id,
        "isAdmin": isAdmin
      }

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(RemoveUser)

      };

      const response = await fetch("http://192.168.0.102:3000/groups/AdmindeleteUserfromtheGroup", requestOptions);


      if (response.ok) {
        this.setState({ loading: false });
        this.setState({ search: '' }); this.setState({ data: '', temp: '' });
        Alert.alert(

          "User Removed",
          item.profile.full_name + " removed from the group",
          [
            { text: "Ok", onPress: () => this.getData() }
          ],
          { cancelable: false }
        );

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

        //  console.log(responseJson);
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
    }

    //  console.log(this.state.data,"updated")
    // console.log(this.state.internal,"updated")
  }

  //   deleteFromFrontEnd(item){

  //    try{ 
  //     const index = this.state.temp.findIndex(
  //       items => item._id === items._id
  //     );

  // let newArrayDeleted = (this.state.searchStarted===true)?[]:this.state.data.filter((x,i) => i != index);

  //      this.setState({

  //       data:newArrayDeleted,
  //       temp:this.state.temp.filter((x,i) => i != index),  
  //     })

  //   {(this.state.searchStarted===true)?null:this.AdminOptions.close()}

  //   }catch(e){
  //     this.AdminOptions.close()

  //     Alert.alert(
  //       "Something went wrong!!",
  //       "Please Reload",
  //       [
  //         { text: "Ok", onPress: () =>  null}
  //       ],
  //       { cancelable: false }
  //     );    
  //   }
  //   }

  dismissAsAdminData = async (item) => {

    try {
      this.AdminOptions.close();
      this.setState({ loading: true,data:'' });
      //console.log(item.id, "first ")

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      //myHeaders.append("Authorization", 'Basic ' + encode(userName + ":" + password));
      var RemoveUser = {
        "groupid": this.props.route.params.Group._id,
        "userId": item._id,
      }

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(RemoveUser)

      };

      const response = await fetch("http://192.168.0.102:3000/groups/DismissUserAsAdmin", requestOptions);


      if (response.ok) {
        this.setState({ loading: false });
        this.setState({ search: '' });
        this.setState({ data: '', temp: '' });
        Alert.alert(
          "Dismiss admin",
          item.profile.full_name + " dismissed as admin",
          [
            { text: "Ok", onPress: () => this.getData() }
          ],
          { cancelable: false }
        );

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

        //  console.log(responseJson);
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
    }
  }

  makeAdmin(item) {

    Alert.alert(
      "",
      "Do you want to make " + item.profile.full_name + " admin",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.makeadminDBchanges(item) }
      ],
      { cancelable: false }
    );
  };

  makeadminDBchanges = async (item) => {

    try {
      this.AdminOptions.close();
      this.setState({ loading: true,data:'' });
      //console.log(item.id, "first ")

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      //myHeaders.append("Authorization", 'Basic ' + encode(userName + ":" + password));
      var RemoveUser = {
        "groupid": this.props.route.params.Group._id,
        "userId": item._id,
      }

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(RemoveUser)

      };

      const response = await fetch("http://192.168.0.102:3000/groups/MakeUserAsAdmin", requestOptions);


      if (response.ok) {

        this.setState({ loading: false });
        this.setState({ search: '' });
        this.setState({ data: '', temp: '' });

        Alert.alert(
          "Admin appointed",
          item.profile.full_name + " appointed as admin",
          [
            { text: "Ok", onPress: () => this.getData() }
          ],
          { cancelable: false }
        );

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

        //  console.log(responseJson);
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
    }
  }

  dismissAsAdmin(item) {

    if (this.props.route.params.Group.owner_id.includes(item._id)) {

      alert("Group owner cannot be dismissed as Admin");

    }
    else {
      Alert.alert(
        "",
        "Do you want to dismiss " + item.profile.full_name + " as group admin",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => this.dismissAsAdminData(item) }
        ],
        { cancelable: false }
      );
    };


  }



  renderItem = ({ item }) => {
    const { userId } = this.state

    return (

      <View style={styles.row}>
        <TouchableOpacity style={styles.TouchableOpacityStyle} onPress={() => { this.AdminOptions.open(); this.setState({ Role: item.admin_id.includes(userId) ? "admin" : "user", AdminTab: item }) }}>
          <Image source={{ uri: item.profile.profile_pic }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.profile.full_name}</Text>



            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.username}</Text>
            </View>

            {(item.admin_id.includes(item._id)) && <View style={{ marginTop: -20, marginLeft: width - 100 }}>
              {/* <FontAwesome name="user-secret" size={15} style={{

                color: "#666",

              }} /> */}
              <Text>Admin</Text>
            </View>}

            {/* {(this.state.Role.includes("admin")) &&  
            <View style={{flex:1, marginLeft:300}}>
            <TouchableOpacity onPress={()=>this.delete(item)}>  

             {/* <Button color="black" style={{height:15,width:10,marginRight:30}}>Admin Tab</Button> */}
            {/* <Image style={{height:15,width:10}} source={deleteButton}/>  */}

            {/* </TouchableOpacity>
            
            </View>
         
            
            
            }  */}

          </View>
        </TouchableOpacity>





        <RBSheet
          ref={ref => {
            this.AdminOptions = ref;
          }}
          height={330}

        >
          <View style={styles.listContainerNewPost}>
            <Text style={styles.listTitleNewPost}>Admin Options</Text>

            {(this.state.Role.includes("admin")) ?
              <View>
                {(!this.state.AdminTab.admin_id.includes(this.state.AdminTab._id) || this.props.route.params.Group.owner_id.includes(userId)) ? <TouchableOpacity

                  style={styles.listButtonNewPost}
                  onPress={() => this.delete(this.state.AdminTab)}
                >
                  <MDIcon name="delete" style={styles.listIconNewPost} />
                  <Text style={styles.listLabelNewPost}>Remove user from the group</Text>
                </TouchableOpacity> : <Text style={styles.listLabelNewPost}>Group owner can only remove the admin from the group</Text>}


                {(this.props.route.params.Group.owner_id.includes(userId) && (!this.state.AdminTab.admin_id.includes(this.state.AdminTab._id))) && <TouchableOpacity

                  style={styles.listButtonNewPost}
                  onPress={() => this.makeAdmin(this.state.AdminTab)}
                >
                  <FontAwesome name="user-secret" style={styles.listIconNewPost} />
                  <Text style={styles.listLabelNewPost}>Make the user Admin</Text>
                </TouchableOpacity>}


                {(this.props.route.params.Group.owner_id.includes(userId) && (this.state.AdminTab.admin_id.includes(this.state.AdminTab._id))) && <TouchableOpacity

                  style={styles.listButtonNewPost}
                  onPress={() => this.dismissAsAdmin(this.state.AdminTab)}
                >
                  <FontAwesome name="remove" style={styles.listIconNewPost} />
                  <Text style={styles.listLabelNewPost}>Dismiss user as Admin</Text>
                </TouchableOpacity>}
              </View>

              : <Text style={styles.listTitleNewPost}>You need to be Admin to view Admin Options</Text>}





          </View>
        </RBSheet>


      </View>

    );
  }





  renderHeader = () => {
    return <SearchBar

      placeholder="Type a name or username"
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
      platform="android"
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

        return item.profile.full_name.includes(search) || item.username.includes(search);
      }).map(function ({ _id, profile: full_name, profile: profile_pic, username,admin_id }) {

        return { _id, profile: full_name, profile: profile_pic, username,admin_id };
      });
    });

    this.setState({

      searchStarted: false


    })
  };





  FlatListItemSeparator = () => <View style={styles.separator} />;

  render() {
    // console.log(this.props.route.params.Group)
   

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
        <View style={{ flex: 1, backgroundColor: 'white', }} >
 <Loader isLoading={this.state.loading} />
          <FlatList
            ListHeaderComponent={this.renderHeader}
            extraData={this.state}
            data={this.state.data}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            keyExtractor={(item) => {
              return item._id;
            }}
            refreshControl={
              <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
            }

            renderItem={this.renderItem} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    //borderColor: '#DCDCDC',
    backgroundColor: 'white',
    // borderBottomWidth: 1,
    padding: 10,

  },
  TouchableOpacityStyle: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'white',


  },
  pic: {
    borderRadius: 30,
    width: 45,
    height: 45,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,


  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
    width: "100%"
  },




  listContainerNewPost: {
    flex: 1,
    padding: 25
  },
  listTitleNewPost: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
    fontWeight: "bold"
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
    marginLeft: -22

  },
  listLabelNewPost: {
    fontSize: 16
  },
  listLabelVideoNewPost: {
    fontSize: 16,
    marginLeft: 33
  },
  separator: {
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width: "78%",
    marginLeft: 60

  },

}); 