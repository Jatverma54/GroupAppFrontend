import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';


export default class JoinedPublicGroupsScreen extends Component {


  constructor(props) {
  
    super(props);

    this.state = {
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
          image: "https://lorempixel.com/100/100/nature/2/", 
          name:"Group 2", 
          countMembers:10,  
          members:[
            "https://bootdey.com/img/Content/avatar/avatar6.png", 
            "https://bootdey.com/img/Content/avatar/avatar1.png", 
          ]
        },
        {
          id:3, 
          image: "https://lorempixel.com/100/100/nature/3/", 
          name:"Group 3", 
          countMembers:58,  
          members:[
            "https://bootdey.com/img/Content/avatar/avatar6.png", 
            "https://bootdey.com/img/Content/avatar/avatar1.png", 
            "https://bootdey.com/img/Content/avatar/avatar2.png"
          ]
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


      <FlatList 
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
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
            <TouchableOpacity  onPress={()=>this.props.myHookValue.push("JoinedGroupInsideGroup")}>
            <View style={styles.container}>
              <Image source={{uri:Group.image}} style={styles.avatar}/>
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
             
            </View>    
            </TouchableOpacity>        
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
});   