import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';

import {
 
  Button,
 
} from 'react-native-paper';
import ImageView from "react-native-image-viewing";
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

FAIcon.loadFont();
MDIcon.loadFont();

import AddGroup from '../../Pictures/AddGroup.png';
import Group_Name from '../../Pictures/Group_Name.png';

export default class PersonalGroupBio extends Component {

  constructor(props) {
  
    super(props);

    this.state = {
      data:
      {
        id:1, 
        image: "https://lorempixel.com/100/100/nature/1/", 
        GroupName:"Group 1", 
        countMembers:51, 
        Bio:"Various educators teach rules governing the length of paragraphs. They may say that a paragraph should be 100 to 200 words long, or be no more than five or six sentences. But a good paragraph should not be measured in characters, words, or sentences.", 
        GroupAdminName:['Mark',"Doe"]
      },
      Role:"user",//update role
      isVisible:false,
      loading: false,   
      error: null,
      currentUserOnwerId:'abc',
    }
  }


  componentDidMount() {
    this.getPermissionAsync();
    this.getCameraPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };


  getData = async ()  => {
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


   _pickImage = async () => {
    const {
      id,
      GroupName,
      countMembers,
      GroupAdminName,
      Bio,
    } = this.state.data;
    
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        
      var  Data=
        {
          id:id, 
          image: result.uri, 
          GroupName:GroupName, 
          countMembers:countMembers,
          Bio:Bio,   
          GroupAdminName:GroupAdminName 
        };

        this.setState({ data: Data });
        this.CameraOptions.close(); 
      }

    
    } catch (E) {
      console.log(E);
    }
 
};

getCameraPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};


 _clickImage = async () => {

  const {
    id,
    GroupName,
    countMembers,
    GroupAdminName,
    Bio,
  } = this.state.data;
  try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {

      var  Data=
      {
        id:id, 
        image: result.uri, 
        GroupName:GroupName, 
        countMembers:countMembers, 
        GroupAdminName:GroupAdminName,
        Bio:Bio,    
      };

      this.setState({ data: Data });


     
      this.CameraOptions.close(); 
    }

   // console.log(result);
  } catch (E) {
    console.log(E);
  }

};













  AddMembers(){

    if(this.state.Role==="admin"){
     this.props.myHookValue.push("AddMembers");
      
    }
    else{
  
      Alert.alert(
        "",
        "You need to be admin to add members to the group",
        [
          {
            text: "Ok",
            onPress: () => console.log("Ok Pressed"),
            style: "cancel"
          },
         
        ],
        { cancelable: false }
      );
  
    }
  
  
  }

  addMemberorShare=()=>{
 
    return(
  
      <View style={{ flex:1 }} >
      <View>
     {/* //this.props.myHookValue.push("ViewMembers") */}
      <TouchableOpacity style={styles.buttonContainerInviteMember}  onPress={()=>{this.props.myHookValue.push("ViewMembers")}}>
       <View>
       <View style={styles.bodyContentInviteMember}  >
                 <Text style={{fontWeight:"bold",width:"100%",alignSelf:"center",marginLeft:40,marginTop:11}}>View Members</Text> 
                 </View>
                 <View>
                   
                 <Image 
                       style={{ marginHorizontal: 5,height:30,width:35,marginLeft:150,marginTop:-40}}
                        source={Group_Name} />
                        
                   </View> 
                 </View>
               </TouchableOpacity>
     
               <View>
     
     <TouchableOpacity style={styles.buttonContainerShare}  onPress={()=>this.AddMembers()}>
      <View>
      <View style={styles.bodyContentShare}  >
                <Text style={{fontWeight:"bold",width:"100%",alignSelf:"center",marginLeft:40,marginTop:11}}>Add Members</Text> 
                </View>
                <View>
                  
                <Image 
                      style={{ marginHorizontal: 5,height:30,width:35,marginLeft:150,marginTop:-40}}
                       source={AddGroup} />
                       
                  </View> 
                </View>
              </TouchableOpacity>
         
     </View>
    
      </View>
              
        </View> 


    );
        
        
  }

  DeleteGroup(item){

    Alert.alert(
      "",
      "Do you want to delete "+this.props.GroupName+" group",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.deleteGroupfromDb(item)}
      ],
      { cancelable: false }
    );

  }


  deleteGroupfromDb(item){

    return(
    this.props.myHookValue.navigate("PersonalGroupsScreen")
    )
  }

 render() {

  if (this.state.loading) {return (
    <View style={{ flex: 1, 
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff"}}>
     <ActivityIndicator size="large" color="black" />
    </View>
  );
}

  const {image,
    id,
    GroupName,
    countMembers,
    GroupAdminName,
    Bio,
  } = this.state.data;


  const images = [
    {
      uri: image,
    },
  
  ];

    return (
      
      this.state.error != null ?
      <View style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.state.error}</Text>
        <Button onPress={
          () => {
            this.getData();
          }
        }  >
          <MaterialCommunityIcons name="reload" size={30} style={{height:15,width:15,}}/>
        </Button>
      </View> :
      <View style={styles.container}>
    <ScrollView >
       
          <View>
          <View style={styles.header}>
          
          {(this.state.Role.includes("admin")) &&<Button color="white" style={{marginLeft:350}}   onPress={()=>{this.props.myHookValue.navigate("UpdatePersonalGroupAccountInfoScreen",this.state.data)}} >
                       
          <MaterialCommunityIcons
                  name='account-edit'                
                //  color={color}
                  size={20}
                />     
            </Button>}
            <View style={styles.headerContent}>

     
            <TouchableOpacity  onPress={() => this.setState({isVisible:true})}>
                <Image style={styles.avatar} source={{uri: image}}/>

                </TouchableOpacity>
            
              
                {(this.state.Role.includes("admin")) &&<Button color="white" style={{marginLeft:120,marginTop:-30,marginBottom:10}}   onPress={() => this.CameraOptions.open()}>
                  <MaterialIcons
                  name='edit'
                  
                //  color={color}
                  size={20}
                /></Button>}
                {/* <MaterialIcons
                  name='edit'
                  style={{marginLeft:120,marginTop:-30,marginBottom:10}}
                //  color={color}
                  size={20}
                /> */}

            


                {this.state.isVisible&&
            
            <ImageView
  images={images}
  imageIndex={0}
  visible={this.state.isVisible}
  onRequestClose={() =>  this.setState({isVisible:false})}
 
/> }
                <Text style={styles.name}>
                  {this.props.GroupName.GroupName}
                </Text>
                <Text style={styles.CountMember}>
                  Members: {countMembers}
                </Text>
                <Text style={styles.GroupAdminName}>
                  Group Admin: {GroupAdminName.join(" , ")}
                </Text>
              


                {(this.state.Role.includes("admin")) &&<Button color="white" style={styles.groupMembersContent}   onPress={()=>this.DeleteGroup(id)} >Delete Group</Button>}
            </View>
          

          </View>
          {this.addMemberorShare()}
        
          <View style={styles.body}>
            <View style={styles.bodyContent}>
          
              <Text style={styles.description}>{Bio}</Text>
             
          </View>
        </View>
      
      </View>
        

     
      </ScrollView>



      <RBSheet
          ref={ref => {
            this.CameraOptions = ref;
          }}
          height={330}
        >
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Change Group Avatar</Text>
          
              <TouchableOpacity
                
                style={styles.listButton}
                onPress={() => this._clickImage()}
              >
                <MDIcon name="photo-camera" style={styles.listIcon} />
                <Text style={styles.listLabel}>Take photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                
                style={styles.listButton}
                onPress={() => this._pickImage()}
              >
                <MDIcon name="photo" style={styles.listIcon} />
                <Text style={styles.listLabel}>Choose image</Text>
              </TouchableOpacity>
           
          </View>
        </RBSheet>

      </View>
    
    
    
      );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#0489B1",
   
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
    width:"100%", 
   alignSelf: 'center',
   marginBottom:5
  },
  
  CountMember:{
    fontSize:15,
    color:"#FFFFFF",
    //padding:10,
    marginLeft:5,
    //fontWeight:'600',
    width:"100%", 
   alignSelf: 'center',
  },
  GroupAdminName:{
    fontSize:15,
    color:"#FFFFFF",
    //padding:10,
    marginLeft:5,
    //fontWeight:'600',
    width:"100%", 
   alignSelf: 'center',
   marginTop:5
  },
  profileDetail:{
    alignSelf: 'center',
    marginTop:250,
    alignItems: 'center',
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  detailContent:{
    margin:10,
    alignItems: 'center'
  },
  title:{
    fontSize:20,
    color: "#00CED1"
  },
  count:{
    fontSize:18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    marginTop:0
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00CED1",
  },
  description:{
    fontSize:20,
    color: "#00CED1",
    marginTop:10,
    textAlign: 'center'
  },
  groupMembersContent:{
    flexDirection:'row',
   // marginTop:10,
    marginLeft:-230,
    marginBottom:-20
  },
   mainContent: {
    marginRight: 60
  },
  memberImage: {
    height: 30,
    width: 30,
    marginRight:4,
    borderRadius:10,

  },
  bodyContentInviteMember: {
    flex: 2,
    alignItems: 'center',
   
  // marginVertical:-5,
 
  }, 
  buttonContainerInviteMember: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom:10,
    width:"50%",
    borderRadius:30,
    backgroundColor: "#0489B1",
  },

  
  bodyContentShare: {
    flex: 2,
    alignItems: 'center',
   
  // marginVertical:-5,
 
  }, 
  buttonContainerShare: {
    marginTop:-55,
    height:45,
    marginLeft:205,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom:10,
    width:"50%",
    borderRadius:30,
    backgroundColor: "#0489B1",
  },


  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    marginLeft:10,
    color: "#666",
    fontWeight:"bold",
    marginTop:10
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginLeft:10,
  },
  listIcon: {
    fontSize: 26,
    color: "#666",
    width: 60
  },
  listLabel: {
    fontSize: 16
  },
});
 