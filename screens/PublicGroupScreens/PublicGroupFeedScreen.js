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
  Container, Content,  Thumbnail,  
} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Card,
  Caption,
  Paragraph,
} from 'react-native-paper';
import DrawerLogo from '../../Pictures/DrawerLogo.png';
import FbImages from '../../components/FacebookPostImage';
import Like from '../../Pictures/Like.png';
import Comment from '../../Pictures/Comment.png';
import { Video } from 'expo-av';
import Icon from  'react-native-vector-icons/Ionicons';

import { MaterialCommunityIcons,FontAwesome,MaterialIcons } from '@expo/vector-icons';

export default class PublicGroupFeedScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:"1", title: "Jatin",                  time:"1 days a go", postMetaData:"This is an example post",   image:"https://www.radiantmediaplayer.com/media/bbb-360p.mp4"},
        {id:"2", title: "Amit",             time:"2 minutes a go",  postMetaData:"This is an example post", image:"https://lorempixel.com/400/200/nature/5/"} ,
        {id:"3", title: "XYZ Name",            time:"3 hour a go",  postMetaData:"This is an example post",    image:"https://lorempixel.com/400/200/nature/4/"}, 
        {id:"4", title: "XYZ Name",         time:"4 months a go",  postMetaData:"This is an example post",  image:"https://lorempixel.com/400/200/nature/6/"}, 
        {id:"5", title: "XYZ Name",           time:"5 weeks a go",   postMetaData:"This is an example post",  image:"https://lorempixel.com/400/200/sports/1/"}, 
        {id:"6", title: "XYZ Name",        time:"6 year a go",    postMetaData:"This is an example post",  image:"https://lorempixel.com/400/200/nature/8/"}, 
        {id:"7", title: "XYZ Name",    time:"7 minutes a go", postMetaData:"This is an example post",  image:"https://lorempixel.com/400/200/nature/1/"}, 
        {id:"8", title: "XYZ Name",          time:"8 days a go",    postMetaData:"This is an example post",  image:"https://lorempixel.com/400/200/nature/3/"},
        {id:"9", title: "XYZ Name", time:"9 minutes a go", postMetaData:"This is an example post",  image:"https://lorempixel.com/400/200/nature/4/"},
      ],
      isVisible: false,
      MaximizeImage:'',
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
    
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                </View>

                <View style={styles.cardContent}>             
            <Text style={styles.title2}>{item.postMetaData}</Text>
            
            </View>
            {/* <View style={styles.ImageView} > */}
            
             {/* {item.image&&this.ShowImageorVideo(item.image,item.id)} */}



             {(item.image!=null&&!item.image.toString().includes(".mp4"))?
      

      <View style={styles.ImageView} >
 <TouchableOpacity onPress={()=>{this.setState({isVisible: true,MaximizeImage:item.image})}} style={{flex: 1}}>
    
    <Image
  style={styles.stretch}
  source={{uri:item.image}}
  
  />
   </TouchableOpacity>

  
    {this.state.isVisible===true&&
    
    <Modal>
   
    <View style={{height:height,width:width,flex:1}}>
      <Image resizeMode="contain" style={{height:height,width:width,flex:1}}
        source={{uri: this.state.MaximizeImage}} >
      </Image>
      <TouchableHighlight
        style={styles.overlayCancel}
        onPress={()=>{this.setState({isVisible: false})}}>
       
            <MaterialCommunityIcons
              name="close"                
              size={21}
              style={styles.cancelIcon} 
            />
      
         
      </TouchableHighlight>
    </View>
   
    </Modal>
    
    
    
    
    
    
    
    }   
      







  </View>:
      
    ((item.image!=null&&item.image.toString().includes(".mp4")) ?
      (<View style={styles.ImageView} >
       
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
      </View>):null)}
      
   


































             


{/* </View> */}
                
                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton}>
                        <Image style={styles.icon} source={Like}/>
                        <Text style={styles.socialBarLabel}>78</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton}>
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
    fontSize:18,
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
   
  }
});  