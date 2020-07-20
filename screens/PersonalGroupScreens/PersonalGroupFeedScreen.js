import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert,
  FlatList,
  Dimensions,
  RefreshControl,
 Clipboard,
 ActivityIndicator
} from 'react-native';
import {
   Avatar,
  Divider, 
  Button
} from 'react-native-paper';
import DrawerLogo from '../../Pictures/DrawerLogo.png';
import FbImages from '../PersonalGroupScreens/PostImagesPersonalGroup';
import Comment from '../../Pictures/Comment.png';
import Stories from '../../components/Stories';
import { MaterialCommunityIcons,FontAwesome,AntDesign } from '@expo/vector-icons';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import ViewMoreText from 'react-native-view-more-text';
import ParsedText from 'react-native-parsed-text';
import * as Linking from 'expo-linking';
import RBSheet from "react-native-raw-bottom-sheet";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";

FAIcon.loadFont();
MDIcon.loadFont();

export default class PersonalGroupFeedScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:"1", title: "Jatin sjhhjashasjhadddssddsdsdsdsjhasasjhasjhh", PostOwnerId:"abc",  isLiked:false,   countLikes:0,    countcomments:21 ,         time:"1 days a go", postMetaData:"This is an example postThis is an example post",   image:"https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
        LikePictures:[] },
        
        {id:"2", title: "Amit",     countLikes:1,     countcomments:0 ,  isLiked:false, PostOwnerId:"abcd",     time:"2 minutes a go",  postMetaData:"This is an https://facebook.com example post", image:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        LikePictures:[
              "https://bootdey.com/img/Content/avatar/avatar6.png", 
              "https://bootdey.com/img/Content/avatar/avatar1.png", 
              "https://bootdey.com/img/Content/avatar/avatar2.png",
              // "https://bootdey.com/img/Content/avatar/avatar7.png",
              // "https://bootdey.com/img/Content/avatar/avatar3.png",
              // "https://bootdey.com/img/Content/avatar/avatar4.png"
                    
        ]} ,
        {id:"3", title: "XYZ Name",     countLikes:2,   countcomments:2 , PostOwnerId:"abc",  isLiked:false,    time:"3 hour a go",  postMetaData:"This is an jatinv2395@gmail.com example post",    image:["https://bootdey.com/img/Content/avatar/avatar1.png" ,"https://bootdey.com/img/Content/avatar/avatar6.png" ],
      
      
        LikePictures:[
         
              
              "https://bootdey.com/img/Content/avatar/avatar6.png", 
              "https://bootdey.com/img/Content/avatar/avatar1.png", 
              "https://bootdey.com/img/Content/avatar/avatar2.png",
              "https://bootdey.com/img/Content/avatar/avatar7.png",
              "https://bootdey.com/img/Content/avatar/avatar3.png",
              "https://bootdey.com/img/Content/avatar/avatar4.png"
        ]
          },
       
      
     
        {id:"4", title: "XYZ Name",   countLikes:3,  countcomments:21 , isLiked:false,  PostOwnerId:"abc", time:"4 months a go",  postMetaData:"This is an example post",  image:[ "https://bootdey.com/img/Content/avatar/avatar8.png", "https://bootdey.com/img/Content/avatar/avatar7.png"],
      
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
      numberOfLines:14,
      Role:"admin", 
      isFetching:false,
      AdminTab:'',
      PostUsertitle:'',
      loading: false,   
      error: null,
    
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
   // console.log(`phone ${phone} has been pressed!`);
  }
  
  handleNamePress(name) {
  //  console.log(`Hello ${name}`);
  }
  
  handleEmailPress(email) {
 //   console.log(`send email to ${email}`);
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
  // Stories=()=>{
    
  //      return(
  //        <View style={{ flex:1 }} >
  //        <View style={{ height: 100 }}>
        
         
  //        <View style={{ flex: 3 ,backgroundColor:"white" }}>
  //            <ScrollView
                
  //               horizontal={true}
  //               showsHorizontalScrollIndicator={false}
  //               contentContainerStyle={{
  //                   alignItems: 'center',
  //                   paddingStart: 5,
  //                   paddingEnd: 5,
                 
  //               }} >
   
  //              <View>
  //                 <Avatar.Image 
  //                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
  //                     source={DrawerLogo} size={70}/>
  //                   <Text style={{marginLeft:25}}>jatin</Text>
  //              </View>
   
      
  //            </ScrollView>
   
             
  //        </View>
         
        
  //      </View>
     
  //  <TouchableOpacity style={styles.buttonContainer} onPress={()=>this.props.myHookValue.push("CreateaNewPost")}>
  //    <View>
  //  <View style={styles.bodyContent}  >
  //              <Text style={{fontWeight:"bold",width:"100%",marginLeft:50,marginTop:11}}>Start a conversation</Text> 
  //              </View>
  //              <View>
                 
  //              <Image 
  //                    style={{ marginHorizontal: 5,height:30,width:35,marginLeft:350,marginTop:-40}}
  //                     source={Post_Add} />
  //                </View> 
  //              </View>
  //            </TouchableOpacity> 
   
  //       </View>
      
       
  //      );
      
        
         
           
  //  }
componentDidMount(){
  this.changeScreenOrientation();
}

async changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
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

  delete(item){

    Alert.alert(
      "",
      "Do you want to delete the post from "+this.state.PostUsertitle,
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
     // console.log(this.state.data,"updated")
  
      this.AdminOptions.close();
      
     
   // console.log(this.state.data,"updated")
  }
  
  
  deletePostandUserfromGroup(item){
  
    Alert.alert(
      "",
      "Do you want to delete the post and remove "+this.state.PostUsertitle+" from the group",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.deletePostandUserfromGrouparray(item)}
      ],
      { cancelable: false }
    );
  };
  
  deletePostandUserfromGrouparray(item){
    
    //console.log(item.id, "first ")
   
    const index = this.state.data.findIndex(
      items => item.id === items.id
    );
   
     this.setState({
      data: this.state.data.filter((x,i) => i != index) })
    
      this.AdminOptions.close();
   
      
   // console.log(this.state.data,"updated")
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
        
          
           
        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          refreshControl={
            <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
          }
          // ItemSeparatorComponent={() => {
          //   return (
          //     <View style={styles.separator}/>
          //   )
          // }}
          ListHeaderComponent={
           <Stories  Role={this.state.Role}  data={this.state.data} nav={this.props}/>
           
       }
          renderItem={(post) => {
            const item = post.item;
          
            return (
           
              <View style={styles.card}>
             
             {(this.state.data.length===0) &&
             
              <View style={{alignSelf:"center",flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:270}}><Text style={{alignSelf:"center",color:"grey",fontWeight:"900"}} >No Posts to Show</Text></View>}

               <View style={styles.cardHeader}>
                  <View>
                  <Avatar.Image size={45}
                  style={{ marginHorizontal: 5, borderColor: 'black', borderWidth: 2 }}
                     source={DrawerLogo}/>
    
    {!(item.title.length>30)?
                    <Text  style={styles.title}>{item.title}</Text>
                    :<Text style={styles.title}>{item.title.toString().substring(0,30)}..</Text>}

                    <Text style={styles.time}>{item.time}</Text>
                  </View>


                  {(this.state.Role.includes("admin")) && <TouchableOpacity onPress={()=> {this.AdminOptions.open(); this.setState({AdminTab: post,PostUsertitle: post.item.title.length>15?post.item.title.toString().substring(0,15)+"..":post.item.title})}}> 
{/* <Image style={{height:20,width:20}} source={Close_icon} /> */}


<FontAwesome
              name="ellipsis-v"                
              size={20}
              style={{height:20,width:20}}
            />


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
               

           


            {(item.image!=null&&!item.image.toString().includes(".mp4")&&!item.image.toString().includes(".txt")&&!item.image.toString().includes(".pdf"))?
    
    <View>
     <FbImages ShowPhotos={true} imagesdata={item.image}/>

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
    
    
    }   
       */}


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
          }}/>


        <RBSheet
          ref={ref => {
            this.AdminOptions = ref;
          }}
          height={330}
         
        >
          <View style={styles.listContainerNewPost}>
         
            <Text style={styles.listTitleNewPost}>Admin Options</Text>

            {(this.state.Role.includes("admin")) ?
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
              </TouchableOpacity></View>: <Text style={styles.listTitleNewPost}>You need to be Admin to view Admin Options</Text>}



            
           
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