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
export default class ViewMembersPublicGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      temp: "",
      error: null,
      search: null,
      loading: false,
      isFetching: false,
    };
  }

  getData = async () => {

    this.setState({ loading: true,data:'' });

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

      const response = await fetch("http://192.168.43.42:3000/groups/ViewGroupMembers", requestOptions);
      const json = await response.json();
      //  console.log("Error ",json)
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
    //this.getData();
    this._unsubscribe;
  }


  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      temp: [...this.state.temp, ...res],
      error: res.error || null,
      loading: false,
      isFetching: false
    });
  }


  onRefresh() {

    this.setState({ isFetching: true, data: "", temp: "" }, function () { this.getData() });
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

          {(item.admin_id.includes(item._id)) && <View style={{ marginTop: -20, marginLeft: width - 100 }}>
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
            ItemSeparatorComponent={this.FlatListItemSeparator}
            keyExtractor={(item) => {
              return item._id;
            }}
            refreshControl={
              <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
            }

            renderItem={this.renderItem} />
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