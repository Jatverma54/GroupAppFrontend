import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
  FlatList,
  Button,
  Container, Content,  Thumbnail 
} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Card,
  Caption,
  Paragraph,
} from 'react-native-paper';
import DrawerLogo from '../Pictures/DrawerLogo.png';
import FbImages from '../components/FacebookPostImage';
import Like from '../Pictures/Like.png';
import Comment from '../Pictures/Comment.png';
import Post_Add from '../Pictures/Post_Add.png';
import AddGroup from '../Pictures/AddGroup.png';
import ShareIcon from '../Pictures/ShareIcon.png';

export default class Stories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:"1", title: "Add Story",       time:"1 days a go",    image:"https://lorempixel.com/400/200/nature/6/"},
        {id:"2", title: "Jatin",       time:"1 days a go",    image:"https://lorempixel.com/400/200/nature/6/"},
        {id:"3", title: "Amit",        time:"2 minutes a go",   image:"https://lorempixel.com/400/200/nature/5/"} ,
        {id:"4", title: "XYZ Name",     time:"3 hour a go",      image:"https://lorempixel.com/400/200/nature/4/"}, 
        {id:"5", title: "XYZ Name",      time:"4 months a go",    image:"https://lorempixel.com/400/200/nature/6/"}, 
        {id:"6", title: "XYZ Name",      time:"5 weeks a go",     image:"https://lorempixel.com/400/200/sports/1/"}, 
        {id:"7", title: "XYZ Name",        time:"6 year a go",      image:"https://lorempixel.com/400/200/nature/8/"}, 
        {id:"8", title: "XYZ Name",    time:"7 minutes a go",   image:"https://lorempixel.com/400/200/nature/1/"}, 
        {id:"9", title: "XYZ Name",          time:"8 days a go",      image:"https://lorempixel.com/400/200/nature/3/"},
        {id:"10", title: "XYZ Name", time:"9 minutes a go",   image:"https://lorempixel.com/400/200/nature/4/"},
      ]
    };
  }



  render() {
         

    return (
      
      <View style={styles.container}>
        
          
           
        <FlatList style={styles.list} 

        
horizontal={true}
showsHorizontalScrollIndicator={false}

          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
         
          renderItem={(post) => {
            const item = post.item;
          
            return (
                <View style={{ flex:1 }} >
                <View style={{ height: 100,padding:10 }}>
               
                
                <View style={{ flex: 3 ,backgroundColor:"white" }}>
                         
                      <View>
                       
                         <Avatar.Image 
                            style={{ marginHorizontal:2, borderColor: 'black', borderWidth: 2 }}
                             source={{uri:item.image}} size={60}/>
                       
                           <Text style={{fontSize:12,alignSelf:"center",paddingTop:6}}>{item.title}</Text>
                      </View>                
                    
                </View>
                            
              </View>
            
         
               </View>
            )
    }}/>


<View style={{ flex:1 }} >
 <View>

 <TouchableOpacity style={styles.buttonContainerInviteMember}  onPress={()=>this.props.nav.myHookValue.push("CreateaNewPost")}>
  <View>
  <View style={styles.bodyContentInviteMember}  >
            <Text style={{fontWeight:"bold",width:"100%",alignSelf:"center",marginLeft:40,marginTop:11}}>Add Members</Text> 
            </View>
            <View>
              
            <Image 
                  style={{ marginHorizontal: 5,height:30,width:35,marginLeft:150,marginTop:-40}}
                   source={AddGroup} />
                   
              </View> 
            </View>
          </TouchableOpacity>

          <View>

<TouchableOpacity style={styles.buttonContainerShare}  onPress={()=>this.props.nav.myHookValue.push("CreateaNewPost")}>
 <View>
 <View style={styles.bodyContentShare}  >
           <Text style={{fontWeight:"bold",width:"100%",alignSelf:"center",marginLeft:40,marginTop:11}}>Share Group</Text> 
           </View>
           <View>
             
           <Image 
                 style={{ marginHorizontal: 5,height:30,width:35,marginLeft:150,marginTop:-40}}
                  source={ShareIcon} />
                  
             </View> 
           </View>
         </TouchableOpacity>


</View>



 </View>
         
 
    <TouchableOpacity style={styles.buttonContainer}  onPress={()=>this.props.nav.myHookValue.push("CreateaNewPost")}>
  <View>
  <View style={styles.bodyContent}  >
            <Text style={{fontWeight:"bold",width:"100%",marginLeft:50,marginTop:11}}>Start a conversation</Text> 
            </View>
            <View>
              
            <Image 
                  style={{ marginHorizontal: 5,height:30,width:35,marginLeft:350,marginTop:-40}}
                   source={Post_Add} />
              </View> 
            </View>
          </TouchableOpacity> 
   </View> 
    </View>
    );

  
  }
}


 


const styles = StyleSheet.create({
  container:{
    flex:1,
    //marginTop:5,
  },
  list: {
   // paddingHorizontal: 4,
    backgroundColor:"white",
   // paddingHorizontal: 4,
  //paddingStart: 5,
   // paddingEnd: 5,
  },
  separator: {
   // marginTop: 0,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
  },
  cardHeader: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle:{

  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    
   
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    flex: 1,
    height: 300,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:16,
    fontWeight:'bold',
    flex:1,
   marginLeft:60,
   marginTop:-45
  
  },
  time:{
    fontSize:12,
    color: "#808080",  
    marginLeft:60,
   
  },
  title2:{
    fontSize:18,
    flex:1,
   
  },
  time2:{
    fontSize:13,
    color: "#808080",  
    
   
  },
  icon: {
    width:25,
    height:25,
    marginRight:5
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
   
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
   
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    
    
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  bodyContent: {
    flex: 2,
    alignItems: 'center',
   
  // marginVertical:-5,
 
  }, 
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width:"100%",
    borderRadius:30,
    backgroundColor: "white",
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
    backgroundColor: "white",
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
    backgroundColor: "white",
  }

});  