import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Alert,
  FlatList,
  Dimensions,
  RefreshControl,
  Clipboard,
  ActivityIndicator,
  AsyncStorage,
  InteractionManager 
} from 'react-native';
import {
  Avatar,
  Divider,
  Button
} from 'react-native-paper';
import FbImages from '../JoinPublicGroupScreen/YourPostImagesJoinedGroup';
import Comment from '../../Pictures/Comment.png';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';
import ExitIcon from '../../Pictures/ExitIcon.png';
import Repor_Icon from '../../Pictures/Repor_Icon.png';
import ParsedText from 'react-native-parsed-text';
import * as Linking from 'expo-linking';
import moment from "moment";
const { width, height } = Dimensions.get('window');
import Loader from '../../components/Loader';
import APIBaseUrl from '../../constants/APIBaseUrl';
//import {
 //AdMobBanner,
  //setTestDeviceIDAsync,
//} from 'expo-ads-admob';
//setTestDeviceIDAsync('EMULATOR')



export default class YourPersonalGroupPostScreen extends Component {
  controller = new AbortController();
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      isVisible: false,
      MaximizeImage: '',
      isDocumentVisible: false,
      OpenDucumentUri: '',
      isFetching: false,
      loading: false,
      error: null,
      OrientationStatus: '',
      Width_Layout: Dimensions.get('window').width,
      skipPagination: 0,
      loadingPagination: false,
      errorPagination: null,
      isImageLoaded: true,
      disabled: false
    };
  }


  cleanup = null;
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
  });
  this.DetectOrientation();
  let unsubscribe1 = this.props.navigation.addListener('focus', () => {
    // do something
    this.setState({ data: "", skipPagination: 0 })
    this.getData(); // do something

  });
  this.cleanup = () => { unsubscribe1(); }
  }

  componentWillUnmount() {
    if (this.cleanup) this.cleanup();
    this.cleanup = null;

    this.DetectOrientation();
  }

  getData = async () => {

    this.setState({ loading: true, data: '' });

    try {

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

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groupPost/getAllUserPostofGroup?limit=10&skip=` + this.state.skipPagination, requestOptions, { signal: this.controller.signal });
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
      error: res.error || null,
      errorPagination:res.error ||null,  
      loading: false,
      isFetching: false, disabled: false,
      loadingPagination: false
    });
  }

  _onLoadStart = () => {
    this.setState({ isImageLoaded: true })
  };
  _onLoad = status => {
    this.setState({ isImageLoaded: false })
  };

  getPaginationData = async () => {

    this.setState({ loadingPagination: true });

    try {

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

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groupPost/getAllUserPostofGroup?limit=10&skip=` + this.state.skipPagination, requestOptions, { signal: this.controller.signal });
      const json = await response.json();

      this.setResult(json.result);
      this.controller.abort()

    } catch (e) {

      this.setState({ errorPagination: 'Reload', disabled: false, isFetching: false, loading: false });


      this.controller.abort()
    }




  };

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
        </View> : this.state.loadingPagination ? <View style={{
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
      <View style={{ alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: height / 3.5 }}><Text style={{ alignSelf: "center", alignItems: "center", justifyContent: "center", color: "grey", fontWeight: "bold" }} >No Posts to Show   </Text></View>
    )
  }


  loadmoreData() {

    this.setState({ skipPagination: parseInt(this.state.skipPagination) + 10, loadingPagination: true }, () => { this.getPaginationData() })
  }

  renderGroupMembers = (item) => {

    if (item.LikePictures.length > 0) {
      return (
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Likes", item)}>
            <View style={styles.groupMembersContent}>
              {item.LikePictures.map((prop, key) => {
                return (
                  <Image key={key} style={styles.memberImage} source={{ uri: prop }} />
                );
              })}


            </View>
          </TouchableOpacity>
          <Divider style={{ height: 0.5, marginTop: 4, marginLeft: 20, width: "35%", backgroundColor: "grey" }} />
        </View>
      );
    }
    return <View>
      <View style={styles.groupMembersContent}><Text style={{ fontSize: 13 }}>Be the first one to like</Text>
      </View>
      <Divider style={{ height: 0.5, marginTop: 4, marginLeft: 20, width: "35%", backgroundColor: "grey" }} />
    </View>
  }



  onFullscreenUpdate = ({ fullscreenUpdate, status }) => {

    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT:

        this.changeScreenOrientationLandscape();
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:

        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:

        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS:

        this.changeScreenOrientation();
    }
  }


  async changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  async changeScreenOrientationLandscape() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }


  onRefresh() {

    this.setState({ isFetching: true, data: "",skipPagination: 0 }, function () { this.getData() });
  }


  DetectOrientation() {

    if (this.state.Width_Layout > this.state.Height_Layout) {

      // Write Your own code here, which you want to execute on Landscape Mode.

      this.setState({
        OrientationStatus: 'Landscape Mode'
      });
    }
    else {

      // Write Your own code here, which you want to execute on Portrait Mode.

      this.setState({
        OrientationStatus: 'Portrait Mode'
      });
    }

  }




  copyText(item) {

    Clipboard.setString(item)

    alert('Copied to clipboard')
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


  delete(item) {

    Alert.alert(
      "",
      "Do you want to delete the post",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.deletearray(item) }
      ],
      { cancelable: false }
    );
  };

  deletearray = async (item) => {

    try {

      this.setState({ loading: true, data: '' });

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

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groupPost/` + item._id, requestOptions,
        { signal: this.controller.signal }


      );


      if (response.ok) {
        this.setState({ loading: false });
        this.setState({ data: "" });

        Alert.alert(

          "",
          "Post deleted successfully",
          [
            { text: "Ok", onPress: () => { this.getData(), this.setState({ skipPagination: 0 }) } }
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


  ReportGroup() {


    Alert.alert(
      "",
      "Do you want to report the group",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Yes", onPress: () => null }
      ],
      { cancelable: false }
    );

  }

  LeaveGroup() {
    if (this.props.route.params.groupid.owner_id.includes(this.props.route.params.groupid.currentUser)) {

      alert("Group owner cannot leave the group");

    }
    else {
      Alert.alert(
        "",
        "Do you want to Leave the group",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Yes", onPress: () => this.ExitGroup() }
        ],
        { cancelable: false }
      );
    }
  }




  ExitGroup = async () => {
    try {

      this.setState({ loading: true, data: '' });

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var isAdmin = this.props.route.params.groupid.admin_id.find(a => a._id === userId) ? true : false;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      var RemoveUser = {
        "groupid": this.props.route.params.groupid._id,
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
          "You left the " + this.props.route.params.groupid.GroupName + " group",
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





  handleUrlPress(url) {

    Linking.openURL(url);
  }

  handlePhonePress(phone) {

  }

  handleNamePress(name) {

  }

  handleEmailPress(email) {

    Linking.openURL("mailto:" + email);
  }

  renderText(matchingString, matches) {

    let pattern = /@(\w+)/;
    let match = matchingString.match(pattern);
    return `${match[1]}`;
  }




  ReportorLeaveGroup() {



    return (


      <View style={{ flex: 1 }} >
        <View>

          <TouchableOpacity style={styles.buttonContainerInviteMember} onPress={() => this.ReportGroup()}>
            <View>
              <View style={styles.bodyContentInviteMember}  >
                <Text style={{ fontWeight: "bold", width: "100%", alignSelf: "center", marginLeft: 40, marginTop: 11 }}>Report Group</Text>
              </View>
              <View>

                <Image
                  style={{ marginHorizontal: 5, height: 25, width: 25, marginLeft: width / 2 - 30 - 20, marginTop: -35 }}
                  source={Repor_Icon} />

              </View>
            </View>
          </TouchableOpacity>

          <View>

            <TouchableOpacity style={{ ...styles.buttonContainerShare, marginLeft: this.state.Width_Layout / 2, }} onPress={() => this.LeaveGroup()}>
              <View>
                <View style={styles.bodyContentShare}  >
                  <Text style={{ fontWeight: "bold", width: "100%", alignSelf: "center", marginLeft: 40, marginTop: 11 }}>Leave Group</Text>
                </View>
                <View>

                  <Image
                    style={{ marginHorizontal: 5, height: 25, width: 25, marginLeft: width / 2 - 30 - 20, marginTop: -35 }}
                    source={ExitIcon} />

                </View>
              </View>
            </TouchableOpacity>

          </View>
        </View>

      </View>
    );

  }

  LikeUnlike(data) {
    try {
      data.item.isLiked = !data.item.isLiked;
      data.item.countLikes = data.item.isLiked ? (parseInt(data.item.countLikes) + 1) : (parseInt(data.item.countLikes) - 1)
        
      if( data.item.isLiked ){
        data.item.LikePictures.push(data.item.OnwerProfilePic)
      }else{
       var idx = data.item.LikePictures.indexOf(data.item.OnwerProfilePic)
      
       if (idx >= 0 && data.item.LikePictures.length>1) {
       
         data.item.LikePictures=    data.item.LikePictures.splice(idx, 1);
       }
       else{
        data.item.LikePictures = data.item.LikePictures.filter(item => item !== data.item.OnwerProfilePic);
       }
    
      }

      const index = this.state.data.findIndex(
        item => data.item._id === item._id
      );

      this.state.data[index] = data.item;

      this.setState({
        data: this.state.data,

      });
    } catch (e) {
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



  Likes = async (data) => {
    try {
      this.LikeUnlike(data);
      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var LikePost = {
        "PostId": data.item._id,
        "isLiked": data.item.isLiked
      }

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(LikePost)

      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groupPost/like`, requestOptions, { signal: this.controller.signal });

      if (response.ok) {

        this.controller.abort()

      }
      else {

        this.LikeUnlike(data);
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

      this.LikeUnlike(data);
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






  openDocument(url) {

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          alert("File type is not supported")
        } else {

          return Linking.openURL(url);
        }
      })
      .catch((err) => null);
  };


  _onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {

        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state

      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state

      } else {
        // Update your UI for the paused state
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
        this.setState({ isImageLoaded: true })
      } else {
        this.setState({ isImageLoaded: false })
      }


      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
      }


    }
  };



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
        <View style={styles.container} onLayout={(event) => this.setState({
          Width_Layout: event.nativeEvent.layout.width,

        }, () => this.DetectOrientation())}>
          <Loader isLoading={this.state.loading} />
          <FlatList style={styles.list}
            data={this.state.data}
            keyExtractor={(item) => {
              return item._id;
            }}
            refreshControl={
              <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
            }
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator} />
              )
            }}

            ListHeaderComponent={
              this.ReportorLeaveGroup()

            }
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

            ListEmptyComponent={this.renderEmpty()}

            renderItem={(post) => {
              const item = post.item;
              return (

                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View>
                      <Avatar.Image size={45}
                        style={{ marginHorizontal: 5, borderColor: 'black', borderWidth: 2 }}
                        source={{ uri: item.OnwerProfilePic }} />

                      {!(item.OnwerName.length > 30) ?
                        <Text style={styles.title}>{item.OnwerName}</Text>
                        : <Text style={styles.title}>{item.OnwerName.toString().substring(0, 30)}..</Text>}

                      <Text style={styles.time}>{moment(item.time).fromNow()}</Text>
                    </View>

                    <TouchableOpacity onPress={() => this.delete(item)}>

                      <MaterialCommunityIcons name="delete-outline" size={15} style={{ height: 15, width: 15, }} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.cardContent}>
                    <TouchableOpacity onPress={() => this.copyText(item.postMetaData)}>
                      <ViewMoreText
                        numberOfLines={14}
                        renderViewMore={this.renderViewMore}
                        renderViewLess={this.renderViewLess}
                        textStyle={styles.title2}
                      >

                        <ParsedText style={styles.title2} parse={[
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                          {
                            type: 'phone',
                            style: styles.phone,
                            onPress: this.handlePhonePress,
                          },
                          {
                            type: 'email',
                            style: styles.email,
                            onPress: this.handleEmailPress,
                          },
                          {
                            pattern: /Bob|David/,
                            style: styles.name,
                            onPress: this.handleNamePress,
                          },
                          {
                            pattern: /@(\w+)/,
                            style: styles.username,
                            onPress: this.handleNamePress,
                            renderText: this.renderText,
                          },
                          {
                            pattern: /@(\w+)_(\w+)/,
                            style: styles.username,
                            onPress: this.handleNamePress,
                            renderText: this.renderText,
                          },
                          { pattern: /42/, style: styles.magicNumber },
                          { pattern: /#(\w+)/, style: styles.hashTag },
                        ]}

                        >{item.postMetaData}</ParsedText>

                      </ViewMoreText>
                    </TouchableOpacity>

                  </View>



                  {(post.item.image.length !== 0) ?

                    <View>
                      <FbImages ShowPhotos={true} imagesdata={item.image} />

                      <Divider style={{ height: 0.5, marginTop: 10, marginLeft: 20, width: "90%", backgroundColor: "grey" }} />
                    </View>
                    :

                    (post.item.video != null) ?
                      <View style={styles.ImageView} >

                        <Video
                          source={{ uri: item.video }}
                          rate={1.0}
                          volume={1.0}
                          isMuted={false}
                          resizeMode="cover"
                          shouldPlay={false}
                          isLooping={true}
                          useNativeControls


                          onFullscreenUpdate={this.onFullscreenUpdate}
                          style={styles.video}

                          onLoadStart={this._onLoadStart}
                          onLoad={this._onLoad}
                          onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
                        />
                        <ActivityIndicator
                          animating={this.state.isImageLoaded} size="large" style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 110, left: 0, right: 0, height: 45 }} color="white" />
                        <Divider style={{ height: 0.5, marginTop: 10, marginLeft: 20, width: "90%", backgroundColor: "grey" }} />

                      </View> : ((post.item.document != null) ?
                        (



                          <View style={styles.ImageView} >



                            <TouchableHighlight style={{
                              marginTop: 10,
                              alignSelf: "center"
                            }}

                              onPress={() => this.openDocument(item.document)}>
                              <MaterialCommunityIcons
                                name="file-document"
                                size={70}

                              />
                            </TouchableHighlight>

                            <Text style={{ alignSelf: "center" }}>PDF</Text>

                            <Divider style={{ height: 0.5, marginTop: 10, marginLeft: 20, width: "90%", backgroundColor: "grey" }} />

                          </View>) : <Divider style={{ height: 0.5, marginTop: 10, marginLeft: 20, width: "90%", backgroundColor: "grey" }} />)}

                  { this.renderGroupMembers(item)}

                  <View style={styles.cardFooter}>


                    <View style={styles.socialBarContainer}>

                      <View style={styles.socialBarSection}>

                        <TouchableOpacity style={styles.socialBarButton} onPress={() => this.Likes(post)}>


                          {post.item.isLiked ?
                            <AntDesign
                              name="like1"
                              size={25}
                              color="#1E90FF"
                              style={styles.icon}
                            /> : <AntDesign
                              name="like1"
                              size={25}
                              color="black"
                              style={styles.icon}
                            />}


                          <Text style={{ marginRight: 40, marginLeft: 5, color: "grey" }}>{(parseInt(post.item.countLikes) === 0) ? "" : post.item.countLikes} {(parseInt(post.item.countLikes) > 1) ? "Likes" : "Like"}</Text>

                        </TouchableOpacity>
                      </View>



                      <View style={styles.socialBarSection}>

                        <TouchableOpacity onPress={() => { this.setState({ notificationData: [] }), this.props.navigation.navigate("Comments", post.item) }}>
                          <View style={styles.socialBarButton}>
                            <Image style={{
                              width: 25,
                              height: 25,

                              marginLeft: 200
                            }} source={Comment} />

                            <Text style={{ marginLeft: 5, color: "grey", }} >{(parseInt(post.item.countcomments) === 0) ? "" : post.item.countcomments} {(parseInt(post.item.countcomments) > 1) ? "Comments" : "Comment"}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>



                    </View>

                  </View>

                </View>

              )
            }} />

          {/* <AdMobBanner style={{ alignItems: "center" }} bannerSize="banner" adUnitID={'ca-app-pub-1558609691925120/2704256015'}
            servePersonalizedAds={true}
            onDidFailToReceiveAdWithError={this.bannerError}
          /> */}
        </View>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 4,
    backgroundColor: "#E6E6E6",
  },
  separator: {

  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,

    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white"
  },
  cardHeader: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {

  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,


  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: -5,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,

  },
  cardImage: {
    flex: 1,
    height: 300,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    width: "100%",
    flex: 1,
    marginLeft: 60,
    marginTop: -45

  },
  time: {
    fontSize: 13,
    color: "#808080",
    marginLeft: 60,

  },
  title2: {
    fontSize: 16,
    flex: 1,
    flexDirection: 'row',

  },
  time2: {
    fontSize: 13,
    color: "#808080",


  },
  icon: {
    width: 25,
    height: 25,

    marginLeft: 180
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    alignSelf: "center",
    marginTop: 10,

  },

  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: "center",
    alignItems: "center",
    flex: 1,

  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'space-between',

  },
  socialBarButton: {
    flexDirection: 'row',
    alignSelf: "center",
    alignItems: "center",
    marginLeft: -150
  },

  ImageView: {

    flex: 1,
    width: '100%',
    height: "100%",
    resizeMode: "cover",

  },
  overlayCancel: {
    padding: 20,
    position: 'absolute',
    right: 10,
    top: 0,
  },
  cancelIcon: {
    color: 'black',
    marginTop: 10

  },
  stretch: {

    width: width,
    height: height / 3,
    resizeMode: "contain",
  },
  video: {
    width: width,
    height: height / 2
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
    backgroundColor: "white",
  },


  bodyContentShare: {
    flex: 2,
    alignItems: 'center',
  },
  buttonContainerShare: {
    marginTop: -55,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
    width: "50%",
    borderRadius: 30,
    backgroundColor: "white",
  },


  bodyContentInviteMember: {
    flex: 2,
    alignItems: 'center',

  },

  bodyContentShare: {
    flex: 2,
    alignItems: 'center',

  },


  groupMembersContent: {
    flexDirection: 'row',
    marginTop: 4,
    marginLeft: 20
  },
  memberImage: {
    height: 20,
    width: 20,
    marginRight: 4,
    borderRadius: 10,
  },



  url: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },

  email: {
    textDecorationLine: 'underline',
    color: '#1E90FF',
  },

  text: {
    color: 'black',
    fontSize: 16,
  },

  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  name: {
    color: 'black',
    fontWeight: "bold"
  },

  username: {
    color: 'black',
    fontWeight: 'bold',
  },

  magicNumber: {
    fontSize: 42,
    color: 'pink',
  },

  hashTag: {
    fontStyle: 'italic',
    color: '#1E90FF',
  },
});  