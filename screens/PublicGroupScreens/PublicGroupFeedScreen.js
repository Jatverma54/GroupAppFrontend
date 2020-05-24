import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  
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
import DrawerLogo from '../../Pictures/DrawerLogo.png';
import FbImages from '../../components/FacebookPostImage';
import Like from '../../Pictures/Like.png';
import Comment from '../../Pictures/Comment.png';

export default class PublicGroupFeedScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:"1", title: "Jatin",                  time:"1 days a go", postMetaData:"This is an example post",   image:"https://lorempixel.com/400/200/nature/6/"},
        {id:"2", title: "Amit",             time:"2 minutes a go",  postMetaData:"This is an example post", image:"https://lorempixel.com/400/200/nature/5/"} ,
        {id:"3", title: "XYZ Name",            time:"3 hour a go",  postMetaData:"This is an example post",    image:"https://lorempixel.com/400/200/nature/4/"}, 
        {id:"4", title: "XYZ Name",         time:"4 months a go",  postMetaData:"This is an example post",  image:"https://lorempixel.com/400/200/nature/6/"}, 
        {id:"5", title: "XYZ Name",           time:"5 weeks a go",   postMetaData:"This is an example post",  image:"https://lorempixel.com/400/200/sports/1/"}, 
        {id:"6", title: "XYZ Name",        time:"6 year a go",    postMetaData:"This is an example post",  image:"https://lorempixel.com/400/200/nature/8/"}, 
        {id:"7", title: "XYZ Name",    time:"7 minutes a go", postMetaData:"This is an example post",  image:"https://lorempixel.com/400/200/nature/1/"}, 
        {id:"8", title: "XYZ Name",          time:"8 days a go",    postMetaData:"This is an example post",  image:"https://lorempixel.com/400/200/nature/3/"},
        {id:"9", title: "XYZ Name", time:"9 minutes a go", postMetaData:"This is an example post",  image:"https://lorempixel.com/400/200/nature/4/"},
      ]
    };
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
    
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                </View>

                <View style={styles.cardContent}>             
            <Text style={styles.title2}>{item.postMetaData}</Text>
            
            </View>
                <FbImages/>
                
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