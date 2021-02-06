import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  BackHandler,
  Alert,
  InteractionManager 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Button,
} from 'react-native-paper';
import { FloatingAction } from "react-native-floating-action";
import actions from '../../components/FloatingActionButtonPersonal';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from "react-native-elements";
import NoGroups from '../../Pictures/NoGroups.png';
import moment from "moment";
import Loader from '../../components/Loader';
import APIBaseUrl from '../../constants/APIBaseUrl';
import {
  AdMobBanner,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
setTestDeviceIDAsync('EMULATOR')


export default class PersonalGroupsScreen extends Component {

  controller = new AbortController();
  constructor(props) {

    super(props);
    this.state = {
      data: "",
      temp: "",
      isFetching: false,
      loading: false,
      error: null,
      search: "",
      searchStarted: false,
      isImageLoaded: true,
      disabled: false
    }
  }
  cleanup = null;

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
    let unsubscribe1 = this.getData();
    this.cleanup = () => { unsubscribe1; }
  });
  }
  backAction = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert("See You Later!", "Do you want to exit from App", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    } else {
      false;
    }
  };

  componentWillUnmount() {
    this.state;

    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    if (this.cleanup) this.cleanup();
    this.cleanup = null;
  }

  bannerError = (error) => {

  }

  getData = async () => {

    this.setState({ loading: true, data: "", temp: "" });

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

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/getJoinedPrivateGroups`, requestOptions, { signal: this.controller.signal });
      const json = await response.json();

      this.setResult(json.result);
      this.controller.abort()
    } catch (e) {

      this.setState({ error: 'Reload the Page', disabled: false, isFetching: false, loading: false });
      this.controller.abort()

    }
  };






  setResult = (res) => {

    this.setState({
      data: [...this.state.data, ...res],
      temp: [...this.state.temp, ...res],
      error: res.error || null,
      loading: false, disabled: false,
      isFetching: false
    });
  }

  onRefresh() {
    this.setState({ isFetching: true, data: "", temp: "" }, function () { this.getData() });
  }

  renderHeader = () => {
    return <SearchBar
      placeholder="Type a group name.."
      lightTheme round editable={true}
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
      }).map(function ({ _id, GroupName, image, countMembers, GroupAdminName, GroupCategory_id, LastUpdated, admin_id, createdAt, currentUser, groupCreateddate, group_Bio, group_type, owner_id, post, updatedAt }) {
        return { _id, GroupName, image, countMembers, GroupAdminName, GroupCategory_id, LastUpdated, admin_id, createdAt, currentUser, groupCreateddate, group_Bio, group_type, owner_id, post, updatedAt };
      });
    });

    this.setState({

      searchStarted: false


    })
  };


  render() {




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
        <View style={styles.FloatButtonPlacement} >
          <Loader isLoading={this.state.loading} />
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
              }


              return (

                <View style={styles.container}>

                  <TouchableOpacity onPress={() => this.props.myHookValue.navigate("PersonalGroupBio", Group)}>
                    <Image source={{ uri: Group.image }}
                      style={styles.avatar}
                      onLoad={() => this.setState({ isImageLoaded: true })}
                      onLoadEnd={() => this.setState({ isImageLoaded: false })}
                    />
                    <ActivityIndicator
                      animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.props.myHookValue.navigate("PersonalGroupFeed", Group)}>
                    <View style={styles.content}>
                      <View style={mainContentStyle}>
                        <View style={styles.text}>
                          <Text style={styles.groupName}>{Group.GroupName}</Text>
                        </View>
                        <Text style={styles.countMembers}>
                          {Group.countMembers} {(parseInt(Group.countMembers) > 1) ? "members" : "member"}
                        </Text>
                        <Text style={styles.timeAgo}>
                          Last updated {moment(Group.LastUpdated).fromNow()}
                        </Text>

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
              <Text style={{ alignSelf: "center", fontSize: 15, color: "grey", fontWeight: "bold" }}>Press below plus icon to create your first personal group.     </Text>
              <Text style={{ alignSelf: "center", fontSize: 15, color: "grey", fontWeight: "bold" }}>Personal groups will be visible to members only.         </Text>
            </View>}
          <AdMobBanner style={{ backgroundColor: "white" }} bannerSize="fullbanner" adUnitID={'ca-app-pub-3940256099942544/6300978111'}
            servePersonalizedAds={true}
            onDidFailToReceiveAdWithError={this.bannerError}
          />
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
        navigation.push('CreateaPersonalGroup');

      }} />
  )
}


const styles = StyleSheet.create({

  roots: {
    flex: 1
  },
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 13,
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
    flexWrap: 'wrap',

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
    color: "#1E90FF",

  },
  groupMembersContent: {
    flexDirection: 'row',
    marginTop: 10
  },
  FloatButtonPlacement: {
    flex: 1,

  },
});   