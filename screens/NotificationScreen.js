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
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  InteractionManager
} from 'react-native';
import {
  Button
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loader from '../components/Loader';
import moment from "moment";
import APIBaseUrl from '../constants/APIBaseUrl';
import ViewMoreText from 'react-native-view-more-text';
const {  height } = Dimensions.get('window');

export default class NotificationScreen extends Component {
  controller = new AbortController()
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      isFetching: false,
      loading: false,
      error: null,
      errorPagination: null,
      skipPagination: 1,
      loadingPagination: false,
      disabled: false
    }
  }


  getData = async () => {

    this.setState({ loading: true, data: '', skipPagination: 1 });

    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
     
      let groupId;
      if(this.props.route.params.groupid.GroupId!==undefined){
         groupId = this.props.route.params.groupid.AllPublicFeed !== undefined ? this.props.route.params.groupid.GroupId : this.props.route.params.groupid._id;
      }
     else{
       groupId = this.props.route.params.groupid.AllPublicFeed !== undefined ? this.props.route.params.groupid.Groupid : this.props.route.params.groupid._id;
     }
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/notifications/` + groupId + "?page_size=14&page_number=" + this.state.skipPagination, requestOptions, { signal: this.controller.signal });
      const json = await response.json();

      this.setResult(json.result);

      this.controller.abort()

    } catch (e) {
      this.setState({ error: 'Reload the Page', disabled: false, isFetching: false, loading: false });
      this.controller.abort()
    }
  };


  getPaginationData = async () => {


    this.setState({ loadingPagination: true });

    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      let groupId;
      if(this.props.route.params.groupid.GroupId!==undefined){
         groupId = this.props.route.params.groupid.AllPublicFeed !== undefined ? this.props.route.params.groupid.GroupId : this.props.route.params.groupid._id;
      }
     else{
       groupId = this.props.route.params.groupid.AllPublicFeed !== undefined ? this.props.route.params.groupid.Groupid : this.props.route.params.groupid._id;
     }
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/notifications/` + groupId + "?page_size=14&page_number=" + this.state.skipPagination, requestOptions, { signal: this.controller.signal });
      const json = await response.json();

      this.setResult(json.result);
      this.controller.abort()
    } catch (e) {

      this.setState({ errorPagination: 'Reload', isFetching: false, loading: false, disabled: false });

      this.controller.abort()
    }
  };


  onRefresh() {
    this.setState({ isFetching: true, data: "", skipPagination: 1 }, function () { this.getData() });
  }

  cleanup = null;

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
    let unsubscribe2;
    let unsubscribe1 = this.props.navigation.addListener('focus', () => {
      unsubscribe2 = this.setState({ data: "" })
      this.getData();

    });
    this.cleanup = () => { unsubscribe1(); unsubscribe2; }
  });
  }
  componentWillUnmount() {

    if (this.cleanup) this.cleanup();
    this.cleanup = null;
  }

  setResult = (res) => {

    this.setState({
      data: [...this.state.data, ...res],
      error: res.error || null,
      errorPagination:res.error ||null,  
      loading: false,
      isFetching: false,
      loadingPagination: false,
      disabled: false
    });
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

  renderEmpty = () => {

    return (
      <View style={{ flex: 1, backgroundColor: "white", marginTop: height / 4 }}>

        <Text style={{ alignContent: "center", alignItems: "center", alignSelf: "center", fontSize: 15, color: "grey", fontWeight: "bold", }}>No new notification     </Text>
      </View>
    )
  }

  bannerError = (error) => {

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
        </View> :
        <View style={{ flex: 1 }}>
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
            ListEmptyComponent={this.renderEmpty()}
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

              let attachment = <View />;

              let mainContentStyle;
              if (Notification.post_id.image.length !== 0 && (Notification.activity === "NewPostAdded" || Notification.activity === "PostLikedBy" || Notification.activity === "CommentBy")) {
                mainContentStyle = styles.mainContent;
                attachment = <Image style={styles.attachment} source={{ uri: Notification.post_id.image[0] }} />
              }
              return (
                <View style={styles.container}>
                  <Image source={{ uri: Notification.activity_by.profile.profile_pic }} style={styles.avatar} />
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("Feed", { Notification, groupid: this.props.route.params.groupid })}>
                    <View style={styles.content}>
                      <View style={mainContentStyle}>
                        <View style={styles.text}>
                          <Text style={styles.name}>{Notification.activity_by.profile.full_name}</Text>

                          {(Notification.activity === "NewPostAdded") ?
                            <Text style={{ fontSize: 16, marginLeft: 4 }}>added a new post : </Text>
                            : (Notification.activity === "PostLikedBy") ?
                              <Text style={{ fontSize: 16, marginLeft: 4 }}>Liked your post : </Text>
                              : (Notification.activity === "CommentBy") ? <Text style={{ fontSize: 16, marginLeft: 4 }}>commented on your post : </Text> :
                                (Notification.activity === "CommentLike") ? <Text style={{ fontSize: 16, marginLeft: 4 }}>liked your comment: </Text> :
                                  (Notification.activity === "RepliedOnComment") ? <Text style={{ fontSize: 16, marginLeft: 4 }}>replied on your comment: </Text> :
                                    (Notification.activity === "RepliedOnCommentLike") ? <Text style={{ fontSize: 16, marginLeft: 4 }}>Liked your reply {"'" + Notification.Replycomment.comment + "'"} on comment: </Text> : null

                          }


                        </View>
                        <ViewMoreText
                          numberOfLines={2}
                          renderViewMore={this.renderViewMore}
                          renderViewLess={this.renderViewLess}
                          textStyle={{ fontSize: 14, marginTop: -5 }}
                        >
                          {(Notification.activity === "NewPostAdded" || Notification.activity === "PostLikedBy" || Notification.activity === "CommentBy") ?
                            <Text>{"'" + Notification.post_id.postMetaData + "'"}</Text> :
                            (Notification.activity === "CommentLike") ? <Text>{"'" + Notification.comment.comment + "'"} on post {"'" + Notification.post_id.postMetaData + "'"}</Text> :
                              (Notification.activity === "RepliedOnComment") ? <Text>{"'" + Notification.comment.comment + "'"} on post {"'" + Notification.post_id.postMetaData + "'"}</Text> :
                                (Notification.activity === "RepliedOnCommentLike") ? <Text>{"'" + Notification.comment.comment + "'"}</Text> : null}

                        </ViewMoreText>


                        <Text style={styles.timeAgo}>
                          {moment(Notification.createdAt).fromNow()}
                        </Text>
                      </View>
                      {attachment}
                    </View>

                  </TouchableOpacity>
                </View>
              );
            }} />
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
    fontSize: 10,
    marginTop: 3,
    color: "#696969"
  },
  name: {
    fontSize: 16,
    color: "#1E90FF"
  }
});  