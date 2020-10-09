import 'react-native-gesture-handler';
import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator ,TextInput,Dimensions,AsyncStorage,Alert,Image} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchIcon from '../Pictures/SearchIcon.png';
import {
  Button,
} from 'react-native-paper';
const { width, height } = Dimensions.get('window');
class SearchFunctionality extends Component {

  constructor(props) {
    super(props);

    this.state = {

      data: [],
      error: null,
      search: null,
      loading: false,
      groupName:""
    }
    this.getData = this.getData.bind(this);
  }

  componentWillUnmount(){
    this.getData();
  }

  getData = async () => {
   

    if (this.state.groupName.length > 0) {

      try {
    const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);
        //myHeaders.append("Authorization", 'Basic ' + encode(userName + ":" + password));
     
        var search = {
          "groupSearchQuery": this.state.groupName,
        }
        this.setState({ groupName: '', });
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(search)
        };

        const response = await fetch("http://192.168.0.107:3000/groups/groupSearchQuery", requestOptions);

        if (response.ok) {
         
          const json = await response.json();
          //  this.setState({search:''});  this.setState({data:'',temp:''});  
          this.setState({ data: json.result });
         
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
  };



  renderHeader = () => {
    
    return <SearchBar

    placeholder="Type a group name..."
    placeholderTextColor = "grey"  
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
    value={this.state.groupName}
    //onChangeText={this.updateSearch}
    onChangeText={groupName => this.setState({ groupName })}
    onSubmitEditing={() => this.getData()}
    returnKeyType="send"
    editable={true}
    multiline={true}
    blurOnSubmit={true}
    onClear={()=>this.setState({data:[]})}
    
     />
    
    
//     <TextInput
//     style={{ flex: 1, flexDirection: 'row',
//     alignSelf: 'center',
//     padding: 10,
//     height: 40,
//      width:  width,
//      //marginLeft:90,
//     //marginRight: 140,
//     backgroundColor: 'white',
//     margin: 10,
//     shadowColor: '#3d3d3d',
//     shadowRadius: 2,
//     shadowOpacity: 0.5,
//     shadowOffset: {
//       height: 1,
//     },
//     borderColor: '#696969',
//     borderWidth: 1,
//     borderRadius: 30,
//     borderBottomWidth: 1,
    
// }}
//     editable={true}
//     placeholder="Type a group name..."
//     multiline={true}
//     value={this.state.groupName}
//     placeholderTextColor = "grey"            
//     onChangeText={groupName => this.setState({ groupName })}
//       blurOnSubmit={true}
//     onSubmitEditing={() => this.getData()}
//       returnKeyType="send"
//   />
  };



  FlatListItemSeparator = () => <View style={{
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width: "100%",
  }} />;

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
         <View style={{backgroundColor:"white"}}>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={this.state.data}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (

            item.isJoined ?
              <TouchableOpacity onPress={() => this.props.navigation.navigate("JoinedGroupInsideGroup", item)}>
                <ListItem
                  leftAvatar={{ source: { uri: item.image } }}

                  title={`${item.GroupName}`}
                  subtitle={item.GroupCategory}

                />
              </TouchableOpacity> :

              <TouchableOpacity onPress={() => this.props.navigation.navigate("ExplorePublicGroupCategoryBased", item)}>
                <ListItem
                  // roundAvatar groupIcon
                  leftAvatar={{ source: { uri: item.image } }}
                  title={`${item.GroupName}`}
                  subtitle={item.GroupCategory}

                />
              </TouchableOpacity>
          )}
        />
        {this.state.data.length === 0 &&
          <View style={{ flex: 1 }}>
            <Image style={{alignSelf:"center"}} source={SearchIcon} />
            <Text style={{alignItems:"center", marginLeft: 140, color: "black", fontWeight: "bold",fontSize:16 }}>No result to show</Text>
          </View>}
          </View>
    );
    
  }
}

export default SearchFunctionality;