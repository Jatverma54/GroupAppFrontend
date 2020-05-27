import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SectionList
} from 'react-native';


export default class JoinedPublicGroupsScreen extends Component {


  constructor(props) {
  
    super(props);

    this.state = {
      data:[
        {
          GroupCategory:"Healthcare",
          data:[
            {
          id:1, 
          image: "https://lorempixel.com/100/100/nature/1/", 
          name:"Group 1", 
          countMembers:51,  
          members:[
            
            "https://bootdey.com/img/Content/avatar/avatar6.png", 
            "https://bootdey.com/img/Content/avatar/avatar1.png", 
            "https://bootdey.com/img/Content/avatar/avatar2.png",
            "https://bootdey.com/img/Content/avatar/avatar7.png",
            "https://bootdey.com/img/Content/avatar/avatar3.png",
            "https://bootdey.com/img/Content/avatar/avatar4.png"
            
          ]
        },
        {
          id:2, 
          image: "https://lorempixel.com/100/100/nature/1/", 
          name:"Group 2", 
          countMembers:51,  
          members:[
            
            "https://bootdey.com/img/Content/avatar/avatar6.png", 
            "https://bootdey.com/img/Content/avatar/avatar1.png", 
            "https://bootdey.com/img/Content/avatar/avatar2.png",
            "https://bootdey.com/img/Content/avatar/avatar7.png",
            "https://bootdey.com/img/Content/avatar/avatar3.png",
            "https://bootdey.com/img/Content/avatar/avatar4.png"
            
          ]
        },
      
      
      
      
      ]
          },
       
          {
            GroupCategory:"Entertainment",
            data:[
              {
            id:1, 
            image: "https://lorempixel.com/100/100/nature/1/", 
            name:"Group 1", 
            countMembers:51,  
            members:[
              
              "https://bootdey.com/img/Content/avatar/avatar6.png", 
              "https://bootdey.com/img/Content/avatar/avatar1.png", 
              "https://bootdey.com/img/Content/avatar/avatar2.png",
              "https://bootdey.com/img/Content/avatar/avatar7.png",
              "https://bootdey.com/img/Content/avatar/avatar3.png",
              "https://bootdey.com/img/Content/avatar/avatar4.png"
              
            ]
          }]
            },
        
      ],
        
    }
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
    
    return (

 
    

<View  style={styles.FloatButtonPlacement} > 


      <SectionList 
        style={styles.root}
        sections={this.state.data}
        data={this.state.data}
        extraData={this.state}
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
                    <Text style={styles.groupName}>{Group.name}</Text>
                  </View>
                  <Text style={styles.countMembers}>
                    {Group.countMembers} members
                  </Text>
                  <Text style={styles.timeAgo}>
                    Updated 2 months ago
                  </Text>
                  {this.renderGroupMembers(Group)}
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
    alignItems: 'flex-start'
  },
  avatar: {
    width:55,
    height:55,
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
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  countMembers:{
    color:"#20B2AA"
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  groupName:{
    fontSize:23,
    color:"#1E90FF"
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