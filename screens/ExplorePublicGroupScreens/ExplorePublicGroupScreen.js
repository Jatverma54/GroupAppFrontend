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
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
 BackHandler,
 RefreshControl,
 ImageBackground,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Button,
} from 'react-native-paper';
import Loader from '../../components/Loader';
import APIBaseUrl from '../../constants/APIBaseUrl';
const { width, height } = Dimensions.get('window');

export default class ExplorePublicGroupScreen extends Component {

  constructor(props) {

    super(props);
    this.state = {
      data: "",
      loading: false,
      error: null,


    };

  }

  clickEventListener(item) {
    Alert.Alert(item.title)
  }

  getData = async () => {

    this.setState({ loading: true,data:'' });

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

      const response = await fetch(`${APIBaseUrl.BaseUrl}/admin/GetCategoriesToDB`, requestOptions);
      const json = await response.json();

      this.setResult(json.result);

    } catch (e) {
      this.setState({ error: 'Reload the Page', loading: false });
      console.log("Error ", e)
    }
  };

  componentDidMount() {
    this._unsubscribe = this.getData();  

      BackHandler.addEventListener("hardwareBackPress", this.backAction);
    
  
  }

  backAction = () => {
    if(this.props.navigation.isFocused()){
    Alert.alert("See You Later!", "Do you want to exit from App", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  }else{
    false;
  }
  };

  componentWillUnmount() {
    this._unsubscribe;
    // this.getData();
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }

  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      error: res.error || null,
      loading: false,
      isFetching: false
    });
  }


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
        <View style={styles.container}>
 <Loader isLoading={this.state.loading} />


          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={2}

            refreshControl={
              <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.getData()} />
            }
            keyExtractor={(item) => {
              return item._id;
            }}

            renderItem={({ item }) => {

              return (
                <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]} onPress={() => this.props.myHookValue.navigate("ExplorePublicGroupCategoryBased", item)}>
                <ImageBackground style={styles.cardImage} source={{ uri: item.image }}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                  {/* <Image style={styles.cardImage} source={{ uri: item.image }} /> */}
                  <View style={styles.cardFooter}>
                    <Text style={styles.subTitle}>{item.Groups} {(parseInt(item.Groups) > 1) ? "Groups" : "Group"}</Text>
                    
                  </View>
                  </ImageBackground>
                </TouchableOpacity>
              )
            }} />
        </View>
    );
  }

}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  list: {
    //paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: 'center'
  },
  /******** card **************/
  card: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexBasis: '48%',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
   // marginTop:width/3.2
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
   // marginTop:-width/12

  },
  cardImage: {
    height: height/4,
    width: "100%",
    alignSelf: 'center'
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: "black",
    fontWeight: 'bold',
    marginTop:height/6
  },
  subTitle: {
    fontSize: 12,
    flex: 1,
    fontWeight: 'bold',
    color:"black",
    marginTop:-height/24
  },
  icon: {
    height: 20,
    width: 20,
  }
});     