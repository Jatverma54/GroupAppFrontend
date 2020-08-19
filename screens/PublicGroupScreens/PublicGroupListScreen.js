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
  button
} from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import actions from '../../components/FloatingActionsButton';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';
import {  SearchBar } from "react-native-elements";
import DialogInput from 'react-native-dialog-input';


export default class PublicGroupListScreen extends Component {


  constructor(props) {
  
    super(props);

    this.state = {
      data:[
        {
          id:1, 
          image: "https://lorempixel.com/100/100/nature/1/", 
          GroupName:"Group 1", 
          countMembers:51, 
          isJoined: true ,
          isReuquested: false,
          GroupCategory:"HealthCare"
        },
        {
          id:2, 
          image: "https://lorempixel.com/100/100/nature/2/", 
          GroupName:"Group 2", 
          countMembers:10,  
          isJoined: false ,
          isReuquested: true,
          GroupCategory:"HealthCare"
        },
        {
          id:3, 
          image: "https://lorempixel.com/100/100/nature/3/", 
          GroupName:"Group 3",
          isJoined: false ,
          isReuquested: false, 
          countMembers:58,  
          GroupCategory:"HealthCare"
        },
    
        
      ],


      temp:[
        {
          id:1, 
          image: "https://lorempixel.com/100/100/nature/1/", 
          GroupName:"Group 1", 
          countMembers:51, 
          isJoined: true ,
          isReuquested: false,
          GroupCategory:"HealthCare"
        },
        {
          id:2, 
          image: "https://lorempixel.com/100/100/nature/2/", 
          GroupName:"Group 2", 
          countMembers:10,  
          isJoined: false ,
          isReuquested: true,
          GroupCategory:"HealthCare"
        },
        {
          id:3, 
          image: "https://lorempixel.com/100/100/nature/3/", 
          GroupName:"Group 3",
          isJoined: false ,
          isReuquested: false, 
          countMembers:58,  
          GroupCategory:"HealthCare"
        },
    
        
      ],



      isFetching:false,
      
      loading: false,   
      error: null,
      isDialogVisible: false,
      inputText:'',
      itemData:''
    }
  }
 


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

  onRefresh() {
    this.setState({ isFetching: true }, function() { this.searchRandomUser() });
  }
  
  
  searchRandomUser = async () =>
  {
    //  const RandomAPI = await fetch('https://randomuser.me/api/?results=20')
    //  const APIValue = await RandomAPI.json();
    //   const APIResults = APIValue.results
    //     console.log(APIResults[0].email);
  
  
    data2=[ {id:"1", title: "Jatin sjhhjashasjhadddssddsdsdsdsjhasasjhasjhh",      countLikes:"51",    countcomments:"21" ,         time:"1 days a go", postMetaData:"This is an example postThis is an example post",   image:"https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
    LikePictures:[
      
          
           //"https://bootdey.com/img/Content/avatar/avatar6.png", 
          // "https://bootdey.com/img/Content/avatar/avatar1.png", 
          // "https://bootdey.com/img/Content/avatar/avatar2.png",
          // "https://bootdey.com/img/Content/avatar/avatar7.png",
          // "https://bootdey.com/img/Content/avatar/avatar3.png",
         // "https://bootdey.com/img/Content/avatar/avatar4.png"
          
        ]
      },
   ]
        this.setState({
            data:data2,
            isFetching: false,

        })
  
  }
  

  renderGroupMembers = (group) => {
    
    if(group.members) {
      return (
        <View style={styles.groupMembersContent}>
          {group.members.map((prop, key) => {
            return (
              <Image key={key} style={styles.memberImage}  source={{uri:prop}}/>
            );
          })}
        </View>
      );
    }
    return null;
  }

  SendJoinRequest(data){
  
    data.item.isReuquested = !data.item.isReuquested;
    
    
   
    if (!data.item.isReuquested)
    {
      data.item.JoiningReason=  'Delete Join Request';
    }
  
  //  data.item.isLiked ? data.item.LikePictures.push("https://www.bootdey.com/img/Content/avatar/avatar1.png")
  //    : data.item.LikePictures=data.item.LikePictures.filter(item => item !== "https://www.bootdey.com/img/Content/avatar/avatar1.png");
   
    const index = this.state.data.findIndex(
      item => data.item.id === item.id
    );
  
  
    this.state.data[index] = data.item;
    


    this.setState({
      data: this.state.data,
    
   
    });


  

  }

  SendJoinRequestPopUp(data,inputText){
  
    data.item.isReuquested = !data.item.isReuquested;
    
     
    // data.item.isReuquested?this.showDialog(true):this.showDialog(false)
   
    if (data.item.isReuquested)
    {
      data.item.JoiningReason=  inputText;
    }
  
  //  data.item.isLiked ? data.item.LikePictures.push("https://www.bootdey.com/img/Content/avatar/avatar1.png")
  //    : data.item.LikePictures=data.item.LikePictures.filter(item => item !== "https://www.bootdey.com/img/Content/avatar/avatar1.png");
   
    const index = this.state.data.findIndex(
      item => data.item.id === item.id
    );
  
  
    this.state.data[index] = data.item;
    


    this.setState({
      data: this.state.data,
    
   
    });


console.log(this.state.data,"Ccccccccccccccccccccccc")

  }


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
      // height: 0.5,
      // backgroundColor: "#CCCCCC",
      // width:"78%",
      // marginLeft:80
  
      placeholder="Type a group name.."
         lightTheme  round editable={true}
         // containerStyle={{height:35,paddingBottom:40,}}
         containerStyle={{
         borderBottomColor:"#CCCCCC",
         borderBottomWidth:0.5,
         borderBottomStartRadius:170,
         borderBottomEndRadius:40,     
         }}
         platform="android"
          inputStyle={{color:"black"}}
          value={this.state.search}
        
         
          onChangeText={this.updateSearch} />; 
  }; 

  updateSearch = search => {
        this.setState({ search }, () => {
            if ('' == search) {

              
                this.setState({
                    data: [...this.state.temp],
                   
                });
                return;
            }
           
            this.setState({
     
              searchStarted:true
             
            
            })

            this.state.data = this.state.temp.filter(function(item){
                return item.GroupName.includes(search);
              }).map(function({id, GroupName, image,countMembers,isJoined,isReuquested,GroupCategory}){
                return {id, GroupName, image,countMembers,isJoined,isReuquested,GroupCategory};
            });
        });
      
     
        this.setState({
     
          searchStarted:false
         
        
        })
  };




  showDialog(isShow,item){
    this.setState({isDialogVisible: isShow,itemData:item});
  }
  
  sendInput(inputText){

     this.showDialog(false)
    this.SendJoinRequestPopUp( this.state.itemData,inputText)
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
  
    
    return (
      this.state.error != null ?
      <View style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.state.error}</Text>
        <Button onPress={
            () => {
              this.getData();
            }
          } title="Reload" />
      </View> :
   <View  style={styles.FloatButtonPlacement} > 


<DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"Why do you want to be a group member"}
                    message={"Let admin know the reason"}
                    hintInput ={"Please Type here.."}
                  
                    submitInput={ (inputText) => {this.sendInput(inputText)} }
                    closeDialog={ () => {this.showDialog(false)}}>
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
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Group = item.item;
          let mainContentStyle;
          if(Group.attachment) {
            mainContentStyle = styles.mainContent;
          }
          return(
           
            <View style={styles.container}>

                <TouchableOpacity onPress={()=>this.props.myHookValue.navigate("PublicGroupBio",Group)}>
              <Image source={{uri:Group.image}} style={styles.avatar}/>
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                  <TouchableOpacity onPress={()=>Group.isJoined?this.props.myHookValue.navigate("JoinedGroupInsideGroup",Group):this.props.myHookValue.navigate("PublicGroupBio",Group)}>
                    <Text style={styles.groupName}>{Group.GroupName}</Text>
                    </TouchableOpacity>
                  </View>
                 
                  <Text style={styles.countMembers}>
                    {Group.countMembers} members
                  </Text>
                  
                  <View style={styles.ButtonContainer}>
              <View style={styles.button}>

              {Group.isJoined?
                <Button title="Joined"  />

              : (Group.isReuquested)?
              <Button title="Requested" color="grey" onPress={()=>this.SendJoinRequest(item)} />

              :<Button title="Join Group" color={colors.ExploreGroupsLoginButtonColor} onPress={()=>this.showDialog(true,item)} />
              }
                
                </View>
              </View> 
                </View>
                
              </View>
              
            </View>       
                
          );
        }}/>

     <FloatingActionButton/>
    </View>  
    
  
    
     );
  }
};

const FloatingActionButton =()=>{
  const navigation = useNavigation();
  return(
  <FloatingAction
  actions={actions}
  onPressItem={name => {
    navigation.push('Create a Public Group');
   //  console.log(`selected button: ${name}`);
  }}/>   
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
    width:53,
    height:53,
    borderRadius:25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap:'wrap'
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
    marginRight:4,
    borderRadius:10,
  },
  separator: {
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width:"78%",
    marginLeft:80

  },

  countMembers:{
    color:"#20B2AA"
  },
  timeAgo:{
    marginRight:-70,
    fontSize:12,
    color:"#696969"
  },
  groupName:{
    fontSize:19,
    color:"#1E90FF"
  },
  groupMembersContent:{
    flexDirection:'row',
    marginTop:10
  },
   FloatButtonPlacement:{
    flex: 1,
    
  },
  button: {
  //flexDirection:'row',
   width: "50%",
   fontWeight: "bold",
  // justifyContent: 'center',
   //alignItems: 'center',
},
ButtonContainer: {
   flex: 2,
   width: '100%',
  // justifyContent: 'center',
  // alignItems: 'center',
  //paddingTop: 10,
 marginVertical: 10,
// marginRight: -40
},
});   