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
  Button,
} from 'react-native-paper';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { SearchBar } from "react-native-elements";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import APIBaseUrl from '../../constants/APIBaseUrl';
FAIcon.loadFont();
MDIcon.loadFont();
const { width, height } = Dimensions.get('window');
import Loader from '../Loader';
export default class ReplyLikesComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      temp: '',
      loading: false,
      error: null,
      search: null,
      isFetching: false,

      errorPagination: null,
      skipPagination:1,
      loadingPagination:false
    };
  }



  getData = async () => {

  
    this.setState({ loading: true,data:'',temp: '',skipPagination:1 });
    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;
      var LikePost = {
        "commentId": this.props.route.params.CommentId,
        "ReplycommentId": this.props.route.params._id,
        "postId": this.props.route.params.PostId
      }
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(LikePost)
      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groupPost/viewReplyCommentlikes?page_size=10&page_number=`+this.state.skipPagination, requestOptions);
      const json = await response.json();

      this.setResult(json.result);

    } catch (e) {
      this.setState({ error: 'Reload the Page', isFetching: false, loading: false });
      console.log("Error ", e)
    }
  };

  getPaginationData = async () => {

    this.setState({ loadingPagination: true });

    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;
      var LikePost = {
        "commentId": this.props.route.params.CommentId,
        "ReplycommentId": this.props.route.params._id,
        "postId": this.props.route.params.PostId
      }
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(LikePost)
      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groupPost/viewReplyCommentlikes?page_size=10&page_number=`+this.state.skipPagination, requestOptions);
      const json = await response.json();

      this.setResult(json.result);

    } catch (e) {
      this.setState({ errorPagination: 'Reload', isFetching: false, loading: false });
      console.log("Error ", e)
    }
  };

  componentDidMount() {
    this._unsubscribe = this.getData();
  }

  componentWillUnmount() {
    this._unsubscribe;
    // this.getData();
  }



  onRefresh() {
    this.setState({ isFetching: true, data: "", temp: "",skipPagination:1 }, function () { this.getData() });
   
  }


  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      temp: [...this.state.temp, ...res],
      error: res.error || null,
      loading: false,
      isFetching: false,
      loadingPagination:false
    });
  }

  loadmoreData(){

    this.setState({skipPagination:parseInt(this.state.skipPagination)+1,loadingPagination:true},()=>{this.getPaginationData()})
  }
   
  FooterComponent(){
  return(
    
    this.state.errorPagination != null ?
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text>{this.state.error}</Text>
          <Button onPress={
            () => {
              this.getPaginationData();
            }
          }  >
            <MaterialCommunityIcons name="reload" size={30} style={{ height: 15, width: 15, }} />
          </Button>
        </View>:
    this.state.loadingPagination?<View style={{ backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',alignSelf:"center"}}>
    <ActivityIndicator animating={this.state.loadingPagination} color="black" />
  <Text>Loading...</Text>
    {/* If you want to image set source here */}
    {/* <Image
      source={require('../Pictures/loading.gif')}
      style={{ height: 80, width: 80 }}
      resizeMode="contain"
      resizeMethod="resize"
    /> */}
  </View>:null
  )
  }

  renderItem = ({ item }) => {
    return (

      <View style={styles.row}>
        <View style={styles.TouchableOpacityStyle} >
          <Image source={{ uri: item.profile.profile_pic }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.profile.full_name}</Text>

            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.username}</Text>
            </View>

            {/* {(this.state.Role.includes("admin")) &&  
            <View style={{flex:1, marginLeft:300}}>
            <TouchableOpacity onPress={()=>this.delete(item)}>  

             {/* <Button color="black" style={{height:15,width:10,marginRight:30}}>Admin Tab</Button> */}
            {/* <Image style={{height:15,width:10}} source={deleteButton}/>  */}

            {/* </TouchableOpacity>
            
            </View>
         
            
            
            }  */}

          </View>
        </View>







      </View>

    );
  }


  renderEmpty = () => {
 
    return (
      <View style={{ flex: 1,marginTop:height/3 }}>
      <AntDesign
        name="like1"
        size={45}
        color="black"
        style={{
          alignSelf: "center", alignItems: "center", width: 53,
          height: 53,
          borderRadius: 25,
        }}
      />
      <Text style={{ marginLeft: 170, color: "grey", fontWeight: "bold" }}>No Likes Yet</Text>
    </View>
    )
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
      }).map(function ({ _id, profile: full_name, profile: profile_pic, username }) {

        return { _id, profile: full_name, profile: profile_pic, username };
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
            refreshControl={
              <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
            }

            // ItemSeparatorComponent={() => {
            //   return (
            //     <View style={styles.separator}/>
            //   )
            // }}
            ListEmptyComponent={this.renderEmpty()}

            keyExtractor={(item) => {
              return item._id;
            }}

            ListFooterComponent={()=>this.FooterComponent()}
             
            contentContainerStyle={{ flexGrow: 1 }}
            onMomentumScrollBegin = {() => {this.onEndReachedCalledDuringMomentum = false}}
            onEndReached={() =>{
              if (!this.onEndReachedCalledDuringMomentum) {
                this.loadmoreData();    // LOAD MORE DATA
                this.onEndReachedCalledDuringMomentum = true;
              }
            } }
          onEndReachedThreshold={0.2}

            renderItem={this.renderItem} />
         
        </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    //  borderColor: '#DCDCDC',
    backgroundColor: 'white',
    //borderBottomWidth: 1,
    padding: 10,



  },
  TouchableOpacityStyle: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'white',


  },
  pic: {
    borderRadius: 30,
    width: 30,
    height: 30,
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
    width: "80%",
    marginLeft: 50

  },


}); 