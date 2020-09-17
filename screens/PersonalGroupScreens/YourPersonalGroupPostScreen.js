import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight,
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
import FbImages from '../PersonalGroupScreens/YourPostImagesPersonalGroup';

import Comment from '../../Pictures/Comment.png';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';
import Close_icon from '../../Pictures/Close_icon.png';
import ExitIcon from '../../Pictures/ExitIcon.png';
import Repor_Icon from '../../Pictures/Repor_Icon.png';
import ParsedText from 'react-native-parsed-text';
import * as Linking from 'expo-linking';

export default class YourPersonalGroupPostScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:"1", title: "Jatin sjhhjashasjhadddssddsdsdsdsjhasasjhasjhh",   isLiked:false,   countLikes:0,    countcomments:21 ,         time:"1 days a go", postMetaData:"This is an example postThis is an example post",   video:"https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4",
        LikePictures:[] },
        
        {id:"2", title: "Amit",     countLikes:1,     countcomments:0 ,  isLiked:false,     time:"2 minutes a go",  postMetaData:"This is an https://facebook.com example post", document:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        LikePictures:[
              "https://bootdey.com/img/Content/avatar/avatar6.png", 
              "https://bootdey.com/img/Content/avatar/avatar1.png", 
              "https://bootdey.com/img/Content/avatar/avatar2.png",
              // "https://bootdey.com/img/Content/avatar/avatar7.png",
              // "https://bootdey.com/img/Content/avatar/avatar3.png",
              // "https://bootdey.com/img/Content/avatar/avatar4.png"
                    
        ]} ,
        {id:"3", title: "XYZ Name",     countLikes:2,   countcomments:2 ,   isLiked:false,    time:"3 hour a go",  postMetaData:"This is an jatinv2395@gmail.com example post",    image:["https://bootdey.com/img/Content/avatar/avatar1.png" ,"https://bootdey.com/img/Content/avatar/avatar6.png" ],
      
      
        LikePictures:[
         
              
              "https://bootdey.com/img/Content/avatar/avatar6.png", 
              "https://bootdey.com/img/Content/avatar/avatar1.png", 
              "https://bootdey.com/img/Content/avatar/avatar2.png",
              "https://bootdey.com/img/Content/avatar/avatar7.png",
              "https://bootdey.com/img/Content/avatar/avatar3.png",
              "https://bootdey.com/img/Content/avatar/avatar4.png"
        ]
          },
       
      
     
        {id:"4", title: "XYZ Name",   countLikes:3,  countcomments:21 , isLiked:false,   time:"4 months a go",  postMetaData:"This is an example post",  image:[ "https://bootdey.com/img/Content/avatar/avatar8.png", "https://bootdey.com/img/Content/avatar/avatar7.png"],
      
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

  OrientationStatus : '',
  Width_Layout : Dimensions.get('window').width
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

  componentDidMount(){

    this.DetectOrientation();
  }
  
  DetectOrientation(){

    if(this.state.Width_Layout > this.state.Height_Layout)
    {

      // Write Your own code here, which you want to execute on Landscape Mode.

        this.setState({
        OrientationStatus : 'Landscape Mode'
        });
    }
    else{

      // Write Your own code here, which you want to execute on Portrait Mode.

        this.setState({
        OrientationStatus : 'Portrait Mode'
        });
    }

  }

  


  onFullscreenUpdate = ({fullscreenUpdate, status}) => {
  
    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT: 
      
        this.changeScreenOrientationLandscape();
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT: 
     
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS: 
       
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS: 
       
        this.changeScreenOrientation();
    }
  }
  
  
   async changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
  
      async changeScreenOrientationLandscape() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
  

    copyText(item){

      Clipboard.setString(item)
    
     alert('Copied to clipboard')
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

    handleUrlPress(url) {
    //  console.log(`url: ${url} has been pressed!`);
      Linking.openURL(url);
    }
    
    handlePhonePress(phone) {
    //  console.log(`phone ${phone} has been pressed!`);
    }
    
    handleNamePress(name) {
     // console.log(`Hello ${name}`);
    }
    
    handleEmailPress(email) {
     // console.log(`send email to ${email}`);
      Linking.openURL("mailto:"+email);
    }
    
    renderText(matchingString, matches) {
      // matches => ["[@michel:5455345]", "@michel", "5455345"]
      let pattern = /@(\w+)/;
      let match = matchingString.match(pattern);
      return `^^${match[1]}^^`;
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
      
     // console.log(item.id, "first ")
     
      const index = this.state.data.findIndex(
        items => item.id === items.id
      );
     
       this.setState({
        data: this.state.data.filter((x,i) => i != index) })
      
    
     
        
    //  console.log(this.state.data,"updated")
    }


    ReportGroup(){


      Alert.alert(
        "",
        "Do you want to report the group",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => this.ExitGroup()}
        ],
        { cancelable: false }
      );
    
    }
    
    LeaveGroup(){
    
      Alert.alert(
        "",
        "Do you want to Leave the group",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => this.ExitGroup()}
        ],
        { cancelable: false }
      );
    
    }

ReportorLeaveGroup(){


return(


<View style={{ flex:1 }} >
 <View>

 <TouchableOpacity style={styles.buttonContainerInviteMember}  onPress={()=>this.ReportGroup()}>
  <View>
  <View style={styles.bodyContentInviteMember}  >
            <Text style={{fontWeight:"bold",width:"100%",alignSelf:"center",marginLeft:40,marginTop:11}}>Report Group</Text> 
            </View>
            <View>
              
            <Image 
                  style={{ marginHorizontal: 5,height:25,width:25,marginLeft:width/2-30-20,marginTop:-35}}
                   source={Repor_Icon} />
                   
              </View> 
            </View>
          </TouchableOpacity>

          <View>

<TouchableOpacity style={{...styles.buttonContainerShare, marginLeft:this.state.Width_Layout/2,}}  onPress={()=>this.LeaveGroup()}>
 <View>
 <View style={styles.bodyContentShare}  >
           <Text style={{fontWeight:"bold",width:"100%",alignSelf:"center",marginLeft:40,marginTop:11}}>Leave Group</Text> 
           </View>
           <View>
             
           <Image 
                 style={{ marginHorizontal: 5,height:25,width:25,marginLeft:width/2-30-20,marginTop:-35}}
                  source={ExitIcon} />
                  
             </View> 
           </View>
         </TouchableOpacity>
         {(this.state.data.length===0) &&
             
             <View style={{alignSelf:"center",flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:270}}><Text style={{alignSelf:"center",color:"grey",fontWeight:"900"}} >No Posts to Show</Text></View>}

</View>



 </View>

</View>



);






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

 //console.log(this.state.data)
 

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
      <View style={styles.container}  onLayout={(event) => this.setState({
        Width_Layout : event.nativeEvent.layout.width,
       
       }, ()=> this.DetectOrientation())}>
      
      
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

          ListHeaderComponent={
            this.ReportorLeaveGroup()
            
        }
          
          renderItem={(post) => {
            const item = post.item;
            return (

              <View style={styles.card}>
             
            
             {/* <Stories Number_of_run={this.state.Number_of_run}/>                   */}
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
                 

                  <TouchableOpacity onPress={()=>this.delete(item)}>
                  <MaterialCommunityIcons name="delete-outline" size={15} style={{height:15,width:15,}}/>
</TouchableOpacity>



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
            


            {(post.item.image!=null)?
    <View>
     <FbImages ShowPhotos={true} imagesdata={item.image}/>

     <Divider style={{height: 0.5,marginTop:10,marginLeft:20, width: "90%",backgroundColor:"grey"}}/>  
     </View>  
:
      
(post.item.video!=null) ?
      <View style={styles.ImageView} >
       
        <Video
        source={{ uri: item.video }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        isLooping={false}
        useNativeControls
        style={styles.video}
        onFullscreenUpdate={this.onFullscreenUpdate}
      />

<Divider style={{height: 0.5,marginTop:10,marginLeft:20, width: "90%",backgroundColor:"grey"}}/>   

      </View>:((post.item.document!=null) ?
      
      ( 
      
      
      
      <View  style={styles.ImageView} >
        
   
        
      <TouchableHighlight   style={{ marginTop:10,
    alignSelf:"center"}} 
        
        onPress={()=>this.openDocument(item.document)}> 
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
         
          
      </View>
     
    );
  }
}

// var NumberOfRun=1;
// const Stories=(Number_of_run)=>{
 
//   if(NumberOfRun === 1){
//     NumberOfRun=NumberOfRun+1;  
  
//     return(
 
//       <View style={{ height: 100 }}>
     
      
//       <View style={{ flex: 3 }}>
//           <ScrollView
             
//              horizontal={true}
//              showsHorizontalScrollIndicator={false}
//              contentContainerStyle={{
//                  alignItems: 'center',
//                  paddingStart: 5,
//                  paddingEnd: 5,
              
//              }}
    
//           >
            
//                <Avatar.Image 
//                   style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
//     source={DrawerLogo}
//     size={90}
//     />
//                <Avatar.Image
//                 style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
//     source={DrawerLogo}
//     size={90}
//     />
//               <Avatar.Image
//                style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
//     source={DrawerLogo}
//     size={90}
//     />
//                <Avatar.Image
//                 style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
//     source={DrawerLogo}
//     size={90}
//     />
//      <Avatar.Image
//       style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
//     source={DrawerLogo}
//     size={90}
//     />
//      <Avatar.Image
//       style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
//     source={DrawerLogo}
//     size={90}
//     />
//      <Avatar.Image
//       style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
//     source={DrawerLogo}
//     size={90}
//     />
//           </ScrollView>

          
//       </View>
//     </View>
    
//     );
   
//      }else{
// return(null);
//         }
      
        
// }
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
  bodyContent: {
    flex: 2,
    alignItems: 'center',
   
  // marginVertical:-5,
 
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
   // marginLeft:width/2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom:10,
    width:"50%",
    borderRadius:30,
    backgroundColor: "white",
  },

  
  bodyContentInviteMember: {
    flex: 2,
    alignItems: 'center',
   
  // marginVertical:-5,
 
  }, 
   
  bodyContentShare: {
    flex: 2,
    alignItems: 'center',
   
  // marginVertical:-5,
 
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

});  