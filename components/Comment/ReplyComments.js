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
  AsyncStorage
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
import Loader from '../Loader';
MDIcon.loadFont();

export default class ReplyComments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      msg: '',
      Role: "admin",
      currentUserOnwerId: "abcd",
      height: 40,
      //fontWeight

      isFetching: false,
      loading: false,
      error: null,

    }
    this.send = this.send.bind(this);

  }

  getData = async () => {

    this.setState({ loading: true,data:'' });

    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;
      var ReplyComment = {
        "commentId": this.props.route.params._id,
        "postId": this.props.route.params.PostId
      }
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(ReplyComment)
      };

      const response = await fetch("http://192.168.43.42:3000/groupPost/getReplyComments/", requestOptions);
      const json = await response.json();

      this.setResult(json.result);

    } catch (e) {
      this.setState({ error: 'Reload the Page', isFetching: false, loading: false });
      console.log("Error ", e)
    }
  };


  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],

      error: res.error || null,
      loading: false,
      isFetching: false
    });
  }


  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: `Replying to ` + this.props.route.params.name,
    })
    this._unsubscribe = this.getData();
  }

  componentWillUnmount() {
    this._unsubscribe;
    this.send();
  }


  LikeUnlike(data) {
    try {

      data.item.isLiked = !data.item.isLiked;
      data.item.likeCount = data.item.isLiked ? (parseInt(data.item.likeCount) + 1) : (parseInt(data.item.likeCount) - 1)

      //  data.item.isLiked ? data.item.LikedBy.push({_id:data.item.currentUserId,name:data.item.currentUseProfileName,username:data.item.currentUserName, image:data.item.currentUserPic})
      //  : data.item.LikedBy=data.item.LikedBy.filter(item => item._id !== data.item.currentUserId);



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
      //myHeaders.append("Authorization", 'Basic ' + encode(userName + ":" + password));
      var LikePost = {
        "isLiked": data.item.isLiked,
        "commentId": this.props.route.params._id,
        "postId": this.props.route.params.PostId,
        "ReplycommentId": data.item._id

      }



      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(LikePost)

      };

      const response = await fetch("http://192.168.43.42:3000/groupPost/replyCommentslike", requestOptions);

      if (response.ok) {

        //  this.setState({search:''});  this.setState({data:'',temp:''});  

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

        //  console.log(responseJson);
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
    }




  }



  // console.log(this.state.data)




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

    this.setState({ isFetching: true, data: "" }, function () { this.getData() });
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

        // var data = this.state.data;
        //var id=Math.floor((Math.random() * 999999999999999) + 1);
        // // data.push({
        // //   id:id,
        // //   name: "example",
        // //   likeCount:0,
        // //   LikedBy:[],
        // //   comment: this.state.msg,
        // //   isLiked:false,
        // //   image: null,
        // //   OnwerId:""
        // // });
        // // this.setState({data:data});


        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);
        //myHeaders.append("Authorization", 'Basic ' + encode(userName + ":" + password));
        var comment = {
          "comment": this.state.msg,
          "commentId": this.props.route.params._id,
          "postId": this.props.route.params.PostId
        }
        this.setState({ msg: '', height: 40 });
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(comment)

        };

        const response = await fetch("http://192.168.43.42:3000/groupPost/addNewReplyComment", requestOptions);

        if (response.ok) {

          //  this.setState({search:''});  this.setState({data:'',temp:''});  
          this.setState({ data: '' });
          this.getData();
        }
        else {


          // const index = this.state.data.findIndex(
          //   items => items.id === id
          // );

          //  this.setState({
          //   data: this.state.data.filter((x,i) => i != index) })

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


        Alert.alert(

          "Something went wrong!!",
          "Please try again",
          [
            { text: "Ok", onPress: () => null }
          ],
          { cancelable: false }
        );
      }




      //   setTimeout(() => {
      //     this.reply();
      //   }, 2000);
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
          onPress: () => console.log("Cancel Pressed"),
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

      var DeletePost = {
        "commentId": this.props.route.params._id,
        "postId": this.props.route.params.PostId,
        "ReplycommentId": item._id
      }




      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      //myHeaders.append("Authorization", 'Basic ' + encode(userName + ":" + password));


      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(DeletePost)

      };

      const response = await fetch("http://192.168.43.42:3000/groupPost/deleteReplyComment", requestOptions


      );


      if (response.ok) {

        this.setState({ data: "" });

        Alert.alert(

          "",
          "Comment deleted successfully",
          [
            { text: "Ok", onPress: () => this.getData() }
          ],
          { cancelable: false }
        );

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

        //  console.log(responseJson);
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
      console.log('error deleting the group: ', err)
    }

  }


  // delssetearray(item){


  //   const index = this.state.data.findIndex(
  //     items => item.id === items.id
  //   );

  //    this.setState({
  //     data: this.state.data.filter((x,i) => i != index) })
  //    // console.log(this.state.data,"updated")




  //  // console.log(this.state.data,"updated")
  // }


  handleUrlPress(url) {
    //console.log(`url: ${url} has been pressed!`);

    Linking.openURL(url);
  }

  handlePhonePress(phone) {
    //console.log(`phone ${phone} has been pressed!`);
  }

  handleNamePress(name) {
    // console.log(`Hello ${name}`);
  }

  handleEmailPress(email) {
    //  console.log(`send email to ${email}`);
    Linking.openURL("mailto:" + email);
  }

  renderText(matchingString, matches) {


    // matches => ["[@michel:5455345]", "@michel", "5455345"]
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
              this.getData();
            }
          }  >
            <MaterialCommunityIcons name="reload" size={30} style={{ height: 15, width: 15, }} />
          </Button>
        </View> :
        <KeyboardAvoidingView style={styles.keyboard}>
 <Loader isLoading={this.state.loading} />

<View style={styles.Commentcontainer}>

<Image style={styles.avatar} source={{ uri: this.props.route.params.image }}></Image>


<View style={styles.CommentContainerAtCenter}>



  <View style={styles.CommentcontentContainer}>


    {!(this.props.route.params.name.length > 38) ?
      <Text style={styles.name}>{this.props.route.params.name}</Text>
      : <Text style={styles.name}>{this.props.route.params.name.toString().substring(0, 38)}..</Text>}




    <View>
      <Text style={styles.CommentTime}>{moment(this.props.route.params.createdAt).fromNow()}</Text>
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

      >{this.props.route.params.comment}</ParsedText>





    </ViewMoreText>
  </View>
</View>
</View>




          <FlatList
            style={styles.root}
            data={this.state.data}
            extraData={this.state}
            refreshControl={
              <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
            }
            //   ListHeaderComponent={
            //    this.LikesScreen()

            // }

            // ItemSeparatorComponent={() => {
            //   return (
            //     <View style={styles.separator}/>
            //   )
            // }}
            keyExtractor={(item) => {
              return item._id;
            }}
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
                        <Text style={styles.Time}>{moment(Notification.createdAt).fromNow()}</Text>
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
                        {/* <Text style={{fontWeight:"bold",color:"grey"}}>Like</Text> */}
                        {/* <Image style={{ width:15,height:15}} source={Like}/> */}

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


                      <TouchableOpacity style={styles.likeBtn} onPress={() => this.props.navigation.navigate("ReplyLikesComment", Notification)}>
                        <Text style={{ fontSize: 12, marginLeft: 44 }} >{(parseInt(Notification.likeCount) === 0) ? "" : Notification.likeCount} {(parseInt(Notification.likeCount) > 1) ? "Likes" : "Like"}</Text>
                        {/* <TouchableOpacity style={styles.replyBtn}><Text>Reply</Text></TouchableOpacity> */}
                      </TouchableOpacity>

                      {(Notification.OnwerId === Notification.currentUserId || Notification.PostOwnerId === Notification.currentUserId || Notification.CommentOwnerId === Notification.currentUserId) &&

                        // <Button style={{height:15,width:15,flex: 1,
                        //   marginLeft:310,
                        //   marginTop:-20}} >DEL</Button>

                        <TouchableOpacity onPress={() => this.delete(item)}>

                          <MaterialCommunityIcons name="delete-outline" size={15} style={{ height: 15, width: 15, }} />
                          {/* <Image style={{height:15,width:15,flex: 1,marginLeft:310,}} source={Close_icon} /> */}

                        </TouchableOpacity>

                      }




                    </View>
                  </View>
                </View>
              )
            }} />

          {this.state.data.length === 0 &&
            <View style={{ flex: 1 }}>
              <MaterialCommunityIcons
                name="comment-text"
                size={45}
                color="black"
                style={{
                  alignSelf: "center", alignItems: "center", width: 53,
                  height: 53,
                  borderRadius: 25,
                }}
              />
              <Text style={{ marginLeft: 165, color: "grey", fontWeight: "bold" }}>No reply yet</Text>
            </View>}

          <View style={{

            flexDirection: 'row',
            alignSelf: 'flex-end',
            padding: 10,
            height: height,
            // width: width - 20,
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
                // placeholderTextColor = "#696969"            
                onChangeText={msg => this.setState({ msg })}
                //  blurOnSubmit={true}
                onSubmitEditing={() => this.send()}
                //  returnKeyType="send"
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
                //  color={color}
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
    marginLeft:40
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "white"
  },

  editor: {
    // justifyContent: 'center',
    height: "100%",
    width: '100%',
    // fontSize:5,
    // marginTop:-70
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    // width: width - 20,
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
    // height: 40,
    // width: width - 20,
    //marginRight:80,
    marginTop: -62,
    marginRight: 10,
    backgroundColor: 'white',
    // margin: 10,


  },

  container: {
    //paddingLeft: ,
    paddingRight: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
 

  },
  Commentcontainer: {
    //paddingLeft: ,
    paddingRight: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',

  },
  content: {
    //  marginLeft: 16,
    //flex: 1,

    //   borderBottomColor: 'black',
    //  // backgroundColor: '#FFFFFF',
    //   borderRadius:60,
    //   borderBottomWidth: 1,
    //   width:width,
    //   height:45,
    //   marginBottom:20,
    //   flexDirection: 'row',
    borderRadius: 30,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 5,
    height: 70,
    // width: width ,
    // marginRight:20,
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
    // flex:1,
    // justifyContent: "space-between",

    //width:"100%",
    //flexWrap:"nowrap"
    //  marginBottom: 3


    //paddingVertical:,
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
    // flexDirection:"row",
    width: "80%",
    marginLeft: 10,
    // alignSelf:"flex-start"


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
  CommentContainerAtCenter: {
    width: screenWidth * 0.7

  },
  contentContainer: {
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    backgroundColor: '#e9ebee',
    borderRadius: 10,
    width: width-110,
    marginRight: 20,
  },
  CommentcontentContainer: {
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
    // width: 0.6 * screenWidth,

  },
  Time: {
    flex: 1,
    marginLeft: width - 70 - 140,
    marginTop: -20,
    fontSize: 11
  },
  CommentTime: {
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