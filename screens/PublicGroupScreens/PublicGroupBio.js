import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import {
  Button,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ImageView from "react-native-image-viewing";
import Group_Name from '../../Pictures/Group_Name.png';
const { width, height } = Dimensions.get('window');
import moment from "moment";
import PlaceHolderImage from '../../Pictures/PlaceholderImage.png';
import Loader from '../../components/Loader';
export default class PublicGroupBio extends Component {

  constructor(props) {

    super(props);

    this.state = {
      data: this.props.GroupName.groupInformation,



      isVisible: false,
      loading: false,
      error: null,


    }

  }

  getData = async () => {
    // const url = `https://jsonplaceholder.typicode.com/users`;
    // this.setState({ loading: true,data:'' });

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

      error: res.error || null,
      loading: false
    });
  }




  addMemberorShare = () => {

    return (

      <View style={{ flex: 1 }} >
        <View>
          {/* this.props.myHookValue.push("ViewMembers") */}
          <TouchableOpacity style={styles.buttonContainerInviteMember} onPress={() => { this.props.navigation.navigate("ViewMembers", { Group: this.props.GroupName.groupInformation }) }}>
            <View>
              <View style={styles.bodyContentInviteMember}  >
                <Text style={{ fontWeight: "bold", width: "100%", alignSelf: "center", marginLeft: 40, marginTop: 11 }}>View Members</Text>
              </View>
              <View>

                <Image
                  style={{ marginHorizontal: 5, height: 30, width: 35, marginLeft: width / 2 - 30 - 20, marginTop: -40 }}
                  source={Group_Name} />

              </View>
            </View>
          </TouchableOpacity>
          {/*      
               <View>
     
               <TouchableOpacity style={styles.buttonContainerShare}  onPress={()=>{this.props.myHookValue.push("AddMembers")}}>
      <View>
      <View style={styles.bodyContentShare}  >
                <Text style={{fontWeight:"bold",width:"100%",alignSelf:"center",marginLeft:40,marginTop:11}}>Join Group</Text> 
                </View>
                <View>
                  
                <Image 
                      style={{ marginHorizontal: 5,height:30,width:35,marginLeft:150,marginTop:-40}}
                       source={AddGroup} />
                       
                  </View> 
                </View>
              </TouchableOpacity>
         
     </View> */}

        </View>

      </View>


    );


  }



  render() {

   



    const { image,
      _id,
      GroupName,
      GroupCategory,
      countMembers,
      privacy,
      group_Bio,
      GroupAdminName,
      groupCreateddate
    } = this.state.data;

    const images = [
      {
        uri: image ? image : PlaceHolderImage,
      },

    ];

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


          <ScrollView >



            <View>
              <View style={styles.header}>
                <View style={styles.headerContent}>

                  <TouchableOpacity onPress={() => this.setState({ isVisible: true })}>
                    <Image style={styles.avatar} source={image ? { uri: image } : PlaceHolderImage} />
                  </TouchableOpacity>

                  {this.state.isVisible &&

                    <ImageView
                      images={images}
                      imageIndex={0}
                      visible={this.state.isVisible}
                      onRequestClose={() => this.setState({ isVisible: false })}

                    />}

                  <Text style={styles.name}>
                    {GroupName}
                  </Text>
                  <Text style={styles.CountMember}>
                    Members: {countMembers}
                  </Text>
                  <Text style={{
                    fontSize: 15,
                    color: "#FFFFFF",
                    //padding:10,
                    marginLeft: 5,
                    //fontWeight:'600',
                    width: "100%",
                    alignSelf: 'center', marginTop: 5
                  }}>{privacy}</Text>


                  <Text style={{
                    fontSize: 15,
                    color: "#FFFFFF",
                    //padding:10,
                    marginLeft: 5,
                    //fontWeight:'600',
                    width: "100%",
                    alignSelf: 'center', marginTop: 5,


                  }}>Group Category: {GroupCategory}</Text>
 <Text style={styles.GroupAdminName}>Created {moment(groupCreateddate).fromNow()}</Text>
                  {/* <Text style={styles.GroupAdminName}>
                    Group owner: {GroupAdminName.join(" , ")}
                  </Text> */}

                </View>


              </View>
              {this.addMemberorShare()}
              <View style={styles.body}>
                <View style={styles.bodyContent}>
                  <Text style={styles.description}>{group_Bio}</Text>

                </View>
              </View>
            </View>
          </ScrollView>

        </View>

    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0489B1",

  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
    width: "100%",
    alignSelf: 'center',
    marginBottom: 5
  },

  CountMember: {
    fontSize: 15,
    color: "#FFFFFF",
    //padding:10,
    marginLeft: 5,
    //fontWeight:'600',
    width: "100%",
    alignSelf: 'center',
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 250,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: "#ffffff"
  },
  detailContent: {
    margin: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: "#00CED1"
  },
  count: {
    fontSize: 18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    marginTop: 0
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00CED1",
  },
  description: {
    fontSize: 20,
    color: "#00CED1",
    marginTop: 10,
    textAlign: 'center'
  },
  groupMembersContent: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: -150
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
  bodyContentInviteMember: {
    flex: 2,
    alignItems: 'center',

    // marginVertical:-5,

  },
  buttonContainerInviteMember: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
    width: "50%",
    borderRadius: 30,
    backgroundColor: "#0489B1",
  },


  bodyContentShare: {
    flex: 2,
    alignItems: 'center',

    // marginVertical:-5,

  },
  buttonContainerShare: {
    marginTop: -55,
    height: 45,
    marginLeft: 205,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
    width: "50%",
    borderRadius: 30,
    backgroundColor: "#0489B1",
  },

  GroupAdminName: {
    fontSize: 15,
    color: "#FFFFFF",
    //padding:10,
    marginLeft: 5,
    //fontWeight:'600',
    width: "100%",
    alignSelf: 'center',
    marginTop: 5
  },
});
