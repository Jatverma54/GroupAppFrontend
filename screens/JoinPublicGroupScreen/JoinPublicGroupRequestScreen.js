import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  FlatList,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
  Alert
} from 'react-native';
import {
  Button
} from 'react-native-paper';
import ViewMoreText from 'react-native-view-more-text';
import NoGroups from '../../Pictures/NoGroups.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
import Loader from '../../components/Loader';
import APIBaseUrl from '../../constants/APIBaseUrl';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
setTestDeviceIDAsync('EMULATOR')

export default class JoinPublicGroupRequestScreen extends Component {
  controller = new AbortController();
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      loading: false,
      error: null,

      isFetching: false,

      errorPagination: null,
      skipPagination: 1,
      loadingPagination: false,
      disabled: false

    }
  }
  cleanup = null;

  componentDidMount() {

    let unsubscribe1;
    let unsubscribe2;
    if (this.props.route.params.groupid.admin_id.find(a => a._id === this.props.route.params.groupid.currentUser)) {
      unsubscribe1 = this.setState({ data: "" })
      unsubscribe2 = this.getData(); // do something
    }

    this.cleanup = () => { unsubscribe1; unsubscribe2; }

  }

  componentWillUnmount() {

    if (this.cleanup) this.cleanup();
    this.cleanup = null;
  }

  getData = async () => {


    this.setState({ loading: true, data: '', skipPagination: 1 });

    try {
      if (this.props.route.params.groupid.admin_id.find(a => a._id === this.props.route.params.groupid.currentUser)) {

        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var GroupData = {
          groupId: this.props.route.params.groupid._id,
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(GroupData),
        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/getAllGroupRequest?page_size=7&page_number=` + this.state.skipPagination, requestOptions, { signal: this.controller.signal });
        const json = await response.json();
        this.setResult(json.result);
        if (this.state.data.length !== 0) {

          this.props.navigation.setOptions({
            tabBarLabel: (parseInt(this.state.data.length) > 1) ? this.state.data.length + " Group Requests" : this.state.data.length + " Group Request"
          })
        } else {
          this.props.navigation.setOptions({
            tabBarLabel: 'Group Requests'
          })
        }
        this.controller.abort()
      }
    } catch (e) {

      this.setState({ error: 'Reload the Page', disabled: false, isFetching: false, loading: false });


      this.controller.abort()

    }




  };

  getPaginationData = async () => {


    this.setState({ loadingPagination: true });

    try {
      if (this.props.route.params.groupid.admin_id.find(a => a._id === this.props.route.params.groupid.currentUser)) {

        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var GroupData = {
          groupId: this.props.route.params.groupid._id,
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(GroupData),
        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/getAllGroupRequest?page_size=7&page_number=` + this.state.skipPagination, requestOptions, { signal: this.controller.signal });
        const json = await response.json();

        this.setResult(json.result);

        this.controller.abort()


      }
    } catch (e) {
      this.setState({ errorPagination: 'Reload', disabled: false, isFetching: false, loading: false });



      this.controller.abort()

    }




  };


  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      error: res.error || null,
      loading: false,
      isFetching: false, disabled: false,
      loadingPagination: false
    });
  }

  loadmoreData() {

    this.setState({ skipPagination: parseInt(this.state.skipPagination) + 1, loadingPagination: true }, () => { this.getPaginationData() })
  }

  FooterComponent() {
    return (

      this.state.errorPagination != null ?
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text>{this.state.error}</Text>
          <Button onPress={
            () => {
              this.getPaginationData(); this.setState({ disabled: true });
            }
          } disabled={this.state.disabled}>
            <MaterialCommunityIcons name="reload" size={30} style={{ height: 15, width: 15, }} />
          </Button>
        </View> :
        this.state.loadingPagination ? <View style={{
          backgroundColor: '#FFFFFF',
          height: 100,
          width: 100,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', alignSelf: "center"
        }}>
          <ActivityIndicator animating={this.state.loadingPagination} color="black" />
          <Text>Loading...</Text>
        </View> : null
    )
  }

  onRefresh() {
    this.setState({ isFetching: true, data: "", skipPagination: 1 }, function () { this.getData() });
  }


  renderViewMore(onPress) {
    return (
      <Text style={{ color: "grey", fontWeight: "bold" }} onPress={onPress}>See more</Text>
    )
  }
  renderViewLess(onPress) {
    return (
      <Text style={{ color: "grey", fontWeight: "bold" }} onPress={onPress}>See less</Text>
    )
  }


  confirmRequest = async (item) => {

    this.setState({ loading: true, data: '' });

    try {


      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var ConfirmRequest = {
        groupId: this.props.route.params.groupid._id,
        userId: item._id,
        GroupCategory_id: this.props.route.params.groupid.GroupCategory_id
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(ConfirmRequest),
      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/confirmGroupRequest`, requestOptions, { signal: this.controller.signal });

      if (response.ok) {
        this.setState({ loading: false });
        this.setState({ data: '' });
        Alert.alert(

          "Request Accepted ",
          "Welcome " + item.profile.full_name + " in the group",
          [
            { text: "Ok", onPress: () => this.getData() }
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


  RemoveRequest = async (item) => {

    this.setState({ loading: true, data: '' });

    try {


      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var RemoveRequest = {
        groupId: this.props.route.params.groupid._id,
        userId: item._id,

      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(RemoveRequest),
      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/removeGroupRequest`, requestOptions, { signal: this.controller.signal });

      if (response.ok) {
        this.setState({ loading: false });
        this.setState({ data: '' });
        Alert.alert(

          "Request Removed",
          "",
          [
            { text: "Ok", onPress: () => this.getData() }
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
        </View> : <View style={{ flex: 1, }} >
          <Loader isLoading={this.state.loading} />
          <FlatList
            style={styles.root}
            data={this.state.data}
            extraData={this.state}

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


            ListFooterComponent={() => this.FooterComponent()}

            contentContainerStyle={{ flexGrow: 1 }}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
            onEndReached={() => {
              if (!this.onEndReachedCalledDuringMomentum) {
                this.loadmoreData();    // LOAD MORE DATA
                this.onEndReachedCalledDuringMomentum = true;
              }
            }}
            onEndReachedThreshold={0.2}

            renderItem={(item) => {
              const Notification = item.item;

              const Message = Notification.Requested_groups.filter(a => a.groupid === this.props.route.params.groupid._id)

              let attachment = <View />;

              let mainContentStyle;
              if (Notification.attachment) {
                mainContentStyle = styles.mainContent;
                attachment = <Image style={styles.attachment} source={{ uri: Notification.attachment }} />
              }
              return (
                <View style={styles.container}>
                  <Image source={{ uri: Notification.profile.profile_pic }} style={styles.avatar} />
                  <View style={styles.content}>
                    <View style={mainContentStyle}>
                      <View style={styles.text}>



                        <View style={styles.recommendInfo}>

                          <View style={styles.text}>
                            <Text style={styles.name}>{Notification.profile.full_name}</Text>
                          </View>
                          <ViewMoreText
                            numberOfLines={5}
                            renderViewMore={this.renderViewMore}
                            renderViewLess={this.renderViewLess}
                            textStyle={styles.textMessage}
                          >
                            <Text>{Message[0].requestMessage}</Text>
                          </ViewMoreText>


                          <View style={styles.btnActionsWrapper} >
                            <TouchableOpacity style={styles.btnAddFriend} onPress={() => this.confirmRequest(Notification)} >
                              <Text style={{ color: '#fff', fontWeight: '500', fontSize: 16, width: "100%", marginLeft: 70 }}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { }} style={styles.btnHide} onPress={() => this.RemoveRequest(Notification)} >
                              <Text style={{ color: '#000', fontWeight: '500', fontSize: 16, width: "100%", marginLeft: 70 }}>Remove</Text>
                            </TouchableOpacity>
                          </View>
                        </View>





                      </View>

                    </View>

                  </View>
                </View>
              );
            }} />

          {(!this.props.route.params.groupid.admin_id.find(a => a._id === this.props.route.params.groupid.currentUser)) &&
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <Image source={NoGroups} style={{
                alignSelf: "center", alignItems: "center", width: 53,
                height: 53,
                borderRadius: 25,
              }} />
              <Text style={{ alignContent: "center", alignSelf: "center", fontSize: 15, color: "grey", fontWeight: "bold" }}>Only group admin can accept or reject joining requests.       </Text>
            </View>}

          {(this.state.data.length === 0 && this.props.route.params.groupid.admin_id.find(a => a._id === this.props.route.params.groupid.currentUser)) &&
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <Image source={NoGroups} style={{
                alignSelf: "center", alignItems: "center", width: 53,
                height: 53,
                borderRadius: 25,
              }} />
              <Text style={{ alignSelf: "center", alignItems: "center", fontSize: 15, color: "grey", fontWeight: "bold" }}>No Pending Requests.   </Text>
            </View>}

          <AdMobBanner style={{ alignItems: "center" }} bannerSize="banner" adUnitID={'ca-app-pub-3940256099942544/6300978111'}
            servePersonalizedAds={true}
            onDidFailToReceiveAdWithError={this.bannerError}
          />
        </View>
    );
  }
}


const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',


  },
  textMessage: {
    marginBottom: 10,
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
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  timeAgo: {
    fontSize: 12,
    color: "#696969"
  },


  recommendInfo: {
    width: SCREEN_WIDTH - 30 - 100,
    paddingLeft: 10,

  },

  name: {
    fontSize: 16,
    color: "#1E90FF",
    fontWeight: "bold"

  },


  mutualCount: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5
  },
  btnActionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnAddFriend: {
    width: '48.5%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#318bfb',
    borderRadius: 5
  },
  btnHide: {
    width: '48.5%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ddd'
  }
});  