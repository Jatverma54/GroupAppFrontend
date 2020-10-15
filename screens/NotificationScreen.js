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
  Dimensions

} from 'react-native';
import {

  Button

} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loader from '../components/Loader';
import moment from "moment";
import ViewMoreText from 'react-native-view-more-text';
const { width, height } = Dimensions.get('window');
export default class NotificationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      isFetching: false,
       loading: false,   
      error: null,

    }
  }


  getData = async () => {

    this.setState({ loading: true,data:'', });
   
    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
    
      let groupId=this.props.route.params.groupid._id;
    
//    let groupId=this.props.route.params.groupId.AllPublicFeed!==undefined?this.props.route.params.groupId.Groupid:this.props.route.params.groupId._id;
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      const response = await fetch("http://192.168.0.102:3000/notifications/"+groupId, requestOptions);
      const json = await response.json();
      //  console.log("Error ",json)
      //console.log(json,"dddddddddddddddddddddddddddddddddd")
      this.setResult(json.result);
    
    } catch (e) {
      // console.log("Error ",e)
      this.setState({ error: 'Reload the Page', isFetching: false, loading: false });
      //   console.log("Error ",e)
    }
  };

 
  onRefresh() {
    this.setState({ isFetching: true, data: "" }, function () { this.getData() });
  }

  
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
  render() {

    //  this.state.Seen?this.props.navigation.setOptions({

    //     tabBarLabel: ({focused, tintColor:color}) => (
    //       <MaterialCommunityIcons name="bell" color="black"  size={26} /> 
    //       ),
    //   }):null




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
        </View>:
         <View >
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
        renderItem={(item) => {
          const Notification = item.item;
          
          let attachment = <View />;

          let mainContentStyle;
          if (Notification.post_id.image.length!==0&&(Notification.activity==="NewPostAdded"||Notification.activity==="PostLikedBy"||Notification.activity==="CommentBy")) {
            mainContentStyle = styles.mainContent;
            attachment = <Image style={styles.attachment} source={{ uri: Notification.post_id.image[0] }} />
          }
          return (
            <View style={styles.container}>
              <Image source={{ uri: Notification.activity_by.profile.profile_pic }} style={styles.avatar} />
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                    <Text style={styles.name}>{Notification.activity_by.profile.full_name}</Text>

                    {(Notification.activity==="NewPostAdded")?
                    <Text style={{ fontSize: 16,marginLeft:4}}>added a new post : </Text>
                    :(Notification.activity==="PostLikedBy")?
                     <Text style={{ fontSize: 16,marginLeft:4}}>Liked your post : </Text>
                     :(Notification.activity==="CommentBy")?<Text style={{ fontSize: 16,marginLeft:4}}>commented on your post : </Text>:
                     (Notification.activity==="CommentLike")?<Text style={{ fontSize: 16,marginLeft:4}}>liked your comment: </Text>:
                     (Notification.activity==="RepliedOnComment")?<Text style={{ fontSize: 16,marginLeft:4}}>replied on your comment: </Text>:
                     (Notification.activity==="RepliedOnCommentLike")?<Text style={{ fontSize: 16,marginLeft:4}}>Liked your reply {"'"+Notification.Replycomment.comment+"'"} on comment: </Text>:null
                     
                     }


                    </View>
                    <ViewMoreText
                          numberOfLines={2}
                          renderViewMore={this.renderViewMore}
                          renderViewLess={this.renderViewLess}
                          textStyle={{fontSize: 14,marginTop:-5}}
                        >
                          {(Notification.activity==="NewPostAdded"||Notification.activity==="PostLikedBy"||Notification.activity==="CommentBy")?
                    <Text>{"'"+Notification.post_id.postMetaData+"'"}</Text>:   
          (Notification.activity==="CommentLike")?<Text>{"'"+Notification.comment.comment+"'"} on post {"'"+Notification.post_id.postMetaData+"'"}</Text>:
          (Notification.activity==="RepliedOnComment")?<Text>{"'"+Notification.comment.comment+"'"} on post {"'"+Notification.post_id.postMetaData+"'"}</Text>:
          (Notification.activity==="RepliedOnCommentLike")?<Text>{"'"+Notification.comment.comment+"'"}</Text>:null}
        
                    </ViewMoreText>
                      
                  
                  <Text style={styles.timeAgo}>
                  {moment(Notification.Createddate).fromNow()}     
                  </Text>
                </View>
                {attachment}
              </View>
            </View>
          );
        }} />
               
               {this.state.data.length === 0 &&
            <View style={{ flex: 1, backgroundColor: "white", }}>
             
              <Text style={{marginTop:height/3 ,marginLeft: 45, fontSize: 15, color: "grey", fontWeight: "bold",marginLeft:width/3,width:"100%"}}>No new notification</Text>
            </View>}

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
    marginTop:3,
    color: "#696969"
  },
  name: {
    fontSize: 16,
    color: "#1E90FF"
  }
});  