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
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Button,
} from 'react-native-paper';

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

      const response = await fetch("http://192.168.0.107:3000/admin/GetCategoriesToDB", requestOptions);
      const json = await response.json();

      this.setResult(json.result);

    } catch (e) {
      this.setState({ error: 'Reload the Page', loading: false });
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

  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      error: res.error || null,
      loading: false
    });
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
        <View style={styles.container}>

          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={2}

            keyExtractor={(item) => {
              return item._id;
            }}

            renderItem={({ item }) => {

              return (
                <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]} onPress={() => this.props.myHookValue.navigate("ExplorePublicGroupCategoryBased", item)}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                  <Image style={styles.cardImage} source={{ uri: item.image }} />
                  <View style={styles.cardFooter}>
                    <Text style={styles.subTitle}>{item.Groups} Groups</Text>
                  </View>
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
    justifyContent: "center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center'
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: "#FFFFFF",
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 12,
    flex: 1,
    color: "#FFFFFF",
  },
  icon: {
    height: 20,
    width: 20,
  }
});     