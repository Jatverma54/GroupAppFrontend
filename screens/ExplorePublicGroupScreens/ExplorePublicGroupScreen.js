import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  BackHandler,
  RefreshControl,
  ImageBackground,
  InteractionManager 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Button,
} from 'react-native-paper';
import Loader from '../../components/Loader';
import APIBaseUrl from '../../constants/APIBaseUrl';
const {  height } = Dimensions.get('window');
import {
  AdMobBanner,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
setTestDeviceIDAsync('EMULATOR')

export default class ExplorePublicGroupScreen extends Component {
  controller = new AbortController()
  constructor(props) {

    super(props);
    this.state = {
      data: "",
      loading: false,
      error: null,
      isImageLoaded: true,
      disabled: false
    };

  }

  clickEventListener(item) {
    Alert.Alert(item.title)
  }

  getData = async () => {

    this.setState({ loading: true, data: '' });

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

      const response = await fetch(`${APIBaseUrl.BaseUrl}/admin/GetCategoriesToDB`, requestOptions, { signal: this.controller.signal });
      const json = await response.json();

      this.setResult(json.result);
      this.controller.abort()
    } catch (e) {
      this.setState({ error: 'Reload the Page', disabled: false, isFetching: false, loading: false });

      this.controller.abort()
    }
  };
  cleanup = null;

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
    let unsubscribe1 = this.getData();
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
    this.cleanup = () => { unsubscribe1; }
  });
  }

  backAction = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert("See You Later!", "Do you want to exit from App", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    } else {
      false;
    }
  };

  componentWillUnmount() {
    this.state;
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);

    if (this.cleanup) this.cleanup();
    this.cleanup = null;

  }

  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      error: res.error || null,
      loading: false,
      isFetching: false, disabled: false,

    });
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
                  <ImageBackground source={{ uri: item.image }}
                    style={[styles.cardImage]}
                    onLoad={() => this.setState({ isImageLoaded: true })}
                    onLoadEnd={() => this.setState({ isImageLoaded: false })}

                  >
                    <ActivityIndicator
                      animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
                    />
                    <View style={styles.cardHeader}>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>

                  </ImageBackground>

                </TouchableOpacity>
              )
            }} />
          <View>
            <AdMobBanner style={{ alignItems: "center" }} bannerSize="banner" adUnitID={'ca-app-pub-1558609691925120/4184611226'}
              servePersonalizedAds={true}
              onDidFailToReceiveAdWithError={this.bannerError}
            />
          </View>
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

    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: 'center'
  },
  /******** card **************/
  card: {
    marginHorizontal: 4,
    marginVertical: 4,
    flexBasis: '48%',

  },
  cardHeader: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,

  },
  cardFooter: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,

  },
  cardImage: {
    height: height / 4,
    width: "100%",
    alignSelf: 'center',
    resizeMode: "center",
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: "white",
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    marginBottom: -10
  },
  subTitle: {
    fontSize: 12,
    flex: 1,
    fontWeight: 'bold',
    color: "black",
    marginTop: -height / 24
  },
  icon: {
    height: 20,
    width: 20,
  }
});     