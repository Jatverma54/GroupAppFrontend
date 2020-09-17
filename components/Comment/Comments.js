import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,  
  RefreshControl,
  ActivityIndicator,
  Alert
} from 'react-native';

import {
 
  Divider,
  Button
 
} from 'react-native-paper';
import { MaterialCommunityIcons,AntDesign} from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';
import ParsedText from 'react-native-parsed-text';
import * as Linking from 'expo-linking';
import MDIcon from "react-native-vector-icons/MaterialIcons";
MDIcon.loadFont();

export default class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {id:1, image: "https://bootdey.com/img/Content/avatar/avatar1.png",   OnwerId:"abc" ,  LikedBy:[{id:"1",name:"Jatin", username:"user1", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},{id:"8",name:"Amit",image:"https://bootdey.com/img/Content/avatar/avatar1.png", username:"user1",}], ReplyCount:0,  isLiked:false,  name:"Jatin Vremakklkkklklkjkjkjkjkjkjkl jhjhjhjhjhhjjh", likeCount:0,   comment:"Lorem ipsum dolor sit amet, www.facebook.com consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:2, image: "https://bootdey.com/img/Content/avatar/avatar6.png",   OnwerId:"abcs" , LikedBy:[{id:"2",name:"Jatin", username:"user1", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},{id:"9",name:"Amit",image:"https://bootdey.com/img/Content/avatar/avatar1.png", username:"user1",}], ReplyCount:1,   isLiked:false,  name:"John DoeLink",    likeCount:1, comment:"Lorem ipsum dolor sit amet."},
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar7.png",  OnwerId:"abcd" ,LikedBy:[{id:"3",name:"Jatin", username:"user1", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},{id:"10",name:"Amit",image:"https://bootdey.com/img/Content/avatar/avatar1.png", username:"user1",}],  ReplyCount:7,  isLiked:false, name:"March SoulLaComa",likeCount:99, comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:4, image: "https://bootdey.com/img/Content/avatar/avatar2.png",  OnwerId:"abce" , LikedBy:[{id:"4",name:"Jatin", username:"user1", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},{id:"11",name:"Amit",image:"https://bootdey.com/img/Content/avatar/avatar1.png", username:"user1",}],  ReplyCount:7, isLiked:false,  name:"Finn DoRemiFaso", likeCount:3, comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:5, image: "https://bootdey.com/img/Content/avatar/avatar3.png",  OnwerId:"abcf" , LikedBy:[{id:"5",name:"Jatin", username:"user1", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},{id:"12",name:"Amit",image:"https://bootdey.com/img/Content/avatar/avatar1.png", username:"user1",}],  ReplyCount:7,    isLiked:false, name:"Maria More More", likeCount:4, comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:6, image: "https://bootdey.com/img/Content/avatar/avatar4.png",  OnwerId:"abcg" ,LikedBy:[{id:"6",name:"Jatin", username:"user1", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},{id:"13",name:"Amit",image:"https://bootdey.com/img/Content/avatar/avatar1.png", username:"user1",}],  ReplyCount:7,    isLiked:false, name:"Clark June Boom!",likeCount:5, comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:7, image: "https://bootdey.com/img/Content/avatar/avatar5.png",  OnwerId:"abch" ,LikedBy:[{id:"15",name:"Jatin", username:"user1", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},{id:"14",name:"Amit",image:"https://bootdey.com/img/Content/avatar/avatar1.png", username:"user1",}], ReplyCount:7,     isLiked:false,  name:"The googler",    likeCount:6,  comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
      ],
      msg: '',
      Role:"admin",
      currentUserOnwerId:"abcd", 
      height: 40,
      //fontWeight
    
      isFetching:false,
      loading: false,   
      error: null,
    
    }
    this.send = this.send.bind(this);
   
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
      error: res.error || null,
      loading: false
    });
  }









  Likes(data) {
     
     
    data.item.isLiked = !data.item.isLiked;
    data.item.likeCount= data.item.isLiked ?(parseInt(data.item.likeCount)+1):(parseInt(data.item.likeCount)-1)

   data.item.isLiked ? data.item.LikedBy.push({id:"7",name:"NewLike",username:"userNew", image:"https://bootdey.com/img/Content/avatar/avatar1.png"})
     : data.item.LikedBy=data.item.LikedBy.filter(item => item.id !== "7");
   
  
  
     const index = this.state.data.findIndex(
      item => data.item.id === item.id
    );
  
  
    this.state.data[index] = data.item;
    


    this.setState({
      data: this.state.data,
    
   
    });

  // console.log(this.state.data)
   
  
  }

  renderViewMore(onPress){
    return(
      <Text style={{color:"grey",fontWeight:"bold"}} onPress={onPress}>See more</Text>
    )
  }
  renderViewLess(onPress){
    return(
      <Text style={{color:"grey",fontWeight:"bold"}} onPress={onPress}>See less</Text>
    )
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



  LikesScreen(){

return(

  <View style={{ flex:1 }} >
  <View style={{ height: 10,padding:10 }}>
 
  
  <View style={{ flex: 3 ,backgroundColor:"white" }}>
           
         
        <View>
       <Text>Likes</Text>
       <Divider style={{height: 0.5,marginTop:10,marginLeft:20, width: "90%",backgroundColor:"grey"}}/>  
        </View>                
      
  </View>
              
</View>


 </View>
)



  }

  send() {
    if (this.state.msg.length > 0) {
      var data = this.state.data;
      data.push({
        id:Math.floor((Math.random() * 999999999999999) + 1),
        name: "example",
        likeCount:0,
        LikedBy:[],
        comment: this.state.msg,
        isLiked:false,
        image:'https://www.bootdey.com/img/Content/avatar/avatar1.png',
        OnwerId:"abcd"
      });
      this.setState({data:data,msg:'',height:40});
    //   setTimeout(() => {
    //     this.reply();
    //   }, 2000);
    }
  }

  updateSize = (height) => {

    if(height<200){
    this.setState({
      height
    });
  }
  }
 
  delete(item){
   
    Alert.alert(
      "",
      "Do you want to delete the comment",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.deletearray(item.item)}
      ],
      { cancelable: false }
    );
  };

  deletearray(item){
    
  
    const index = this.state.data.findIndex(
      items => item.id === items.id
    );
   
     this.setState({
      data: this.state.data.filter((x,i) => i != index) })
     // console.log(this.state.data,"updated")
  
    
      
     
    console.log(this.state.data,"updated")
  }
  

  handleUrlPress(url) {
    //console.log(`url: ${url} has been pressed!`);
   
    Linking.openURL(url);
  }
  
  handlePhonePress(phone) {
    //console.log(`phone ${phone} has been pressed!`);
  }
  
  handleNamePress(name) {
   // console.log(`Hello ${name}`);
  }
  
  handleEmailPress(email) {
  //  console.log(`send email to ${email}`);
    Linking.openURL("mailto:"+email);
  }
  
  renderText(matchingString, matches) {
  

   // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /@(\w+)/;
    let match = matchingString.match(pattern);
    return `${match[1]}`;

  }
  


  render() {

   
    const {height} = this.state;
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
        <KeyboardAvoidingView  style={styles.keyboard}>
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        refreshControl={
          <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
        }
      //   ListHeaderComponent={
      //    this.LikesScreen()
          
      // }

        // ItemSeparatorComponent={() => {
        //   return (
        //     <View style={styles.separator}/>
        //   )
        // }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          return(
         
            <View style={styles.container}>

            <Image style={styles.avatar} source={{ uri: Notification.image }}></Image>

      
            <View style={styles.ContainerAtCenter}>

                    
          
                <View style={styles.contentContainer}>
                  

                   {!(Notification.name.length>38)?
                    <Text  style={styles.name}>{Notification.name}</Text>
                    :<Text style={styles.name}>{Notification.name.toString().substring(0,38)}..</Text>}
                  
               
 
                 
                  <View>
                    <Text style={styles.Time}>4m</Text>
                    </View>

                    <ViewMoreText
          numberOfLines={4}
          renderViewMore={this.renderViewMore}
          renderViewLess={this.renderViewLess}
          textStyle={styles.title2}
        >   

<ParsedText   style={styles.content}           parse={[
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
            {
              pattern: /@(\w+)_(\w+)/,   
              style: styles.username,
              onPress: this.handleNamePress,
              renderText: this.renderText,
            },
            { pattern: /42/, style: styles.magicNumber },
            { pattern: /#(\w+)/, style: styles.hashTag },
          ]}   
       
          >{Notification.comment}</ParsedText>





                    </ViewMoreText>
                </View>
               
                <View style={styles.LikesContainer}>
                   
         
           <TouchableOpacity   onPress={()=>this.Likes(item)}>
             {/* <Text style={{fontWeight:"bold",color:"grey"}}>Like</Text> */}
             {/* <Image style={{ width:15,height:15}} source={Like}/> */}

             {Notification.isLiked?
                      <AntDesign
              name="like1"                
             size={15}
             color="#1E90FF"
             style={{ width:15,height:15}} 
            />:<AntDesign
            name="like1"                
           size={15}
           color="black"
           style={{ width:15,height:15}}
          />}

             </TouchableOpacity>

             

             <TouchableOpacity  onPress={()=>this.props.navigation.navigate("ReplyComments",{CommentJson:Notification,PostOwnerId:this.props.route.params.PostOwnerId})}>
           <Text style={{fontSize:12,marginLeft:60}} >{(parseInt(Notification.ReplyCount)===0)?"":Notification.ReplyCount} {(parseInt(Notification.ReplyCount)>1)?"Replies":"Reply"}</Text>  
                  
                    </TouchableOpacity>


             <TouchableOpacity style={styles.likeBtn} onPress={()=>this.props.navigation.navigate("CommentLikes",Notification.LikedBy)}>
           <Text style={{fontSize:12,marginLeft:80}} >{(parseInt(Notification.likeCount)===0)?"":Notification.likeCount} {(parseInt(Notification.likeCount)>1)?"Likes":"Like"}</Text>  
                    {/* <TouchableOpacity style={styles.replyBtn}><Text>Reply</Text></TouchableOpacity> */}
                    </TouchableOpacity>
                  
                    {(Notification.OnwerId===this.state.currentUserOnwerId||this.props.route.params.PostOwnerId===this.state.currentUserOnwerId) &&   
                    
                    // <Button style={{height:15,width:15,flex: 1,
                    //   marginLeft:310,
                    //   marginTop:-20}} >DEL</Button>

                    <TouchableOpacity onPress={()=>this.delete(item)}>

<MaterialCommunityIcons name="delete-outline" size={15} style={{height:15,width:15,}}/>
{/* <Image style={{height:15,width:15,flex: 1,marginLeft:310,}} source={Close_icon} /> */}

</TouchableOpacity>

}




                </View>
            </View>
        </View>
          )
        }}/>



<View style={{

flexDirection: 'row',
alignSelf: 'flex-end',
padding: 10,
height: height,
// width: width - 20,
marginRight:80,
backgroundColor: 'white',
margin: 10,
shadowColor: '#3d3d3d',
shadowRadius: 2,
shadowOpacity: 0.5,
shadowOffset: {
  height: 1,
},
borderColor:'#696969',
borderWidth:1,
borderRadius:30,
borderBottomWidth: 1,






}}>
  <ScrollView>
              <TextInput
               style={{flex:1, height:height,width:"100%" }}
                editable={true}
                placeholder="Type a message"
                multiline={true}
                value={this.state.msg}
               // placeholderTextColor = "#696969"            
                onChangeText={msg => this.setState({ msg })}
              //  blurOnSubmit={true}
                onSubmitEditing={() => this.send()}            
              //  returnKeyType="send"
                onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}             
                multiline style={{
                  width: '100%',height:height, marginTop:-10,fontSize:18,padding:10               
           }}

                />
</ScrollView>

           </View>

           <View style={styles.sendIcon}>
           <TouchableOpacity onPress={() => this.send()}>
            <MaterialCommunityIcons
                  name="send"
                //  color={color}
                  size={40}
                />
                </TouchableOpacity>
                </View>

              </KeyboardAvoidingView>
            
    );
  }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop:10,
  },
  keyboard: {
    flex: 1,
   justifyContent: 'center',
   backgroundColor:"white"
  },

  editor: {
   // justifyContent: 'center',
   height:"100%",
    width: '100%',
   // fontSize:5,
   // marginTop:-70
},
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
   // width: width - 20,
    marginRight:80,
    backgroundColor: 'white',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor:'#696969',
    borderWidth:1,
   
  },

sendIcon:{

  flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
   // height: 40,
   // width: width - 20,
    //marginRight:80,
    marginTop:-62,
    marginRight:10,
    backgroundColor: 'white',
   // margin: 10,
   

},

  container: {
    //paddingLeft: ,
    paddingRight: 5,
   paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    
  },
  content: {
  //  marginLeft: 16,
    //flex: 1,

  //   borderBottomColor: 'black',
  //  // backgroundColor: '#FFFFFF',
  //   borderRadius:60,
  //   borderBottomWidth: 1,
  //   width:width,
  //   height:45,
  //   marginBottom:20,
  //   flexDirection: 'row',
  borderRadius:30,
  flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 5,
    height: 70,
   // width: width ,
   // marginRight:20,
    backgroundColor: "#e9ebee",
    margin: 5,
    shadowColor: '#3d3d3d',
    shadowRadius: 6,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor:'#696969',
    borderWidth:1,
    fontSize:15

  },
  contentHeader: {
  // flex:1,
   // justifyContent: "space-between",
   
    //width:"100%",
    //flexWrap:"nowrap"
  //  marginBottom: 3


  //paddingVertical:,
  paddingHorizontal: 10,
  borderTopLeftRadius: 1,
  borderTopRightRadius: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  },
  separator: {
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width:"78%",
    marginLeft:60

  },

  image:{
    width:40,
    height:40,
    borderRadius:20,
    marginLeft:10
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
   name:{
    fontSize:12,
    fontWeight:"bold",
   // flexDirection:"row",
    width:"80%",
    marginLeft:10,
  // alignSelf:"flex-start"


  },


    container: {
        flexDirection: 'row',
        marginBottom: 15
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10,
        marginLeft:10 
    },
    ContainerAtCenter: {
        width: screenWidth * 0.7

    },
    contentContainer: {
        marginBottom: 10,
        padding: 10,
        paddingTop: 5,
        backgroundColor: '#e9ebee',
        borderRadius: 10,
        width: width-70 ,
         marginRight:20,
    },
    name: {
        fontWeight: 'bold',
       
    },
   
    image: {
        borderRadius: 10
    },
    LikesContainer: {
        marginTop: -5,
        marginLeft:5,
        flexDirection: 'row',
       // width: 0.6 * screenWidth,

    },
    Time: {
        flex: 1,
      marginLeft:width-30-105,
        marginTop:-20,
        fontSize:11
    },
    likeBtn: {
        textAlign: 'center',
        flex: 1,
       
      
    },
    replyBtn: {
        textAlign: 'center',
        flex: 1
    },

    url: {
      color: '#1E90FF',
      textDecorationLine: 'underline',
    },
  
    email: {
      textDecorationLine: 'underline',
      color: '#1E90FF',
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