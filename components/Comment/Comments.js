import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  InteractionManager 
} from 'react-native';

import {

  Divider,
  Button

} from 'react-native-paper';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';
import ParsedText from 'react-native-parsed-text';
import * as Linking from 'expo-linking';
import MDIcon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
MDIcon.loadFont();
import Loader from '../Loader';
import APIBaseUrl from './../../constants/APIBaseUrl';
export default class Comments extends Component {

  cleanup = null;

  controller = new AbortController();
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      msg: '',
      Role: "admin",
      currentUserOnwerId: "abcd",
      height: 40,
      isFetching: false,
      loading: false,
      error: null,
      errorPagination: null,
      skipPagination: 1,
      loadingPagination: false,
      disabled: false
    }
    this.send = this.send.bind(this);

  }

  getData = async () => {

    this.setState({ loading: true, data: [] });

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
      var id = this.props.routeData !== undefined ? this.props.routeData._id : this.props.route.params._id
      const response = await fetch(`${APIBaseUrl.BaseUrl}/groupPost/getComments/` + id + `?page_size=10&page_number=` + this.state.skipPagination, requestOptions, { signal: this.controller.signal });
      const json = await response.json();

      this.setResult(json.result);
      this.controller.abort()

    } catch (e) {
      this.setState({ error: 'Reload the Page', disabled: false, isFetching: false, loading: false });
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
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,

      };
      var id = this.props.routeData !== undefined ? this.props.routeData._id : this.props.route.params._id
      const response = await fetch(`${APIBaseUrl.BaseUrl}/groupPost/getComments/` + id + `?page_size=10&page_number=` + this.state.skipPagination, requestOptions, { signal: this.controller.signal });
      const json = await response.json();

      this.setResult(json.result);
      this.controller.abort()

    } catch (e) {
      this.setState({ errorPagination: 'Reload', isFetching: false, loading: false, disabled: false });
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


  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
    let unsubscribe1 = this.setState({ skipPagination: 1 })
    let unsubscribe2 = this.getData();
    this.cleanup = () => { unsubscribe1; unsubscribe2; }
  });
  }

  componentWillUnmount() {

    if (this.cleanup) this.cleanup();
    this.cleanup = null;
    this.send();
  }



  renderEmpty = () => {

    return (
      <View style={{ flex: 1, marginTop: height / 3 }}>
        <MaterialCommunityIcons
          name="comment-text"
          size={45}
          color="black"
          style={{
            justifyContent: "center",
            alignSelf: "center", alignItems: "center", width: 53,
            height: 53,
            borderRadius: 25,
          }}
        />
        <Text style={{ marginLeft: width / 3, color: "grey", fontWeight: "bold" }}>NO COMMENTS YET</Text>
      </View>
    )
  }

  LikeUnlike(data) {
    try {

      data.item.isLiked = !data.item.isLiked;
      data.item.likeCount = data.item.isLiked ? (parseInt(data.item.likeCount) + 1) : (parseInt(data.item.likeCount) - 1)

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

      var id = this.props.routeData !== undefined ? this.props.routeData._id : this.props.route.params._id
      var LikePost = {
        "commentId": data.item._id,
        "isLiked": data.item.isLiked,
        "postId": id
      }

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(LikePost)

      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groupPost/Commentslike`, requestOptions, { signal: this.controller.signal });

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

  onRefresh() {

    this.setState({ isFetching: true, data: "", skipPagination: 1 }, function () { this.getData() });
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


  LikesScreen() {

    return (

      <View style={{ flex: 1 }} >
        <View style={{ height: 10, padding: 10 }}>


          <View style={{ flex: 3, backgroundColor: "white" }}>


            <View>
              <Text>Likes</Text>
              <Divider style={{ height: 0.5, marginTop: 10, marginLeft: 20, width: "90%", backgroundColor: "grey" }} />
            </View>

          </View>

        </View>


      </View>
    )



  }



  send = async () => {
    if (this.state.msg.length > 0) {

      try {

        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);
        var id = this.props.routeData !== undefined ? this.props.routeData._id : this.props.route.params._id
        var comment = {
          "comment": this.state.msg,
          "postId": id
        }
        this.setState({ msg: '', height: 40 });
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(comment)

        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/groupPost/createNewComment`, requestOptions, { signal: this.controller.signal });

        if (response.ok) {

          this.setState({ data: '', skipPagination: 1 });
          this.getData();
          this.controller.abort()

        }
        else {

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
  }

  updateSize = (height) => {

    if (height < 200) {
      this.setState({
        height
      });
    }
  }

  delete(item) {

    Alert.alert(
      "",
      "Do you want to delete the comment",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.deletearray(item.item) }
      ],
      { cancelable: false }
    );
  };


  deletearray = async (item) => {

    try {



      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;
      var id = this.props.routeData !== undefined ? this.props.routeData._id : this.props.route.params._id
      var DeletePost = {
        "postId": id,
        "commentId": item._id
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(DeletePost)

      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groupPost/deleteComment`, requestOptions,
        { signal: this.controller.signal }



      );


      if (response.ok) {

        this.setState({ data: "", skipPagination: 1 });

        Alert.alert(

          "",
          "Comment deleted successfully",
          [
            { text: "Ok", onPress: () => this.getData() }
          ],
          { cancelable: false }
        );
        this.controller.abort()

      }
      else {


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



  render() {


    const { height } = this.state;


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
        <KeyboardAvoidingView style={styles.keyboard}>
          <Loader isLoading={this.state.loading} />

          <FlatList
            style={styles.root}
            data={this.state.data}
            extraData={this.state}
            refreshControl={
              <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
            }

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

            ListEmptyComponent={this.renderEmpty()}
            renderItem={(item) => {
              const Notification = item.item;
              return (

                <View style={styles.container}>

                  <Image style={styles.avatar} source={{ uri: Notification.image }}></Image>


                  <View style={styles.ContainerAtCenter}>



                    <View style={styles.contentContainer}>


                      {!(Notification.name.length > 38) ?
                        <Text style={styles.name}>{Notification.name}</Text>
                        : <Text style={styles.name}>{Notification.name.toString().substring(0, 38)}..</Text>}




                      <View>
                        <Text style={styles.Time}>{moment(Notification.CommentcreatedAt).fromNow()}</Text>
                      </View>

                      <ViewMoreText
                        numberOfLines={4}
                        renderViewMore={this.renderViewMore}
                        renderViewLess={this.renderViewLess}
                        textStyle={styles.title2}
                      >

                        <ParsedText style={styles.content} parse={[
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

                        >{Notification.comment}</ParsedText>





                      </ViewMoreText>
                    </View>

                    <View style={styles.LikesContainer}>


                      <TouchableOpacity onPress={() => this.Likes(item)}>


                        {Notification.isLiked ?
                          <AntDesign
                            name="like1"
                            size={15}
                            color="#1E90FF"
                            style={{ width: 15, height: 15 }}
                          /> : <AntDesign
                            name="like1"
                            size={15}
                            color="black"
                            style={{ width: 15, height: 15 }}
                          />}

                      </TouchableOpacity>



                      <TouchableOpacity onPress={() => this.props.navigation.navigate("ReplyComments", Notification)}>
                        <Text style={{ fontSize: 12, marginLeft: 60 }} >{(parseInt(Notification.ReplyCount) === 0) ? "" : Notification.ReplyCount} {(parseInt(Notification.ReplyCount) > 1) ? "Replies" : "Reply"}</Text>

                      </TouchableOpacity>


                      <TouchableOpacity style={styles.likeBtn} onPress={() => this.props.navigation.navigate("CommentLikes", Notification)}>
                        <Text style={{ fontSize: 12, marginLeft: 80 }} >{(parseInt(Notification.likeCount) === 0) ? "" : Notification.likeCount} {(parseInt(Notification.likeCount) > 1) ? "Likes" : "Like"}</Text>

                      </TouchableOpacity>

                      {(Notification.OnwerId === Notification.currentUserId || Notification.PostOwnerId === Notification.currentUserId) &&


                        <TouchableOpacity onPress={() => this.delete(item)}>

                          <MaterialCommunityIcons name="delete-outline" size={15} style={{ height: 15, width: 15, }} />

                        </TouchableOpacity>

                      }




                    </View>
                  </View>
                </View>
              )
            }} />

          <View style={{

            flexDirection: 'row',
            alignSelf: 'flex-end',
            padding: 10,
            height: height,
            marginRight: 80,
            backgroundColor: 'white',
            margin: 10,
            shadowColor: '#3d3d3d',
            shadowRadius: 2,
            shadowOpacity: 0.5,
            shadowOffset: {
              height: 1,
            },
            borderColor: '#696969',
            borderWidth: 1,
            borderRadius: 30,
            borderBottomWidth: 1,






          }}>
            <ScrollView>
              <TextInput
                style={{ flex: 1, height: height, width: "100%" }}
                editable={true}
                placeholder="Type a message"
                multiline={true}
                value={this.state.msg}
                onChangeText={msg => this.setState({ msg })}
                onSubmitEditing={() => this.send()}
                onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                multiline style={{
                  width: '100%', height: height, marginTop: -10, fontSize: 18, padding: 10
                }}

              />
            </ScrollView>

          </View>

          <View style={styles.sendIcon}>
            <TouchableOpacity onPress={() => this.send()}>
              <MaterialCommunityIcons
                name="send"
                size={40}
              />
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>

    );
  }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "white"
  },

  editor: {
    height: "100%",
    width: '100%',
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    marginRight: 80,
    backgroundColor: 'white',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor: '#696969',
    borderWidth: 1,

  },

  sendIcon: {

    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    marginTop: -62,
    marginRight: 10,
    backgroundColor: 'white',
  },

  container: {
    paddingRight: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',

  },
  content: {
    borderRadius: 30,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 5,
    height: 70,
    backgroundColor: "#e9ebee",
    margin: 5,
    shadowColor: '#3d3d3d',
    shadowRadius: 6,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor: '#696969',
    borderWidth: 1,
    fontSize: 15

  },
  contentHeader: {
    paddingHorizontal: 10,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width: "78%",
    marginLeft: 60

  },

  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
    width: "80%",
    marginLeft: 10,
  },


  container: {
    flexDirection: 'row',
    marginBottom: 15
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
    marginLeft: 10
  },
  ContainerAtCenter: {
    width: screenWidth * 0.7

  },
  contentContainer: {
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    backgroundColor: '#e9ebee',
    borderRadius: 10,
    width: width - 70,
    marginRight: 20,
  },
  name: {
    fontWeight: 'bold',

  },

  image: {
    borderRadius: 10
  },
  LikesContainer: {
    marginTop: -5,
    marginLeft: 5,
    flexDirection: 'row',
  },
  Time: {
    flex: 1,
    marginLeft: width - 30 - 140,
    marginTop: -20,
    fontSize: 11
  },
  likeBtn: {
    textAlign: 'center',
    flex: 1,


  },
  replyBtn: {
    textAlign: 'center',
    flex: 1
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