import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity, Image, Alert, RefreshControl,AsyncStorage } from "react-native";
import { Icon } from "react-native-elements";
import {
  Avatar,
  Button,
} from 'react-native-paper';
import { SearchBar } from "react-native-elements";
import Close_icon from '../Pictures/Close_icon.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loader from './Loader';
import {

  Dimensions
} from 'react-native';
import APIBaseUrl from '../constants/APIBaseUrl';
const { width, height } = Dimensions.get('window');

export default class AddMembers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      error: null,
     // search: null,
      isFetching: false,
      loading: false,
      selected: [],
      userName:""
    };
  }


// fetchData = () => {this.setState({loading: true});

  // fetch("https://jsonplaceholder.typicode.com/photos")
  //   .then(response => response.json())
  //   .then(responseJson => {
  //     responseJson = responseJson.map(item => {
  //       item.isSelect = false;
  //       item.selectedClass = styles.list;

  //       return item;
  //     });

  //     this.setState({
  //       loading: false,
  //       dataSource: responseJson,
  //     });
  //     console.log(responseJson[0])
  //   }).catch(error => {this.setState({loading: false});
  //  });
  // };// ADD group id/Name with


  getData = async () => {
   

    if (this.state.userName.length > 0) {

      try {
        this.setState({ loading: true, data: [] });
    const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);
        //myHeaders.append("Authorization", 'Basic ' + encode(userName + ":" + password));
     
        var search = {
          "userSearchQuery": this.state.userName,
        }
        this.setState({ userName: '', });
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(search)
        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/users/userSearchQuery`, requestOptions);

        if (response.ok) {
          this.setState({ loading: false });
          const json = await response.json();
          //  this.setState({search:''});  this.setState({data:'',temp:''}); 
          let jsonResult=json.result;
          jsonResult=jsonResult.map(item => {
                  item.isSelect = false;
                  item.selectedClass = styles.list;
          
                  return item;
                });
          
          this.setState({ data: jsonResult });
         
        }
        else {
          this.setState({ loading: false });

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
        this.setState({ loading: false });

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
  };



  // setResult = (res) => {
  //   this.setState({
  //     data: [...this.state.data, ...res],
  //     dataSearch: [...this.state.temp, ...res],
  //     error: res.error || null,
  //     loading: false
  //   });
  // }




  FlatListItemSeparator = () => <View style={styles.line} />;

  selectItem = data => {
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect ? styles.selected : styles.list;

    const index = this.state.data.findIndex(
      item => data.item._id === item._id
    );

    this.state.data[index] = data.item;

    if(data.item.isSelect&&!this.state.selected.find(a=>a._id===data.item._id)){
   //   console.log(data.item,"ADDDD")

  // if(!this.state.selected.find(a=>a._id===data.item._id)){

  let selectedthing= this.state.data.filter(item => item.isSelect)

for(var data in selectedthing){

  if(this.state.selected.indexOf(selectedthing[data]) === -1) {
    this.state.selected.push(selectedthing[data]);
}
}
   this.setState({
      data: this.state.data,
      // dataSearch:this.state.data,
      selected: this.state.selected,
    });
   // }
  }
    else{
    //  console.log(data.item,"REMOVW")
      this.state.selected=  this.state.selected.filter((item) => {
        return data.item._id !==item._id})
      this.setState({
        data: this.state.data,
        // dataSearch:this.state.data,
         selected: this.state.selected,
      });
    }

  };


  // onRefresh() {
  //   this.setState({ isFetching: true }, function () { this.searchRandomUser() });
  // }




  getSelectedArray=async () =>{

    // const itemss = this.state.data.filter(item => item.isSelect);
    const itemss = this.state.selected;
  
    if (itemss.length > 0) {
      // console.log(itemss);


      try {
        const userData = await AsyncStorage.getItem('userData');
            const transformedData = JSON.parse(userData);
            const { token, userId } = transformedData;
    
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);
            //myHeaders.append("Authorization", 'Basic ' + encode(userName + ":" + password));
         
            var search = {
              "SelectedUsers": itemss,
              "groupid":this.props.route.params
            }
          
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: JSON.stringify(search)
            };
    
            const response = await fetch(`${APIBaseUrl.BaseUrl}/users/adduserTogroup`, requestOptions);
    
            if (response.ok) {
             
              Alert.alert(
    
                "Users added Successfully",
                "",
                [
                  { text: "Ok", onPress: () =>  this.setState({data: [],selected: []})}
                ],
                { cancelable: false }
              );
    
               //  console.log(responseJson)
             
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
    else {
      Alert.alert("Please search and select an user")
    }


  }

  goToStore = () => (this.getSelectedArray());

  renderItem = data =>
    <TouchableOpacity
      style={[styles.list, data.item.selectedClass]}
      onPress={() => this.selectItem(data)}
    >
      <Image
        source={{ uri: data.item.image }}
        style={{ width: 40, height: 40, margin: 6 }}
      />
      <Text style={styles.lightText}>  {data.item.name}  </Text>
      <Text style={styles.lightText2}>  {data.item.username}  </Text>
    </TouchableOpacity>

  renderHeader = () => {
    return <SearchBar

      placeholder="Type a name.."
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
      value={this.state.userName}
      //onChangeText={this.updateSearch}
      onChangeText={userName => this.setState({ userName })}
      onSubmitEditing={() => this.getData()}
      returnKeyType="send"
      editable={true}
      multiline={true}
      blurOnSubmit={true}
      onClear={()=>this.setState({data:[]})}
      
       />;



  };

  updateSearch = search => {
    this.setState({ search }, () => {
      if ('' == search) {
        this.setState({
          dataSearch: [...this.state.data]
        });
        return;
      }

      this.state.dataSearch = this.state.data.filter(function (item) {
        return item.name.includes(search) || item.username.includes(search);
      }).map(function ({ id, name, username, image }) {
        return { id, name, image, username };
      });
    });
  };


  // deselectItem = item => {
  //   item.isSelect = !item.isSelect;
  //   item.selectedClass = item.isSelect ? styles.selected : styles.list;

  //   const index = this.state.data.findIndex(
  //     item => item.id === item.id
  //   );

  //   this.state.data[index] = item;

  //   this.setState({
  //     data: this.state.data,
  //    // dataSearch:this.state.data,
  //    selected: this.state.data.filter(item => item.isSelect)
  //   });
  // };


  render() {
    
    const itemNumber = this.state.selected.length;//this.state.data.filter(item => item.isSelect).length;

   


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


          {this.state.selected.length > 0 &&

            <View style={{ height: 100 }}>
              <FlatList style={styles.FaltlistSelect}


                horizontal={true}
                showsHorizontalScrollIndicator={false}

                data={this.state.selected}



                keyExtractor={(item) => {
                  return item._id;
                }}



                renderItem={(data) => {
                  //const item = post.item;

                  return (
                    <View style={{ flex: 1 }} >
                      <View style={{ height: 100, padding: 5 }}>


                        <View style={{ flex: 3, backgroundColor: "white" }}>

                          <View>
                            <TouchableOpacity onPress={() => this.selectItem(data)}>

                              <Image style={{ height: 15, width: 15 }} source={Close_icon}></Image>
                            </TouchableOpacity>
                            <Avatar.Image
                              style={{ marginHorizontal: 2, borderColor: 'black', borderWidth: 2 }}
                              source={{ uri: data.item.image }} size={60} />

                            {!(data.item.name.length > 9) ?
                              <Text style={{ fontSize: 12, alignSelf: "center", paddingTop: 6 }}>{data.item.name}</Text>
                              : <Text style={{ fontSize: 12, alignSelf: "center", paddingTop: 6 }}>{data.item.name.toString().substring(0, 10)}..</Text>}

                          </View>

                        </View>

                      </View>


                    </View>
                  )
                }} />
            </View>
          }




          <FlatList
            data={this.state.data}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            ListHeaderComponent={this.renderHeader}
            renderItem={item => this.renderItem(item)}
            keyExtractor={item => item._id.toString()}
            // refreshControl={
            //   <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
            // }
            extraData={this.state}
          />

          <View style={styles.numberBox}>
            <Text style={styles.number}>{itemNumber}</Text>
          </View>

          <TouchableOpacity style={styles.icon}>
            <View>
              <Icon
                raised
                name="check"
                type="font-awesome"
                color="green"
                size={30}
                onPress={() => this.goToStore()}
                containerStyle={{ backgroundColor: "#FA7B5F" }}
              />
            </View>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

    position: "relative"
  },
  name: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  list: {
    paddingVertical: 5,
    margin: 3,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: -1,

  },
  lightText: {
    color: "black",
    width: 200,
    paddingLeft: 15,
    fontSize: 12
  },
  lightText2: {
    color: "black",
    width: 200,
    paddingLeft: 15,
    fontSize: 12,
  //  marginTop:10,
   alignSelf:'flex-end',
   marginLeft:-200

  },
  line: {
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width: "78%",
    marginLeft: 80

  },
  icon: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    left: 290,
    zIndex: 1
  },
  numberBox: {
    position: "absolute",
    bottom: 75,
    width: 30,
    height: 30,
    borderRadius: 15,
    left: 330,
    zIndex: 3,
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    alignItems: "center"
  },
  number: { fontSize: 14, color: "#000" },
  selected: { backgroundColor: "#D9DBDC" },


  FaltlistSelect: {
    // paddingHorizontal: 4,
    backgroundColor: "white",

    // paddingHorizontal: 4,
    //paddingStart: 5,
    // paddingEnd: 5,
  },

  separator: {
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width: "78%",
    marginLeft: 80

  },


});
