import 'react-native-gesture-handler';
import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Dimensions, AsyncStorage, Alert, Image } from "react-native";
import { SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchIcon from '../Pictures/SearchIcon.png';
import {
  Button,
} from 'react-native-paper';
import Loader from './Loader';
import APIBaseUrl from '../constants/APIBaseUrl';
const { width, height } = Dimensions.get('window');
class SearchFunctionality extends Component {
  controller = new AbortController();
  constructor(props) {
    super(props);

    this.state = {

      data: [],
      error: null,
      search: null,
      loading: false,
      groupName: "",
      disabled: false
    }
    this.getData = this.getData.bind(this);
  }

  componentWillUnmount() {
    this.getData();
  }


  getData = async () => {


    if (this.state.groupName.length > 0) {

      try {
        this.setState({ loading: true, data: [] });
        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var search = {
          "groupSearchQuery": this.state.groupName,
        }
        this.setState({ groupName: '', });
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(search)
        };

        const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/groupSearchQuery`, requestOptions, { signal: this.controller.signal });

        if (response.ok) {
          this.setState({ loading: false });
          const json = await response.json();
          this.setState({ data: json.result });
          this.controller.abort()
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
          this.controller.abort()
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
        this.controller.abort()
      }
    }
  };



  renderHeader = () => {

    return <SearchBar

      placeholder="Type a group name..."
      placeholderTextColor="grey"
      lightTheme round editable={true}

      containerStyle={{
        borderBottomColor: "#CCCCCC",
        borderBottomWidth: 0.5,
        borderBottomStartRadius: 170,
        borderBottomEndRadius: 40,
      }}
      platform="android"
      inputStyle={{ color: "black" }}
      value={this.state.groupName}

      onChangeText={groupName => this.setState({ groupName })}
      onSubmitEditing={() => this.getData()}
      returnKeyType="send"
      editable={true}
      multiline={true}
      blurOnSubmit={true}
      onClear={() => this.setState({ data: [] })}

    />
  };



  FlatListItemSeparator = () => <View style={{
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width: "100%",
  }} />;



  renderEmpty = () => {

    return (

      <View style={{ flex: 1 }}>
        <Image style={{ alignSelf: "center" }} source={SearchIcon} />

        <Text style={{ alignItems: "center", marginLeft: width / 3, color: "grey", fontWeight: "bold", fontSize: 16 }}>No result to show</Text>

      </View>
    )
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
        <View style={{ backgroundColor: "white" }}>
          <Loader isLoading={this.state.loading} />
          <FlatList
            ListHeaderComponent={this.renderHeader}
            data={this.state.data}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            keyExtractor={item => item._id}
            ListEmptyComponent={this.renderEmpty()}
            renderItem={({ item }) => (

              item.isJoined ? <TouchableOpacity style={{
                paddingVertical: 5,
                margin: 3,
                flexDirection: "row",
                backgroundColor: "white",
                justifyContent: "flex-start",
                alignItems: "center",
                zIndex: -1,
              }} activeOpacity={0.2}
                underlayColor="black" onPress={() => this.props.navigation.navigate("JoinedGroupInsideGroup", item)}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 40, height: 40, margin: 6 }}
                />


                <View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: "100%",
                  }}>
                    <Text style={{
                      marginLeft: 15,
                      fontWeight: '600',
                      color: '#222',
                      fontSize: 18,
                      width: 170,
                    }} ellipsizeMode="tail"> {item.GroupName}</Text>



                  </View>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      fontWeight: '400',
                      color: '#008B8B',
                      fontSize: 12,
                      marginLeft: 15,
                      width: "100%"
                    }}>{item.GroupCategory}</Text>
                  </View>

                </View>
              </TouchableOpacity> : <TouchableOpacity style={{
                paddingVertical: 5,
                margin: 3,
                flexDirection: "row",
                backgroundColor: "white",
                justifyContent: "flex-start",
                alignItems: "center",
                zIndex: -1,
              }} activeOpacity={0.2}
                underlayColor="black" onPress={() => this.props.navigation.navigate("ExplorePublicGroupCategoryBased", { data: item })}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 40, height: 40, margin: 6 }}
                  />

                  <View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: "100%",
                    }}>
                      <Text style={{
                        marginLeft: 15,
                        fontWeight: '600',
                        color: '#222',
                        fontSize: 18,
                        width: 170,
                      }} ellipsizeMode="tail"> {item.GroupName}</Text>



                    </View>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <Text style={{
                        fontWeight: '400',
                        color: '#008B8B',
                        fontSize: 12,
                        marginLeft: 15,
                        width: "100%"
                      }}>{item.GroupCategory}</Text>
                    </View>

                  </View>

                </TouchableOpacity>

            )}
          />

        </View>
    );

  }
}

export default SearchFunctionality;