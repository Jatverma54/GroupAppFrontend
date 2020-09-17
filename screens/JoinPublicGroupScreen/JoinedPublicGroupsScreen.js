import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { 
  Button,
} from 'react-native-paper';
import  UserToken from '../../constants/APIPasswordCollection';

export default class JoinedPublicGroupsScreen extends Component {


  constructor(props) {
  
    
    super(props);
   
    this.state = {
      data:[

        {
          GroupCategory:"Your Groups",
          data:[
            {
          id:1, 
          image: "https://lorempixel.com/100/100/nature/1/", 
          GroupName:"Multiple Myeloma story of hope and courage", 
          countMembers:51,  
          GroupCategory:"HealthCare"
        },
        {
          id:2, 
          image: "https://lorempixel.com/100/100/nature/1/", 
          GroupName:"Group 2", 
          countMembers:51,  
          GroupCategory:"Entertainment"
        },
      
      
      
      
      ]
          },


        {
          GroupCategory:"Healthcare",
          data:[
            {
          id:1, 
          image: "https://lorempixel.com/100/100/nature/1/", 
          GroupName:"Group 1", 
          countMembers:51,  
          GroupCategory:"HealthCare"
        },
        {
          id:2, 
          image: "https://lorempixel.com/100/100/nature/1/", 
          GroupName:"Group 2", 
          countMembers:51,  
          GroupCategory:"HealthCare"
        },
      
      
      
      
      ]
          },
       
          {
            GroupCategory:"Entertainment",
            data:[
              {
            id:1, 
            image: "https://lorempixel.com/100/100/nature/1/", 
            GroupName:"Group 1", 
            countMembers:51,  
            GroupCategory:"Entertainment",
          }]
            },
        
      ],
      isFetching:false,
      loading: false,   
      error: null,
    
        
    }

   
  }




  componentDidMount(){
   
   
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
            isFetching: false
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
        }  >
          <MaterialCommunityIcons name="reload" size={30} style={{height:15,width:15,}}/>
        </Button>
      </View> :
<View  style={styles.FloatButtonPlacement} > 


      <SectionList 
        style={styles.root}
        sections={this.state.data}
        data={this.state.data}
        extraData={this.state}
        refreshControl={
          <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
        }
    
        renderSectionHeader={({section}) => {
          return (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {section.GroupCategory}
              </Text>
            </View>
          )
        }}
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
              <TouchableOpacity  onPress={()=>this.props.myHookValue.navigate("JoinedPublicGroupBio",Group)}>
              <Image source={{uri:Group.image}} style={styles.avatar}/>
              </TouchableOpacity>

              <TouchableOpacity  onPress={()=>this.props.myHookValue.navigate("JoinedGroupInsideGroup",Group)}>
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                    <Text style={styles.groupName}>{Group.GroupName}</Text>
                  </View>
                  <Text style={styles.countMembers}>
                    {Group.countMembers} members
                  </Text>
                  <Text style={styles.timeAgo}>
                    Updated 2 months ago
                  </Text>
                  {/* {this.renderGroupMembers(Group)} */}
                </View>
              </View>
              </TouchableOpacity>        
            </View>    
           
          );
        }}/>


    </View>  
    
    
    
     );
  }
};






const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start',
    width:"90%"
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
    fontSize:12,
    color:"#696969"
  },
  groupName:{
    fontSize:19,
    color:"#1E90FF",
  },
  groupMembersContent:{
    flexDirection:'row',
    marginTop:10
  },
   FloatButtonPlacement:{
    flex: 1,
    
  },
  titleContainer:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
   // marginVertical:2,
    backgroundColor:"#DCDCDC",
    padding:5,
 
  },
  title:{
    fontSize:20,
  
    color:"#686E70",
    marginLeft:7
  
  },
});   