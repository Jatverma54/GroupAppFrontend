import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  RefreshControl,
  ActivityIndicator,
  AsyncStorage,
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Button,
} from 'react-native-paper';
import UserToken from '../../constants/APIPasswordCollection';
import NoGroups from '../../Pictures/NoGroups.png';
import moment from "moment";
const { width, height } = Dimensions.get('window');
import Loader from '../../components/Loader';

export default class JoinedPublicGroupsScreen extends Component {


  constructor(props) {


    super(props);

    this.state = {
      data: "",
      isFetching: false,
      loading: false,
      error: null,
    }


  }


  getData = async () => {

    this.setState({ loading: true,data:'' });

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

      const response = await fetch("http://192.168.0.107:3000/groups/getJoinedPublicGroups", requestOptions);
      const json = await response.json();
      //  console.log("Error ",json)
      this.setResult(json.result);

    } catch (e) {
      // console.log("Error ",e)
      this.setState({ error: 'Reload the Page', isFetching: false, loading: false });
      //   console.log("Error ",e)
    }
  };


  componentDidMount() {

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({ data: "" })
      this.getData(); // do something
    });

  }
  componentWillUnmount() {
    this._unsubscribe;
    this.props.navigation.removeListener('focus', () => {
      // this.setState({data:""})
      // this.getData(); // do something
    });
  }




  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      error: res.error || null,
      loading: false,
      isFetching: false
    });
  }

  onRefresh() {
    this.setState({ isFetching: true, data: "" }, function () { this.getData() });
  }

  // renderGroupMembers = (group) => {

  //   if(group.members) {
  //     return (
  //       <View style={styles.groupMembersContent}>
  //         {group.members.map((prop, key) => {
  //           return (
  //             <Image key={key} style={styles.memberImage}  source={{uri:prop}}/>
  //           );
  //         })}
  //       </View>
  //     );
  //   }
  //   return null;
  // }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }


  render() {


   


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
 <Loader isLoading={this.state.loading} />


          <SectionList
            style={styles.root}
            sections={this.state.data}
            data={this.state.data}
            extraData={this.state}
            refreshControl={
              <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
            }

            renderSectionHeader={({ section }) => {
              return (
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>
                    {section.GroupCategory}
                  </Text>
                </View>
              )
            }}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator} />
              )
            }}
            keyExtractor={(item) => {
              return item.groupObject._id;
            }}
            renderItem={(item) => {
              const Group = item.item.groupObject;

              let mainContentStyle;
              if (Group.attachment) {
                mainContentStyle = styles.mainContent;
              }
              return (

                <View style={styles.container}>
                  <TouchableOpacity onPress={() => this.props.myHookValue.navigate("JoinedPublicGroupBio", Group)}>
                    <Image source={{ uri: Group.image }} style={styles.avatar} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.props.myHookValue.navigate("JoinedGroupInsideGroup", Group)}>
                    <View style={styles.content}>
                      <View style={mainContentStyle}>
                        <View style={styles.text}>
                          <Text style={styles.groupName}>{Group.GroupName}</Text>
                        </View>
                        <Text style={styles.countMembers}>
                          {Group.countMembers} {(parseInt(Group.countMembers) > 1) ? "members" : "member"}
                        </Text>
                        <Text style={styles.timeAgo}>
                          {/* { this.formatDate(Group.groupCreateddate)} */}
                  Last updated {moment(Group.LastUpdated).fromNow()}
                        </Text>
                        {/* {this.renderGroupMembers(Group)} */}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

              );
            }} />

          {this.state.data.length === 0 &&
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <Image source={NoGroups} style={{
                alignSelf: "center", alignItems: "center", width: 53,
                height: 53,
                borderRadius: 25,
              }} />
              <Text style={{ marginLeft: 45, fontSize: 15, color: "grey", fontWeight: "bold" }}>Please join your first group.{'\n'}You will see all the public groups that you have joined here.</Text>
            </View>}
        </View>



    );
  }
};






const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start',
    width: "90%"
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
    fontSize: 12,
    color: "#696969"
  },
  groupName: {
    fontSize: 19,
    color: "#1E90FF",
  },
  groupMembersContent: {
    flexDirection: 'row',
    marginTop: 10
  },
  FloatButtonPlacement: {
    flex: 1,

  },
  titleContainer: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    // marginVertical:2,
    backgroundColor: "#DCDCDC",
    padding: 5,

  },
  title: {
    fontSize: 20,

    color: "#686E70",
    marginLeft: 7

  },
});   