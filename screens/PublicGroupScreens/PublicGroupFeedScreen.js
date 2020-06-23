import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
 
  ScrollView,
  FlatList,
  TouchableHighlight,
  Modal,
  Button,
  Container, Content,  Thumbnail,  Clipboard
} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Card,
  Divider,
  Caption,
  Paragraph,
} from 'react-native-paper';
import DrawerLogo from '../../Pictures/DrawerLogo.png';
import FbImages from '../PublicGroupScreens/PostImagesPublicGroup';
import Like from '../../Pictures/Like.png';
import Comment from '../../Pictures/Comment.png';
import { Video } from 'expo-av';
import Icon from  'react-native-vector-icons/Ionicons';
import PDFReader from 'rn-pdf-reader-js';
import { MaterialCommunityIcons,FontAwesome,MaterialIcons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import ViewMoreText from 'react-native-view-more-text';

export default class PublicGroupFeedScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:"1", title: "Jatin ajhasasjhjsjjksjsjsjsjjsdjsdjsdjasjhasjhashjha",    GroupName:"Group 1",              time:"1 days a go", postMetaData:"This is an example post",   image:"https://www.radiantmediaplayer.com/media/bbb-360p.mp4"},
        {id:"2", title: "Amit",      GroupName:"Multiple Myeloma story of hopes and insipiration",           time:"2 minutes a go",  postMetaData:"This is an example post", image:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"} ,
        {id:"3", title: "XYZ Name",    GroupName:"Group 3",            time:"3 hour a go",  postMetaData:"This is an example post",    image:["https://bootdey.com/img/Content/avatar/avatar1.png" ,"https://bootdey.com/img/Content/avatar/avatar6.png" ]}, 
        {id:"4", title: "XYZ Name",    GroupName:"Group 4",         time:"4 months a go",  postMetaData:"This is an example post",  image:[ "https://bootdey.com/img/Content/avatar/avatar8.png", "https://bootdey.com/img/Content/avatar/avatar7.png"]}, 

      ],
      isVisible: false,
      MaximizeImage:'',
      isDocumentVisible: false,
      OpenDucumentUri:'',
    };
   
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

  render() {
         

    return (
      
      <View style={styles.container}>
    
        <FlatList style={styles.list}
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

              <View style={styles.card}>
             
                       
               <View style={styles.cardHeader}>
                  <View>
                  <Avatar.Image size={45}
                  style={{ marginHorizontal: 5, borderColor: 'black', borderWidth: 2 }}
                     source={DrawerLogo}/>
    

    {!(item.title.length>40)?
                    <Text  style={styles.title}>{item.title}</Text>
                    :<Text style={styles.title}>{item.title.toString().substring(0,40)}..</Text>}

                   <View > 

                  <TouchableOpacity onPress={()=>this.props.myHookValue.navigate("JoinedGroupInsideGroup",item)}>
                   {!(item.GroupName.length>40)?
                  <Text style={styles.GroupName}>{item.GroupName}</Text>
                   :<Text style={styles.GroupName}>{item.GroupName.toString().substring(0,40)}..</Text>}
                   </TouchableOpacity>   

                   </View>
                    <View>
                    <Text style={styles.time}>{item.time}</Text>
                   </View>
                  </View>
                </View>

                <View style={styles.cardContent}>             
                <TouchableOpacity onPress={()=>this.copyText(item.postMetaData)}>
                <ViewMoreText
          numberOfLines={14}
          renderViewMore={this.renderViewMore}
          renderViewLess={this.renderViewLess}
          textStyle={styles.title2}
        >   
        
            <Text   style={styles.title2}>{item.postMetaData}</Text>
          
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


     
















             


{/* </View> */}
<View style={styles.cardFooter}>
               
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton}>
                        <Image style={styles.icon} source={Like}/>
                        <Text style={styles.socialBarLabel}>78</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.socialBarSection}   >
                      <TouchableOpacity style={styles.socialBarButton} onPress={()=>this.props.navigation.push("Comments")}>
                        <Image style={styles.icon} source={Comment}/>
                        <Text style={styles.socialBarLabel}>25</Text>
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



const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    flex:1,
    //marginTop:5,
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
    paddingTop: 6,
    paddingBottom: 15,
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
    fontWeight:'bold',
    flex:1,
    marginLeft:60,
   marginTop:2,
   width:"100%"
  
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
    marginRight:5
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginTop:6,

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
   
  }
});  