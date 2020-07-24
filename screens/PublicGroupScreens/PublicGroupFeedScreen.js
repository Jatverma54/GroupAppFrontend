import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
  FlatList,
  TouchableHighlight,
  Clipboard,
  ActivityIndicator
} from 'react-native';
import {
  Avatar,
  Divider,
  Button
} from 'react-native-paper';
import DrawerLogo from '../../Pictures/DrawerLogo.png';
import FbImages from '../PublicGroupScreens/PostImagesPublicGroup';
import Comment from '../../Pictures/Comment.png';
import { Video } from 'expo-av';
import { MaterialCommunityIcons,AntDesign,FontAwesome } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import ViewMoreText from 'react-native-view-more-text';
import ParsedText from 'react-native-parsed-text';
import * as Linking from 'expo-linking';
import RBSheet from "react-native-raw-bottom-sheet";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";

FAIcon.loadFont();
MDIcon.loadFont();


export default class PublicGroupFeedScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:"1", title: "Jatin sjhhjashasjhadddssddsdsdsdsjhasasjhasjhh", GroupName:"Falt and Flatmate Story of hope and inspiration",GroupAdmin:["abce"] , PostOwnerId:"abc", isLiked:false,   countLikes:0,    countcomments:21 ,         time:"1 days a go", postMetaData:"This is an example postThis is an example post",   image:"https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
        LikePictures:[] },
        
        {id:"2", title: "Amit",    GroupName:"Group 2", GroupAdmin:["abc"]  ,  countLikes:1,     countcomments:0 ,  isLiked:false, PostOwnerId:"abcd",    time:"2 minutes a go",  postMetaData:"This is an https://facebook.com example post", image:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        LikePictures:[
              "https://bootdey.com/img/Content/avatar/avatar6.png", 
              "https://bootdey.com/img/Content/avatar/avatar1.png", 
              "https://bootdey.com/img/Content/avatar/avatar2.png",
              // "https://bootdey.com/img/Content/avatar/avatar7.png",
              // "https://bootdey.com/img/Content/avatar/avatar3.png",
              // "https://bootdey.com/img/Content/avatar/avatar4.png"
                    
        ]} ,
        {id:"3", title: "XYZ Name",  GroupName:"Group 3",GroupAdmin:["abce"] ,     countLikes:2,   countcomments:2 ,  PostOwnerId:"abcd", isLiked:false,    time:"3 hour a go",  postMetaData:"This is an jatinv2395@gmail.com example post",    image:["https://bootdey.com/img/Content/avatar/avatar1.png" ,"https://bootdey.com/img/Content/avatar/avatar6.png" ],
      
      
        LikePictures:[
         
              
              "https://bootdey.com/img/Content/avatar/avatar6.png", 
              "https://bootdey.com/img/Content/avatar/avatar1.png", 
              "https://bootdey.com/img/Content/avatar/avatar2.png",
              "https://bootdey.com/img/Content/avatar/avatar7.png",
              "https://bootdey.com/img/Content/avatar/avatar3.png",
              "https://bootdey.com/img/Content/avatar/avatar4.png"
        ]
          },
       
      
     
        {id:"4", title: "XYZ Name", GroupName:"Group 4",  GroupAdmin:["abcd"] , countLikes:3,  countcomments:21 , isLiked:false,PostOwnerId:"abcd",   time:"4 months a go",  postMetaData:"This is an example post",  image:[ "https://bootdey.com/img/Content/avatar/avatar8.png", "https://bootdey.com/img/Content/avatar/avatar7.png"],
      
        LikePictures:[
         
              "https://bootdey.com/img/Content/avatar/avatar6.png", 
              "https://bootdey.com/img/Content/avatar/avatar1.png", 
              "https://bootdey.com/img/Content/avatar/avatar2.png",
              "https://bootdey.com/img/Content/avatar/avatar7.png",
              "https://bootdey.com/img/Content/avatar/avatar3.png",
              "https://bootdey.com/img/Content/avatar/avatar4.png",
              
              
            ]
          }, 
      
      ],
      
      isVisible: false,
      MaximizeImage:'',
      isDocumentVisible: false,
      OpenDucumentUri:'',
      isFetching:false,
      loading: false,   
      error: null,
      currentUserOnwerId:'abc',
      AdminTab:'',
      PostUsertitle:'',
      GroupAdmin:''
    };
   
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

  handleUrlPress(url) {
   // console.log(`url: ${url} has been pressed!`);
    Linking.openURL(url);
  }
  
  handlePhonePress(phone) {
  //  console.log(`phone ${phone} has been pressed!`);
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
    return `^^${match[1]}^^`;
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

  componentDidMount(){
    this.changeScreenOrientation();
  }
  
  async changeScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    }

  // ShowImageorVideo(){
    
  
 
  // <Modal>
   
  // <View style={{height:height,width:width,flex:1}}>
  //   <Image resizeMode="contain" style={{height:height,width:width,flex:1}}
  //     source={{uri: this.state.MaximizeImage}} >
  //   </Image>
  //   <TouchableHighlight
  //     style={styles.overlayCancel}
  //     onPress={()=>{this.setState({isVisible: false})}}>
     
  //         <MaterialCommunityIcons
  //           name="close"                
  //           size={21}
  //           style={styles.cancelIcon} 
  //         />
    
       
  //   </TouchableHighlight>
  // </View>
 
  // </Modal>

   
  // }


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
  Likes(data) {
     
     
    data.item.isLiked = !data.item.isLiked;
    data.item.countLikes= data.item.isLiked ?(parseInt(data.item.countLikes)+1):(parseInt(data.item.countLikes)-1)

   data.item.isLiked ? data.item.LikePictures.push("https://www.bootdey.com/img/Content/avatar/avatar1.png")
     : data.item.LikePictures=data.item.LikePictures.filter(item => item !== "https://www.bootdey.com/img/Content/avatar/avatar1.png");
   
    const index = this.state.data.findIndex(
      item => data.item.id === item.id
    );
  
  
    this.state.data[index] = data.item;
    


    this.setState({
      data: this.state.data,
    
   
    });

  // console.log(this.state.data)
   
  
  }


  openDocument (url) {
 
    Linking.canOpenURL(url)
        .then((supported) => {
            if (!supported) {
                alert("File type is not supported")
            } else {
              //  console.log("Supported!")
                return Linking.openURL(url);
            }
        })
        .catch((err) => console.error('An error occurred', err));
  };
  





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
      <View style={styles.container}>
      {this.state.data.length!=0?

        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          refreshControl={
            <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
          }
      
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
         

          renderItem={(post) => {
            const item = post.item;
            return (

              <View style={styles.card}>
             
                       
               <View style={styles.cardHeader}>
                  <View>
                  <Avatar.Image size={45}
                  style={{ marginHorizontal: 5, borderColor: 'black', borderWidth: 2 }}
                     source={DrawerLogo}/>
    

    {!(item.title.length>30)?
                    <Text  style={styles.title}>{item.title}</Text>
                    :<Text style={styles.title}>{item.title.toString().substring(0,30)}..</Text>}

                   <View style={{flex: 1,
          flexDirection: 'row',}}> 

                  <TouchableOpacity onPress={()=>this.props.myHookValue.navigate("JoinedGroupInsideGroup",item)}>
                 
                  <Text style={styles.GroupName}>{item.GroupName}</Text>
                  
                   </TouchableOpacity>   

                   </View>
                    <View>
                    <Text style={styles.time}>{item.time}</Text>
                   </View>
                  </View>


                  {( item.GroupAdmin.includes(this.state.currentUserOnwerId) ||item.PostOwnerId===this.state.currentUserOnwerId) && 
                
                <TouchableOpacity  onPress={()=> {this.AdminOptions.open(); this.setState({GroupAdmin:item.GroupAdmin ,AdminTab: post,PostUsertitle: item.title.length>15?item.title.toString().substring(0,15)+"..":item.title})}}> 

                <FontAwesome
              name="ellipsis-v"                
              size={20}
              style={{height:20,width:20}}
            />

{/* <Image style={{height:20,width:20}} source={Close_icon} /> */}
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
            {
              pattern: /@(\w+)_(\w+)/,   
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
            {/* <View style={styles.ImageView} > */}
            
             {/* {item.image&&this.ShowImageorVideo(item.image,item.id)} */}



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
       
       onPress={()=>this.openDocument(item.image)}> 
     <MaterialCommunityIcons
             name="file-document"                
             size={70}
           // style={styles.DocumentIcon} 
           />
      </TouchableHighlight>
 
 <Text style={{alignSelf:"center"}}>PDF</Text>
 

 {/* {this.state.isDocumentVisible===true&&
   
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
   
   
   }    */}
     
     <Divider style={{height: 0.5,marginTop:10,marginLeft:20, width: "90%",backgroundColor:"grey"}}/>   




 </View>  ):null)}


     
 { this.renderGroupMembers(item)}

<View style={styles.cardFooter}>


                <View style={styles.socialBarContainer}>             
              
                  <View style={styles.socialBarSection}>

                
                  {/* <Button style={{ marginLeft:-40}} color="black" onPress={()=>this.props.navigation.push("Likes")} >View</Button> */}
                   
                 
                  <TouchableOpacity style={styles.socialBarButton}  onPress={()=>this.Likes(post)}>
                      
                  {post.item.isLiked?
                      <AntDesign
              name="like1"                
             size={25}
             color="#1E90FF"
             style={styles.icon} 
            />:<AntDesign
            name="like1"                
           size={25}
           color="black"
           style={styles.icon} 
          />}

                     
                     
                      <Text style={{marginRight:40,marginLeft:5,color:"grey"}}>{(parseInt(post.item.countLikes)===0)?"":post.item.countLikes} {(parseInt(post.item.countLikes)>1)?"Likes":"Like"}</Text>
                      </TouchableOpacity>
                  </View> 
                  
                  
                 
                  <View style={styles.socialBarSection}>
                   
                  <TouchableOpacity      onPress={()=>this.props.navigation.navigate("Comments",post.item)}>
                    <View style={styles.socialBarButton}>
                      <Image style={{  width:25,
  height:25,
  
 marginLeft:200}} source={Comment}/>

<Text  style={{marginLeft:5,color:"grey",}} >{(parseInt(post.item.countcomments)===0)?"":post.item.countcomments} {(parseInt(post.item.countcomments)>1)?"Comments":"Comment"}</Text>
                      </View>
                      </TouchableOpacity> 
                  </View>
               
                      
                  
                </View> 

              </View>      
              
            </View>               
              
          )           
        }}/>: <View style={{alignSelf:"center",flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:270}}><Text style={{alignSelf:"center",color:"grey",fontWeight:"900"}} >Join public groups to see a post</Text></View>}
     



        <RBSheet
          ref={ref => {
            this.AdminOptions = ref;
          }}
          height={330}
         
        >
          <View style={styles.listContainerNewPost}>
         
            <Text style={styles.listTitleNewPost}>Admin Options</Text>

            {( this.state.GroupAdmin.includes(this.state.currentUserOnwerId)) ?
            <View>
              <TouchableOpacity
                
                style={styles.listButtonNewPost}
                onPress={()=>this.delete(this.state.AdminTab.item)}
              >
                <MDIcon name="delete" style={styles.listIconNewPost} />
        <Text style={styles.listLabelNewPost}>Delete post from {this.state.PostUsertitle}</Text>
              </TouchableOpacity>

                
              <TouchableOpacity
                
                style={styles.listButtonNewPost}
                onPress={() => this.deletePostandUserfromGroup(this.state.AdminTab.item)}
              >
                <MaterialCommunityIcons name="exit-to-app" style={styles.listIconNewPost} />
                <Text style={styles.listLabelNewPost}>Delete post and remove {this.state.PostUsertitle}</Text>
              </TouchableOpacity></View>: 
               <View>
               <TouchableOpacity
                 
                 style={styles.listButtonNewPost}
                 onPress={()=>this.delete(this.state.AdminTab.item)}
               >
                 <MDIcon name="delete" style={styles.listIconNewPost} />
         <Text style={styles.listLabelNewPost}>Delete your post</Text>
               </TouchableOpacity>
               </View>
              
              }



            
           
          </View>
        </RBSheet>


  



      </View>
     
    );
  }
}



const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    flex:1,
    //marginTop:5,
    backgroundColor:"white"
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
  list: {
    paddingHorizontal: 4,
    backgroundColor:"#E6E6E6",
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
    flex:1,
   marginLeft:60,
   marginTop:-45,
   width:"100%"
  
  },

  GroupName:{
    fontSize:13,
    //fontWeight:'bold',
    //flex:1,
    marginLeft:60,
   marginTop:2,
   //width:"70%",
  // flexDirection:"row",
  // flexWrap:'wrap',
   color:"#808080",
  fontWeight: "900",
   flexDirection: "row",
      //  alignItems: 'center',
      //  height: 50,
       // paddingHorizontal: 10,
        width: width - 30 - 20 - 70,

  },


  time:{
    fontSize:13,
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


  
  listContainerNewPost: {
    flex: 1,
    padding: 25
  },
  listTitleNewPost: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
    fontWeight:"bold"
  },
  listButtonNewPost: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },
  listIconNewPost: {
    fontSize: 26,
    color: "#666",
    width: 60
  },
  listIconNewVideoPost: {
    fontSize: 26,
    color: "#666",
    width: 50,
    marginLeft:-22
    
  },
  listLabelNewPost: {
    fontSize: 16
  },
  listLabelVideoNewPost: {
    fontSize: 16,
    marginLeft:33
  },
  separator: {
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width:"78%",
    marginLeft:60

  },
});  