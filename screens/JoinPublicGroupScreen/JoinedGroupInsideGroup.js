import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Clipboard ,
  TouchableHighlight,
  Modal,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,

  Container, Content,  Thumbnail,Share
} from 'react-native';
import {
  Button,
  Paragraph, 
  Menu,
  Divider, 
  Provider ,
  Avatar,
 
} from 'react-native-paper';

import DrawerLogo from '../../Pictures/DrawerLogo.png';
import FbImages from '../JoinPublicGroupScreen/PostImagesJoinedGroup';
import Like from '../../Pictures/Like.png';
import Comment from '../../Pictures/Comment.png';
import Post_Add from '../../Pictures/Post_Add.png';
import AddGroup from '../../Pictures/AddGroup.png';
import ShareIcon from '../../Pictures/ShareIcon.png';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MaterialCommunityIcons,FontAwesome,MaterialIcons } from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';
import PDFReader from 'rn-pdf-reader-js'
import Close_icon from '../../Pictures/Close_icon.png';
// import Comments from '../../components/Comment/Comments'
import ParsedText from 'react-native-parsed-text';
import * as Linking from 'expo-linking';

export default class JoinedGroupInsideGroupFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:"1", title: "Jatin sjhhjashasjhadddssddsdsdsdsjhasasjhasjhh",      countLikes:"51",    countcomments:"21" ,         time:"1 days a go", postMetaData:"This is an example postThis is an example post",   image:"https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
        LikePictures:[
          
              
               //"https://bootdey.com/img/Content/avatar/avatar6.png", 
              // "https://bootdey.com/img/Content/avatar/avatar1.png", 
              // "https://bootdey.com/img/Content/avatar/avatar2.png",
              // "https://bootdey.com/img/Content/avatar/avatar7.png",
              // "https://bootdey.com/img/Content/avatar/avatar3.png",
             // "https://bootdey.com/img/Content/avatar/avatar4.png"
              
            ]
          },
       
      
      
    
        {id:"2", title: "Amit",     countLikes:"",     countcomments:"" ,      time:"2 minutes a go",  postMetaData:"This is an https://facebook.com example post", image:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        LikePictures:[
              "https://bootdey.com/img/Content/avatar/avatar6.png", 
              "https://bootdey.com/img/Content/avatar/avatar1.png", 
              "https://bootdey.com/img/Content/avatar/avatar2.png",
              // "https://bootdey.com/img/Content/avatar/avatar7.png",
              // "https://bootdey.com/img/Content/avatar/avatar3.png",
              // "https://bootdey.com/img/Content/avatar/avatar4.png"
              
          
          
        ]} ,
        {id:"3", title: "XYZ Name",     countLikes:"1",   countcomments:"2" ,       time:"3 hour a go",  postMetaData:"This is an jatinv2395@gmail.com example post",    image:["https://bootdey.com/img/Content/avatar/avatar1.png" ,"https://bootdey.com/img/Content/avatar/avatar6.png" ],
      
      
        LikePictures:[
         
              
              "https://bootdey.com/img/Content/avatar/avatar6.png", 
              "https://bootdey.com/img/Content/avatar/avatar1.png", 
              "https://bootdey.com/img/Content/avatar/avatar2.png",
              "https://bootdey.com/img/Content/avatar/avatar7.png",
              "https://bootdey.com/img/Content/avatar/avatar3.png",
              "https://bootdey.com/img/Content/avatar/avatar4.png"
        ]
          },
       
      
     
        {id:"4", title: "XYZ Name",   countLikes:"51",  countcomments:"21" ,    time:"4 months a go",  postMetaData:"This is an example post",  image:[ "https://bootdey.com/img/Content/avatar/avatar8.png", "https://bootdey.com/img/Content/avatar/avatar7.png"],
      
        LikePictures:[
         
              "https://bootdey.com/img/Content/avatar/avatar6.png", 
              "https://bootdey.com/img/Content/avatar/avatar1.png", 
              "https://bootdey.com/img/Content/avatar/avatar2.png",
              "https://bootdey.com/img/Content/avatar/avatar7.png",
              "https://bootdey.com/img/Content/avatar/avatar3.png",
              "https://bootdey.com/img/Content/avatar/avatar4.png"
              
            ]
          }, 
      
      ],
      isVisible: false,
      MaximizeImage:'',
      isDocumentVisible: false,
      OpenDucumentUri:'',
      numberOfLines:14,
      Role:"user", 
     
    };
  }

  componentDidMount(){
    this.changeScreenOrientation();
  }
  
  async changeScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    }




    Likes() {
      if (this.state.msg.length > 0) {
        var data = this.state.data;
        data.push({
          id:Math.floor((Math.random() * 99999999999999999) + 1),
          name: "example",
          comment: this.state.msg,
          image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'
        });
        this.setState({data:data,msg:'',height:40});
      //   setTimeout(() => {
      //     this.reply();
      //   }, 2000);
      }
    }
  






  PostScreen=()=>{
 
    return(
  
      <View style={{ flex:1 }} >
 <View>

 <TouchableOpacity style={styles.buttonContainerInviteMember}  onPress={()=>this.props.myHookValue.push("AddMembers")}>
  <View>
  <View style={styles.bodyContentInviteMember}  >
            <Text style={{fontWeight:"bold",width:"100%",alignSelf:"center",marginLeft:40,marginTop:11}}>Invite Members</Text> 
            </View>
            <View>
              
            <Image 
                  style={{marginHorizontal: 5,height:25,width:30,marginLeft:150,marginTop:-35}}
                   source={AddGroup} />
                   
              </View> 
            </View>
          </TouchableOpacity>
  
          <View>

<TouchableOpacity style={styles.buttonContainerShare}  onPress={()=>this.onShare()}>
 <View>
 <View style={styles.bodyContentShare}  >
           <Text style={{fontWeight:"bold",width:"100%",alignSelf:"center",marginLeft:40,marginTop:11}}>Share Group</Text> 
           </View>
           <View>
             
           <Image 
                 style={{marginHorizontal: 5,height:25,width:30,marginLeft:150,marginTop:-35}}
                  source={ShareIcon} />
                  
             </View> 
           </View>
         </TouchableOpacity>


</View>



 </View>
         
 
    <TouchableOpacity style={styles.buttonContainer}  onPress={()=>this.props.myHookValue.push("CreateaNewPost")}>
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
          {this.state.data.length===0&&<View style={{alignSelf:"center",flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:270}}><Text style={{alignSelf:"center",color:"grey",fontWeight:"900"}} >No Posts to Show</Text></View>}
   </View> 
    );
        
        
  }

  renderGroupMembers = (item) => {
    
    if(item.LikePictures.length>0) {
      return (
        <View>
           <TouchableOpacity  onPress={()=>this.props.navigation.push("Likes")}>
        <View style={styles.groupMembersContent}>
          {item.LikePictures.map((prop, key) => {
            return (
              <Image key={key} style={styles.memberImage}  source={{uri:prop}}/>
            );
          })}


        </View>
        </TouchableOpacity>
          <Divider style={{height: 0.5,marginTop:4,marginLeft:20, width: "35%",backgroundColor:"grey"}}/> 
        </View>
      );
    }
    return <View>
      <View style={styles.groupMembersContent}><Text>Be the first one to like</Text>
    </View>
    <Divider style={{height: 0.5,marginTop:4,marginLeft:20, width: "35%",backgroundColor:"grey"}}/> 
     </View>
  }



  onShare = async () => {
    try {
      const result = await Share.share({
     
      message: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

 copyText(item){

  Clipboard.setString(item)

 alert('Copied to clipboard')
 }
 
 renderViewMore(onPress){
  return(
    <Text style={{color:"grey",fontWeight:"bold"}} onPress={onPress}>View more</Text>
  )
}
renderViewLess(onPress){
  return(
    <Text style={{color:"grey",fontWeight:"bold"}} onPress={onPress}>View less</Text>
  )
}

delete(item){

  Alert.alert(
    "",
    "Do you want to delete the post",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: () => this.deletearray(item)}
    ],
    { cancelable: false }
  );
};

deletearray(item){
  
  console.log(item.id, "first ")
 
  const index = this.state.data.findIndex(
    items => item.id === items.id
  );
 
   this.setState({
    data: this.state.data.filter((x,i) => i != index) })
  

 
    
  console.log(this.state.data,"updated")
}



handleUrlPress(url) {
  console.log(`url: ${url} has been pressed!`);
  Linking.openURL(url);
}

handlePhonePress(phone) {
  console.log(`phone ${phone} has been pressed!`);
}

handleNamePress(name) {
  console.log(`Hello ${name}`);
}

handleEmailPress(email) {
  console.log(`send email to ${email}`);
  Linking.openURL("mailto:"+email);
}

renderText(matchingString, matches) {
  // matches => ["[@michel:5455345]", "@michel", "5455345"]
  let pattern = /@(\w+)/;
  let match = matchingString.match(pattern);
  return `${match[1]}`;
}










  render() {
      try{   

    return (
    
      <View style={styles.container}>

{this.state.data.length!=0?
   
     <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id.toString();
          }}
         
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
         
          ListHeaderComponent={
           this.PostScreen
           
       }
      
          renderItem={(post) => {
            const item = post.item;
          
            return (

              <View style={styles.card}>

              
         
               <View style={styles.cardHeader}>
               
                  <View>
                  <Avatar.Image size={45}
                  style={{ marginHorizontal: 5, borderColor: 'black', borderWidth: 2 }}
                     source={DrawerLogo}/>
                    
                    {!(item.title.length>38)?
                    <Text  style={styles.title}>{item.title}</Text>
                    :<Text style={styles.title}>{item.title.toString().substring(0,38)}..</Text>}
                    <Text style={styles.time}>{item.time}</Text>
                   
                  </View>
                

                {(this.state.Role.includes("admin")) && <TouchableOpacity onPress={()=>this.delete(item)}>
<Image style={{height:20,width:20}} source={Close_icon} />
</TouchableOpacity>}



                </View>

                <View style={styles.cardContent}> 
                <TouchableOpacity onPress={()=>this.copyText(item.postMetaData)}>
                <ViewMoreText
          numberOfLines={14}
          renderViewMore={this.renderViewMore}
          renderViewLess={this.renderViewLess}
          textStyle={styles.title2}
        >   
        
            <ParsedText   style={styles.title2}           parse={[
            { type: 'url', style: styles.url, onPress: this.handleUrlPress },
            {
              type: 'phone',
              style: styles.phone,
              onPress: this.handlePhonePress,
            },
            {
              type: 'email',
              style: styles.email,
              onPress: this.handleEmailPress,
            },
            {
              pattern: /Bob|David/,
              style: styles.name,
              onPress: this.handleNamePress,
            },
            {
              pattern: /@(\w+)/,
              style: styles.username,
              onPress: this.handleNamePress,
              renderText: this.renderText,
            },
            { pattern: /42/, style: styles.magicNumber },
            { pattern: /#(\w+)/, style: styles.hashTag },
          ]}   
          
          >{item.postMetaData}</ParsedText>
          
            </ViewMoreText>   
            </TouchableOpacity>
            </View>
              
         
            {(item.image!=null&&!item.image.toString().includes(".mp4")&&!item.image.toString().includes(".txt")&&!item.image.toString().includes(".pdf"))?
    <View>
     <FbImages imagesdata={item.image}/>

     <Divider style={{height: 0.5,marginTop:10,marginLeft:20, width: "90%",backgroundColor:"grey"}}/>  
     </View> 
:
      
    (item.image!=null&&item.image.toString().includes(".mp4")) ?
      <View style={styles.ImageView} >
       
        <Video
        source={{ uri: item.image }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        isLooping={false}
        useNativeControls
        style={styles.video}
  
      />
      <Divider style={{height: 0.5,marginTop:10,marginLeft:20, width: "90%",backgroundColor:"grey"}}/>   

      </View>: ((item.image!=null&&(item.image.toString().includes(".txt")||item.image.toString().includes(".pdf")||item.image.toString().includes(".xls"))) ?
      ( 
      
      
      
      <View  style={styles.ImageView} >
        
   
        
      <TouchableHighlight   style={{ marginTop:10,
    alignSelf:"center"}} 
        
        onPress={()=>{{this.setState({isDocumentVisible: true,OpenDucumentUri:item.image})}}}> 
      <MaterialCommunityIcons
              name="file-document"                
              size={70}
            // style={styles.DocumentIcon} 
            />
       </TouchableHighlight>
  
  <Text style={{alignSelf:"center"}}>PDF</Text>
  

  {this.state.isDocumentVisible===true&&
    
    <Modal>
   
    <View style={{height:height,width:width,flex:1}}>
      

 <PDFReader style={{height:height,width:width}} 
        source={{
          uri: this.state.OpenDucumentUri,

        }}    />
      

      <TouchableHighlight
        style={styles.overlayCancel}
        onPress={()=>{this.setState({isDocumentVisible: false})}}>
       
            <MaterialCommunityIcons
              name="close"                
              size={27}
             style={styles.cancelIcon} 
            />
      
         
      </TouchableHighlight>
    </View>
   
    </Modal>
    
    
    }   
   <Divider style={{height: 0.5,marginTop:10,marginLeft:20, width: "90%",backgroundColor:"grey"}}/>   
      
  </View>  ):null)}
 
  { this.renderGroupMembers(item)}

<View style={styles.cardFooter}>


                <View style={styles.socialBarContainer}>             
              
                  <View style={styles.socialBarSection}>

                
                  {/* <Button style={{ marginLeft:-40}} color="black" onPress={()=>this.props.navigation.push("Likes")} >View</Button> */}
                   
                  
                  <TouchableOpacity style={styles.socialBarButton}   onPress={()=>this.Likes()}>
                      
                      <Image style={styles.icon} source={Like}/>
                     
                     
                      <Text style={{marginRight:40,marginLeft:5,color:"grey"}}>{item.countLikes} {(parseInt(item.countLikes)>1)?"Likes":"Like"}</Text>
                      </TouchableOpacity>
                  </View> 
                  
                  
                 
                  <View style={styles.socialBarSection}>
                   
                  <TouchableOpacity      onPress={()=>this.props.navigation.push("Comments")}>
                    <View style={styles.socialBarButton}>
                      <Image style={{  width:25,
  height:25,
  
 marginLeft:200}} source={Comment}/>

                      <Text  style={{marginLeft:5,color:"grey",}} >{item.countcomments} {(parseInt(item.countcomments)>1)?"Comments":"Comment"}</Text>
                      </View>
                      </TouchableOpacity> 
                  </View>
               
                      
                  
                </View> 

              </View>      
              
            </View>               
              
          )           
        }}/>: <View style={{alignSelf:"center",flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:270}}><Text style={{alignSelf:"center",color:"grey",fontWeight:"900"}} >No Posts to Show</Text></View>}
        
      </View>

    );
        }catch(e){
            console.log(e);
        }
  }
}



const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
  container:{
    flex:1,
    //marginTop:5,
  },
  list: {
    paddingHorizontal: 4,
    backgroundColor:"#E6E6E6",
  },
  separator: {
    
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
    paddingTop: -5,
    paddingBottom: 15,//15
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
    width:"100%",
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
    fontSize:16,
    flex:1,
    flexDirection: 'row',
   
 
  },
  time2:{
    fontSize:13,
    color: "#808080",  
    
   
  },
  icon: {
    width:25,
    height:25,
    
  marginLeft:180
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    alignSelf:"center",
   marginTop:10,//50
   // marginLeft:-60
  },

  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf:"center",
alignItems:"center",
    flex: 1,
   // marginLeft:-70,
    
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    
  },
  socialBarButton:{
    flexDirection: 'row',
    alignSelf:"center",
  alignItems:"center",
  marginLeft:-150
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
  },
  ImageView:{

    flex:1,
//justifyContent:'center',
    width: '100%',
    height: "100%",
  //  resizeMode: "stretch",
  },
  overlayCancel: {
    padding: 20,
    position: 'absolute',
    right: 10,
    top: 0,
  },
   cancelIcon: {
    color: 'black',
    marginTop:10

  },
  stretch: {
    // flex:1,
    width: width,
    height: height / 3,
    resizeMode: "contain",
   },
   video: {
    width: width,
    height: height / 3
  },



  groupMembersContent:{
    flexDirection:'row',
   marginTop:4,
   marginLeft:20
  },
  memberImage: {
    height: 20,
    width: 20,
    marginRight:4,
    borderRadius:10,
  },




  url: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },

  email: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },

  text: {
    color: 'black',
    fontSize: 16,
  },

  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  name: {
    color: 'black',
    fontWeight:"bold"
  },

  username: {
    color: 'black',
    fontWeight: 'bold',
  },

  magicNumber: {
    fontSize: 42,
    color: 'pink',
  },

  hashTag: {
    fontStyle: 'italic',
    color: '#1E90FF',
  },
});  