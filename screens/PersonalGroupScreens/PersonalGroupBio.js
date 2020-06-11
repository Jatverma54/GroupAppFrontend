import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Post_Add from '../../Pictures/Post_Add.png';
import AddGroup from '../../Pictures/AddGroup.png';
import Group_Name from '../../Pictures/Group_Name.png';

export default class PersonalGroupBio extends Component {

  constructor(props) {
  
    super(props);

    this.state = {
      data:[
        {
          id:1, 
          image: "https://lorempixel.com/100/100/nature/1/", 
          name:"Group 1", 
          countMembers:51, 
          Bio:"Various educators teach rules governing the length of paragraphs. They may say that a paragraph should be 100 to 200 words long, or be no more than five or six sentences. But a good paragraph should not be measured in characters, words, or sentences. The true measure of your paragraphs should be ideas.", 
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
    }
  }


  renderGroupMembers = (item) => {
   
    if(item.members) {
     
      return (
        <View style={styles.groupMembersContent}>
          {item.members.map((prop, key) => {
           
            return (
              <Image key={key} style={styles.memberImage}  source={{uri:prop}}/>
            );
          })}
        </View>
      );
    }
    return null;
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
     
     <TouchableOpacity style={styles.buttonContainerShare}  onPress={()=>{}}>
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



 render() {


    return (
      <View style={styles.container}>


   <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          extraData={this.state}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
        
          renderItem={(post) => {
            const item = post.item;

           
        return(
          <View>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: item.image}}/>
                <Text style={styles.name}>
                  {this.props.GroupName}
                </Text>
                <Text style={styles.CountMember}>
                  Members: {item.countMembers}
                </Text>
                {this.renderGroupMembers(item)}
            </View>
          

          </View>
          {this.addMemberorShare()}
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.description}>{item.Bio}</Text>
              
          </View>
        </View>
      </View>
        )

      }}/>
     
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
    marginTop:10,
    marginLeft:-150
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
  }
});
 