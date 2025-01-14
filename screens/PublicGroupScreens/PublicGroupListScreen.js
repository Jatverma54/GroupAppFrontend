import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  ImageBackground,
  InteractionManager 
} from 'react-native';
import {
  Divider,
} from 'react-native-paper';
import { FloatingAction } from "react-native-floating-action";
import actions from '../../components/FloatingActionsButton';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';

import DialogInput from 'react-native-dialog-input';
import PlaceHolderImage from '../../Pictures/PlaceholderImage.png';
import NoGroups from '../../Pictures/NoGroups.png';
import {  MaterialCommunityIcons } from '@expo/vector-icons';
const {  height } = Dimensions.get('window');
import Loader from '../../components/Loader';
import APIBaseUrl from '../../constants/APIBaseUrl';
//import {
 //AdMobBanner,
  //setTestDeviceIDAsync,
//} from 'expo-ads-admob';
//setTestDeviceIDAsync('EMULATOR')
export default class PublicGroupListScreen extends Component {
  cleanup = null;
  controller = new AbortController();
  constructor(props) {

    super(props);

    this.state = {
      data: "",
      isFetching: false,
      loading: false,
      error: null,
      isDialogVisible: false,
      inputText: '',
      itemData: '',
      searchResult: [],
      errorPagination: null,
      skipPagination: 1,
      loadingPagination: false,
      isImageLoaded: true,
      disabled: false

    }
  }

  cleanup = null;
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {});
 let unsubscribe1 = this.props.navigation.addListener('focus', () => {
  this.setState({ data: "", searchResult: [] });
    this.getData(); // do something
  if (this.props.route.params.data && this.props.route.params.data.GroupName) {
    this.groupSearchnData();
  }

});
this.cleanup = () => { unsubscribe1(); }
  }
  componentWillUnmount() {
    if (this.cleanup) this.cleanup();
    this.cleanup = null;
  }

  groupSearchnData = async () => {

    var GroupId = this.props.route.params.data._id
    this.setState({ loading: true });

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

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/getPublicGroupListScreen/` + GroupId, requestOptions, { signal: this.controller.signal });
      const json = await response.json();
      this.setNotificationResult(json.result);
      this.controller.abort()
    } catch (e) {
      this.setState({ error: 'Reload the Page', disabled: false, isFetching: false, loading: false });
      this.controller.abort()
    }
  };
  setNotificationResult = (res) => {

    this.setState({
      searchResult: [...this.state.searchResult, ...res],
      error: res.error || null,
      loading: false,
      isFetching: false,
      loadingPagination: false,
      disabled: false
    });

  }

  getData = async () => {

    this.setState({ loading: true, data: '', skipPagination: 1 });

    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;


      var GroupData = {
        GroupCategory_id: this.props.route.params.data !== undefined ? this.props.route.params.data.GroupCategory_id : this.props.route.params._id,
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(GroupData),
      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/getPublicGroupsWithCategory?page_size=10&page_number=` + this.state.skipPagination, requestOptions, { signal: this.controller.signal });
      const json = await response.json();

      this.setResult(json.result);
      this.controller.abort()
    } catch (e) {

      this.setState({ error: 'Reload the Page', disabled: false, isFetching: false, loading: false });


      this.controller.abort()
    }
  };


  getPaginationData = async () => {
    this.setState({ loadingPagination: true, });
    try {
      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;
      var GroupData = {
        GroupCategory_id: this.props.route.params.data !== undefined ? this.props.route.params.data.GroupCategory_id : this.props.route.params._id,
      }
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(GroupData),
      };
      const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/getPublicGroupsWithCategory?page_size=10&page_number=` + this.state.skipPagination, requestOptions, { signal: this.controller.signal });
      const json = await response.json();
      this.setResult(json.result);
      this.controller.abort()
    } catch (e) {
      this.setState({ errorPagination: 'Reload', disabled: false, isFetching: false, loading: false });
      this.controller.abort()
    }
  };

  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      error: res.error || null,
      errorPagination:res.error ||null,  
      loading: false,
      isFetching: false, disabled: false,
      loadingPagination: false
    });
  }




  onRefresh() {

    this.setState({ isFetching: true, data: "",skipPagination: 1, searchResult: [] }, function () { this.getData() });
  }

  loadmoreData() {

    this.setState({ skipPagination: parseInt(this.state.skipPagination) + 1, loadingPagination: true }, () => { this.getPaginationData() })
  }

  FooterComponent() {
    return (

      this.state.errorPagination != null ?
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text>{this.state.error}</Text>
          <Button onPress={
            () => {
              this.getPaginationData(); this.setState({ disabled: true });
            }
          } disabled={this.state.disabled}
            title="Reload the page"
          />
        </View> :
        this.state.loadingPagination ? <View style={{
          backgroundColor: '#FFFFFF',
          height: 100,
          width: 100,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', alignSelf: "center"
        }}>
          <ActivityIndicator animating={this.state.loadingPagination} color="black" />
          <Text>Loading...</Text>

        </View> : null
    )
  }




  renderGroupMembers = (group) => {

    if (group.members) {
      return (
        <View style={styles.groupMembersContent}>
          {group.members.map((prop, key) => {
            return (
              <Image key={key} style={styles.memberImage} source={{ uri: prop }} />
            );
          })}
        </View>
      );
    }
    return null;
  }

  DeleteJoinRequest = async (data) => {

    try {
      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;


      var GroupRequestData = {
        groupid: data.item._id,

      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(GroupRequestData),
      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/DeleteSentJoinRequest`, requestOptions, { signal: this.controller.signal });

      if (response.ok) {

        data.item.isRequested = !data.item.isRequested;

        const index = this.state.data.findIndex(
          item => data.item._id === item._id
        );


        this.state.data[index] = data.item;

        const index1 = this.state.searchResult.findIndex(
          item => data.item._id === item._id
        );

        this.state.searchResult[index1] = data.item;

        this.setState({
          data: this.state.data,
          searchResult: this.state.searchResult
        });
        this.controller.abort()
      } else {
        Alert.alert(

          "Something went wrong",
          "Please try again",
          [
            { text: "Ok", onPress: () => null }
          ],
          { cancelable: false }
        );
        this.controller.abort()
      }
    }
    catch (e) {

      this.controller.abort()

    }



  }

  SendJoinRequestPopUp = async (data, inputText) => {

    try {

      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;


      var GroupRequestData = {
        groupid: data.item._id,
        GroupName: data.item.GroupName,
        requestMessage: inputText,
        privacy: data.item.privacy,
        GroupCategory_id: data.item.GroupCategory_id
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(GroupRequestData),
      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/groups/SendJoinRequest`, requestOptions, { signal: this.controller.signal });





      if (response.ok) {

        if (data.item.privacy === "Open Group") {
          data.item.isJoined = !data.item.isJoined;
        } else {
          data.item.isRequested = !data.item.isRequested;
        }



        const index = this.state.data.findIndex(
          item => data.item._id === item._id
        );


        this.state.data[index] = data.item;


        const index1 = this.state.searchResult.findIndex(
          item => data.item._id === item._id
        );

        this.state.searchResult[index1] = data.item;


        this.setState({
          data: this.state.data,
          searchResult: this.state.searchResult

        });
        this.controller.abort()
      } else {
        Alert.alert(

          "Something went wrong",
          "Please try again",
          [
            { text: "Ok", onPress: () => null }
          ],
          { cancelable: false }
        );
        this.controller.abort()
      }
    }
    catch (e) {

      this.controller.abort()

    }

  }



  renderHeader = () => {

    return (
      <View>
        <ImageBackground

          style={{
            flex: 1,
            resizeMode: "cover",
            height: height / 4
          }}
          source={{ uri: this.props.route.params.data !== undefined ? this.props.route.params.data.CategoryImage : this.props.route.params.image, }}
          onLoad={() => this.setState({ isImageLoaded: true })}
          onLoadEnd={() => this.setState({ isImageLoaded: false })}

        >
          <ActivityIndicator
            animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
          />
          <MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" style={{ height: 30, width: 30, }} onPress={() => this.props.navigation.goBack()} />
          <View style={{ justifyContent: "flex-end", flex: 1, marginBottom: 5 }}>
            <Text style={{ color: "white", flexDirection: "row", fontWeight: "bold", marginLeft: 7, fontSize: 20, }}>{this.props.route.params.data !== undefined ? this.props.route.params.data.GroupCategory : this.props.route.params.title}</Text>
          </View>
        </ImageBackground>

        {this.state.searchResult.length === 0 ? <Divider style={{ height: 0.5, marginBottom: 5, marginLeft: 20, width: "90%", backgroundColor: "grey" }} /> : null}

        {this.state.searchResult.length !== 0 ?
          <View>
            <Text style={{ fontWeight: "bold", marginLeft: 7, backgroundColor: "#E6E6E6" }}>Recent Search<Text style={{ fontWeight: "normal", fontSize: 10, color: "grey" }}>- Drag screen to hide</Text></Text>
            <FlatList
              style={styles.root}
              data={this.state.searchResult}
              extraData={this.state}

              ItemSeparatorComponent={() => {
                return (
                  <View style={styles.separator} />
                )
              }}
              keyExtractor={(item) => {
                return item._id;
              }}

              renderItem={(item) => {
                const Group = item.item;
                let mainContentStyle;
                if (Group.attachment) {
                  mainContentStyle = styles.mainContent;
                }
                return (
                  <View style={styles.container}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("PublicGroupBio", { groupInformation: Group })}>
                      <Image source={Group.image ? { uri: Group.image } : PlaceHolderImage}

                        style={styles.avatar}
                        onLoad={() => this.setState({ isImageLoaded: true })}
                        onLoadEnd={() => this.setState({ isImageLoaded: false })}
                      />
                      <ActivityIndicator
                        animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
                      />
                    </TouchableOpacity>
                    <View style={styles.content}>
                      <View style={mainContentStyle}>
                        <View style={styles.text}>
                          <TouchableOpacity onPress={() => Group.isJoined ? this.props.navigation.navigate("JoinedGroupInsideGroup", Group) : this.props.navigation.navigate("PublicGroupBio", { groupInformation: Group })}>
                            <Text style={styles.groupName}>{Group.GroupName}</Text>
                          </TouchableOpacity>
                        </View>

                        <Text style={styles.countMembers}>
                          {Group.countMembers} {(parseInt(Group.countMembers) > 1) ? "members" : "member"}
                        </Text>

                        <View style={styles.ButtonContainer}>
                          <View style={styles.button}>

                            {Group.isJoined ?
                              <Button title="Joined" />

                              : (Group.isRequested) ?
                                <Button title="Requested" color="grey" onPress={() => this.DeleteJoinRequest(item)} />

                                : <Button title="Join Group" color={colors.ExploreGroupsLoginButtonColor} onPress={() => this.showDialog(true, item)} />
                            }

                          </View>
                        </View>
                      </View>

                    </View>

                  </View>

                );
              }} /><Text style={{ fontWeight: "bold", marginLeft: 7, backgroundColor: "#E6E6E6" }}>Groups</Text></View> : null}


      </View>
    )
  };





  showDialog(isShow, item) {
    this.setState({ isDialogVisible: isShow, itemData: item });
  }

  sendInput(inputText) {

    this.showDialog(false)
    this.SendJoinRequestPopUp(this.state.itemData, inputText)
  }



  renderEmpty = () => {

    return (
      <View style={{ flex: 1, marginTop: height / 5 }}>
        <Image source={NoGroups} style={{
          alignSelf: "center", alignItems: "center", width: 53,
          height: 53,
          borderRadius: 25,
        }} />
        <Text style={{ alignSelf: "center", alignItems: "center", color: "grey", fontWeight: "bold" }}>No Groups    </Text>
      </View>
    )
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
              this.getData(), this.setState({ searchResult: [], disabled: true });
            }
          } disabled={this.state.disabled}
            title="Reload the page"
          />
        </View> :
        <View style={styles.FloatButtonPlacement} >
          <Loader isLoading={this.state.loading} />


          <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Why do you want to be a group member"}
            message={"Let admin know the reason"}
            hintInput={"Please Type here.."}

            submitInput={(inputText) => { this.sendInput(inputText) }}
            closeDialog={() => { this.showDialog(false) }}>
          </DialogInput>


          <FlatList
            style={styles.root}
            data={this.state.data}
            extraData={this.state}
            ListHeaderComponent={this.renderHeader}
            refreshControl={
              <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
            }

            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator} />
              )
            }}
            ListEmptyComponent={this.renderEmpty()}
            keyExtractor={(item) => {
              return item._id;
            }}

            ListFooterComponent={() => this.FooterComponent()}

            contentContainerStyle={{ flexGrow: 1 }}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
            onEndReached={() => {
              if (!this.onEndReachedCalledDuringMomentum) {
                this.loadmoreData();    // LOAD MORE DATA
                this.onEndReachedCalledDuringMomentum = true;
              }
            }}
            onEndReachedThreshold={0.2}

            renderItem={(item) => {
              const Group = item.item;
              let mainContentStyle;
              if (Group.attachment) {
                mainContentStyle = styles.mainContent;
              }
              return (

                <View style={styles.container}>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate("PublicGroupBio", { groupInformation: Group })}>
                    <Image source={Group.image ? { uri: Group.image } : PlaceHolderImage}
                      style={styles.avatar}
                      onLoad={() => this.setState({ isImageLoaded: true })}
                      onLoadEnd={() => this.setState({ isImageLoaded: false })}
                    />
                    <ActivityIndicator
                      animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
                    />
                  </TouchableOpacity>
                  <View style={styles.content}>
                    <View style={mainContentStyle}>
                      <View style={styles.text}>
                        <TouchableOpacity onPress={() => Group.isJoined ? this.props.navigation.navigate("JoinedGroupInsideGroup", Group) : this.props.navigation.navigate("PublicGroupBio", { groupInformation: Group })}>
                          <Text style={styles.groupName}>{Group.GroupName}</Text>
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.countMembers}>
                        {Group.countMembers} {(parseInt(Group.countMembers) > 1) ? "members" : "member"}
                      </Text>

                      <View style={styles.ButtonContainer}>
                        <View style={styles.button}>

                          {Group.isJoined ?
                            <Button title="Joined" />

                            : (Group.isRequested) ?
                              <Button title="Requested" color="grey" onPress={() => this.DeleteJoinRequest(item)} />

                              : <Button title="Join Group" color={colors.ExploreGroupsLoginButtonColor} onPress={() => this.showDialog(true, item)} />
                          }

                        </View>
                      </View>
                    </View>

                  </View>

                </View>

              );
            }} />
          {/* <AdMobBanner bannerSize="banner" adUnitID={'ca-app-pub-1558609691925120/4839217340'}
            servePersonalizedAds={true}
            onDidFailToReceiveAdWithError={this.bannerError}
          /> */}
          <FloatingActionButton />
        </View>



    );
  }
};

const FloatingActionButton = () => {
  const navigation = useNavigation();
  return (
    <FloatingAction
      actions={actions}
      onPressItem={name => {
        navigation.push('Create a Public Group');

      }} />
  )
}



const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 13,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width: 53,
    height: 53,
    borderRadius: 25,

  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  memberImage: {
    height: 30,
    width: 30,
    marginRight: 4,
    borderRadius: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width: "78%",
    marginLeft: 80

  },

  countMembers: {
    color: "#20B2AA"
  },
  timeAgo: {
    marginRight: -70,
    fontSize: 12,
    color: "#696969"
  },
  groupName: {
    fontSize: 19,
    color: "#1E90FF"
  },
  groupMembersContent: {
    flexDirection: 'row',
    marginTop: 10
  },
  FloatButtonPlacement: {
    flex: 1,
    backgroundColor: "white"
  },
  button: {
    width: "50%",
    fontWeight: "bold",
  },
  ButtonContainer: {
    flex: 2,
    width: '100%',
    marginVertical: 10,
  },
});   