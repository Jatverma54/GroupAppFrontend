import 'react-native-gesture-handler';
import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Button,
} from 'react-native-paper';

class SearchFunctionality extends Component {

  constructor(props) {
    super(props);

    this.state = {

      data: [
        { id: "1", GroupName: "Group 1", groupId: "123", title: "Healthcare", joined: false, groupIcon: "https://lorempixel.com/100/100/nature/1/" },
        { id: "2", GroupName: "Group 2", groupId: "123", title: "Family", joined: false, groupIcon: "https://lorempixel.com/100/100/nature/1/" },
        { id: "3", GroupName: "Group 3", groupId: "123", title: "Music", joined: false, groupIcon: "https://lorempixel.com/100/100/nature/1/" }




      ],
      temp: [{ id: "1", GroupName: "Group 1", groupId: "123", title: "Healthcare", joined: false, groupIcon: "https://lorempixel.com/100/100/nature/1/" },

      { id: "2", GroupName: "Group 2", groupId: "123", title: "Family", joined: false, groupIcon: "https://lorempixel.com/100/100/nature/1/" },
      { id: "3", GroupName: "Group 3", groupId: "123", title: "Music", joined: false, groupIcon: "https://lorempixel.com/100/100/nature/1/" }


      ],
      error: null,
      search: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    // const url = `https://jsonplaceholder.typicode.com/users`;
    // this.setState({ loading: true });

    //  try {
    //     const response = await fetch(url);
    //     const json = await response.json();
    //     this.setResult(json);
    //  } catch (e) {
    //     this.setState({ error: 'Error Loading content', loading: false });
    //  }
  };

  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      temp: [...this.state.temp, ...res],
      error: res.error || null,
      loading: false
    });
  }

  renderHeader = () => {
    return <SearchBar

      placeholder="Type a group name..."
      lightTheme round editable={true}
      inputStyle={{ color: "black" }}
      value={this.state.search}
      onChangeText={this.updateSearch} />;
  };

  updateSearch = search => {
    this.setState({ search }, () => {
      if ('' == search) {
        this.setState({
          data: [...this.state.temp]
        });
        return;
      }

      this.state.data = this.state.temp.filter(function (item) {
        return item.GroupName.includes(search);
      }).map(function ({ id, GroupName, title, groupIcon }) {
        return { id, GroupName, title, groupIcon };
      });
    });
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
        <FlatList
          ListHeaderComponent={this.renderHeader}
          data={this.state.data}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (

            item.joined ?
              <TouchableOpacity onPress={() => this.props.navigation.navigate("JoinedGroupInsideGroup", item)}>
                <ListItem
                  leftAvatar={{ source: { uri: item.groupIcon } }}

                  title={`${item.GroupName}`}
                  subtitle={item.title}

                />
              </TouchableOpacity> :

              <TouchableOpacity onPress={() => this.props.navigation.navigate("ExplorePublicGroupCategoryBased", item)}>
                <ListItem
                  // roundAvatar groupIcon
                  leftAvatar={{ source: { uri: item.groupIcon } }}
                  title={`${item.GroupName}`}
                  subtitle={item.title}

                />
              </TouchableOpacity>
          )}
        />
    );
  }
}

export default SearchFunctionality;