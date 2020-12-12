import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { SearchBar } from "react-native-elements";
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import {
  Button,
} from 'react-native-paper';
const { width, height } = Dimensions.get('window');
import Loader from '../../components/Loader';
import APIBaseUrl from '../../constants/APIBaseUrl';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712')//INTERSTITIAL_ID
 setTestDeviceIDAsync('EMULATOR')
AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917')//REWARDED_ID

export default class ViewMembersPublicGroup extends Component {
  controller = new AbortController();
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      temp: "",
      error: null,
      search: null,
      loading: false,
      isFetching: false,

      errorPagination: null,
      skipPagination:1,
      loadingPagination:false,
      disabled:false
    };
  }

  getData = async () => {

    this.setState({ loading: true,data:'',temp: '',skipPagination:1 });

    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;


      var GroupData = {
        groupid: this.props.route.params.Group._id,
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(GroupData),
      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/ViewGroupMembers?page_size=14&page_number=`+this.state.skipPagination, requestOptions,{signal: this.controller.signal});
      const json = await response.json();
      //  console.log("Error ",json)
      this.setResult(json.result);
      this.controller.abort()

    } catch (e) {

      this.setState({ error: 'Reload the Page',  disabled:false, isFetching: false, loading: false });
      //   console.log("Error ",e)
      this.controller.abort()

    }




  };

  getPaginationData = async () => {

    this.setState({ loadingPagination: true });

    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;


      var GroupData = {
        groupid: this.props.route.params.Group._id,
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(GroupData),
      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/ViewGroupMembers?page_size=14&page_number=`+this.state.skipPagination, requestOptions,{signal: this.controller.signal});
      const json = await response.json();
      //  console.log("Error ",json)
      this.setResult(json.result);
      this.controller.abort()

    } catch (e) {

      this.setState({ errorPagination: 'Reload',   disabled:false,isFetching: false, loading: false });
      //   console.log("Error ",e)
      this.controller.abort()

    }




  };

  _openRewarded = async () => {
    try {
     
      await AdMobRewarded.requestAdAsync({ servePersonalizedAds: true})
      await AdMobRewarded.showAdAsync()
    } catch (error) {
      console.log(error)
    } 
  }
  cleanup = null;
  componentDidMount() {
     let unsubscribe1 = this.getData();
     // this._openRewarded();
     this.cleanup = () => { unsubscribe1; }

  }

  componentWillUnmount() {
    //this.getData();
     if (this.cleanup) this.cleanup();
    this.cleanup = null;

 //   this._unsubscribe;
  
  }


  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      temp: [...this.state.temp, ...res],
      error: res.error || null,
      loading: false,
      isFetching: false,
      loadingPagination:false,  disabled:false
    });
  }


  onRefresh() {

    this.setState({ isFetching: true, data: "", temp: "",skipPagination:1 }, function () { this.getData() });
 
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
              this.getPaginationData();this.setState({disabled:true});
            }
          }  disabled={this.state.disabled}>
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

        <Image source={{ uri: item.profile.profile_pic }} style={styles.pic} />
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.profile.full_name}</Text>

          </View>
          <View style={styles.msgContainer}>
            <Text style={styles.msgTxt}>{item.username}</Text>
          </View>

          {(item.admin_id.includes(item._id)) && <View style={{ marginTop: -20, marginLeft: width/1.4 }}>
            {/* <FontAwesome name="user-secret" size={15} style={{

              color: "#666",

            }} /> */}
             <Text>Admin</Text>
          </View>}


        </View>


      </View>

    );
  }



  renderHeader = () => {
    return <SearchBar

      placeholder="Type a name or username"
      lightTheme round editable={true}
      //  containerStyle={{height:35,paddingBottom:40,}}
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



      this.state.data = this.state.temp.filter(function (item) {

        return item.profile.full_name.includes(search) || item.username.includes(search);
      }).map(function ({ _id, profile: full_name, profile: profile_pic, username, admin_id }) {
        return { _id, profile: full_name, profile: profile_pic, username, admin_id };
      });
    });


  };





  FlatListItemSeparator = () => <View style={styles.separator} />;





  render() {

   
    return (

      this.state.error != null ?
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text>{this.state.error}</Text>
          <Button onPress={
            () => {
              this.getData();this.setState({disabled:true});
            }
          } disabled={this.state.disabled} >
            <MaterialCommunityIcons name="reload" size={30} style={{ height: 15, width: 15, }} />
          </Button>
        </View> :
        <View style={{ flex: 1, backgroundColor: 'white', }} >
 <Loader isLoading={this.state.loading} />
          <FlatList
            ListHeaderComponent={this.renderHeader}
            extraData={this.state}
            data={this.state.data}
            ItemSeparatorComponent={this.FlatListItemSeparator}
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



            refreshControl={
              <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
            }

            renderItem={this.renderItem} />
                  <AdMobBanner style={{alignItems:"center"}} bannerSize="banner" adUnitID={'ca-app-pub-3940256099942544/6300978111'}
        servePersonalizedAds={true}
        onDidFailToReceiveAdWithError={this.bannerError} 
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    //borderColor: '#DCDCDC',
    backgroundColor: 'white',
    // borderBottomWidth: 1,
    padding: 10,

  },
  TouchableOpacityStyle: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'white',


  },
  pic: {
    borderRadius: 30,
    width: 45,
    height: 45,
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
    width: "78%",
    marginLeft: 60

  },

}); 