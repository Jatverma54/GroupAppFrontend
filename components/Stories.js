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
  Share,
  ActivityIndicator,
  Dimensions,
  AsyncStorage
} from 'react-native';
import {
  Avatar,
  Button
} from 'react-native-paper';
import Post_Add from '../Pictures/Post_Add.png';
import AddGroup from '../Pictures/AddGroup.png';
import ShareIcon from '../Pictures/ShareIcon.png';
import ImageView from "react-native-image-viewing";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Stories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:'',
      isVisible: false,
      Groupimages: [],
      loading: false,
      error: null,

      isFetching: false,

      OrientationStatus: '',
      Width_Layout: Dimensions.get('window').width
    };
  }


  getData = async () => {

    this.setState({ loading: true });

    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;


      var GroupData = {
        groupid: this.props.nav.route.params.groupId._id,
      }
     
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(GroupData),
      };

      const response = await fetch("http://192.168.0.107:3000/groups/ViewGroupMembers", requestOptions);
      const json = await response.json();
     
      this.setResult(json.result);

    } catch (e) {

      this.setState({ error: 'Reload the Page', isFetching: false, loading: false });
      //   console.log("Error ",e)
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
     
      error: res.error || null,
      loading: false,
      isFetching: false
    });
  }


  onRefresh() {

    this.setState({ isFetching: true, data: "" }, function () { this.getData() });
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

  onShare = async () => {
    try {
      const result = await Share.share({

        message: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }

     
    } catch (error) {
      alert(error.message);
    }
  };

 



  AddStory() {

    return (

      <View style={{ flex: 1 }} >
        <View style={{ height: 90, padding: 10 }}>


          <View style={{ flex: 3, backgroundColor: "white" }}>


            <View>
              <TouchableOpacity onPress={() => this.props.nav.myHookValue.navigate("ViewMembers",{ Group: this.props.nav.route.params.groupId })}>
                <Avatar.Image
                  style={{ marginHorizontal: 2, borderColor: 'black', borderWidth: 2 }}
                  source={{ uri: this.props.nav.route.params.groupId.image }} size={53} />
                {/* <View style={styles.iconWrapper}>
                            <Icon name='plus'  size={12} color='black' />
                        </View> */}
                <Text maxLength={0} style={{ fontSize: 12, alignSelf: "center", paddingTop: 6 }}>Members</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>


      </View>

    )

  }



  openGroupPic(item) {
    //console.log(item,"itemmmm")
    { this.setState({ isVisible: true }) }
    const images = [
      {
        uri: item.profile.profile_pic,
      },

    ];

    { this.setState({ Groupimages: images }) }

    //console.log(this.state.Groupimages,"visible")

  }


  AddMembers(item) {
    
    if (this.props.nav.route.params.groupId.admin_id.includes(this.props.nav.route.params.groupId.currentUser)) {
      this.props.nav.myHookValue.push("AddMembers");
    }
    else {

      Alert.alert(
        "",
        "You need to be admin to add members to the group",
        [
          {
            text: "Ok",
            onPress: () => console.log("Ok Pressed"),
            style: "cancel"
          },

        ],
        { cancelable: false }
      );

    }


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
        <View style={styles.container} onLayout={(event) => this.setState({
          Width_Layout: event.nativeEvent.layout.width,

        }, () => this.DetectOrientation())}>



          <FlatList style={styles.list}


            horizontal={true}
            showsHorizontalScrollIndicator={false}

            data={this.state.data}
            keyExtractor={(item) => {
              return item._id;
            }}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator} />
              )
            }}

            ListHeaderComponent={
              this.AddStory()

            }
            renderItem={(post) => {
              const item = post.item;

              return (
                <View style={{ flex: 1 }} >
                  <View style={{ height: 90, padding: 10 }}>


                    <View style={{ flex: 3, backgroundColor: "white" }}>

                      <View>
                        <TouchableOpacity onPress={() => this.openGroupPic(item)}>
                          <Avatar.Image
                            style={{ marginHorizontal: 2, borderColor: 'black', borderWidth: 2 }}
                            source={{ uri: item.profile.profile_pic }} size={53} />

                          {!(item.profile.full_name > 9) ?
                            <Text style={{ fontSize: 12, alignSelf: "center", paddingTop: 6 }}>{item.profile.full_name}</Text>
                            : <Text style={{ fontSize: 12, alignSelf: "center", paddingTop: 6 }}>{item.profile.full_name.toString().substring(0, 10)}..</Text>}

                        </TouchableOpacity>
                      </View>

                    </View>

                  </View>


                  {this.state.isVisible &&

                    <ImageView
                      images={this.state.Groupimages}
                      imageIndex={0}
                      visible={this.state.isVisible}
                      onRequestClose={() => { this.setState({ isVisible: false }) }}

                    />


                  }

                </View>
              )
            }} />


          <View style={{ flex: 1 }} >
            <View>

              <TouchableOpacity style={styles.buttonContainerInviteMember} onPress={() => this.AddMembers(item)}>
                <View>
                  <View style={styles.bodyContentInviteMember}  >
                    <Text style={{ fontWeight: "bold", width: "100%", alignSelf: "center", marginLeft: 40, marginTop: 11 }}>Add Members</Text>
                  </View>
                  <View>

                    <Image
                      style={{ marginHorizontal: 5, height: 25, width: 30, marginLeft: width / 2 - 30 - 20, marginTop: -35 }}
                      source={AddGroup} />

                  </View>
                </View>
              </TouchableOpacity>

              <View>

                <TouchableOpacity style={{ ...styles.buttonContainerShare, marginLeft: this.state.Width_Layout / 2, }} onPress={() => this.onShare()}>
                  <View>
                    <View style={styles.bodyContentShare}  >
                      <Text style={{ fontWeight: "bold", width: "100%", alignSelf: "center", marginLeft: 40, marginTop: 11 }}>Share Group</Text>
                    </View>
                    <View>

                      <Image
                        style={{ marginHorizontal: 5, height: 25, width: 30, marginLeft: width / 2 - 30 - 20, marginTop: -35 }}
                        source={ShareIcon} />

                    </View>
                  </View>
                </TouchableOpacity>


              </View>



            </View>


            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.nav.myHookValue.push("CreateaNewPost")}>
              <View>
                <View style={styles.bodyContent}  >
                  <Text style={{ fontWeight: "bold", width: "100%", marginLeft: 50, marginTop: 11 }}>Start a conversation</Text>
                </View>
                <View>

                  <Image
                    style={{ marginHorizontal: 5, height: 30, width: 35, marginLeft: 350, marginTop: -40 }}
                    source={Post_Add} />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {this.props.data.length === 0 && <View style={{ alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 270 }}><Text style={{ alignSelf: "center", color: "grey", fontWeight: "900" }} >No Posts to Show</Text></View>}
        </View>
    );


  }
}



const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop:5,
  },
  list: {
    // paddingHorizontal: 4,
    backgroundColor: "white",
    // paddingHorizontal: 4,
    //paddingStart: 5,
    // paddingEnd: 5,
  },
  separator: {
    // marginTop: 0,
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
    paddingTop: 10,
    paddingBottom: 25,
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
    flex: 1,
    marginLeft: 60,
    marginTop: -45

  },
  time: {
    fontSize: 12,
    color: "#808080",
    marginLeft: 60,

  },
  title2: {
    fontSize: 18,
    flex: 1,

  },
  time2: {
    fontSize: 13,
    color: "#808080",


  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,

  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,

  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'space-between',


  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  bodyContent: {
    flex: 2,
    alignItems: 'center',

    // marginVertical:-5,

  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: "100%",
    borderRadius: 30,
    backgroundColor: "white",
  },

  bodyContentInviteMember: {
    flex: 2,
    alignItems: 'center',

    // marginVertical:-5,

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

    // marginVertical:-5,

  },
  buttonContainerShare: {
    marginTop: -55,
    height: 45,
    //  marginLeft:width/2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
    width: "50%",
    borderRadius: 30,
    backgroundColor: "white",
  },
  iconWrapper: {
    marginTop: -10,
    marginLeft: 45,
    borderRadius: 30,
    //  height: 40,
    // width: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }

});  