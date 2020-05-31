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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';


export default class ExplorePublicGroupScreen extends Component {

  constructor(props) {
   
    super(props);
    this.state = {
      data: [
        {id:"1", title: "Healthcare",      color:"#FF4500", Groups:8,  image:"https://img.icons8.com/color/70/000000/name.png"},
        {id:"2", title: "Home Remedies",     color:"#87CEEB", Groups:6,  image:"https://img.icons8.com/office/70/000000/home-page.png"},
        {id:"3", title: "Healthcare",     color:"#4682B4", Groups:12, image:"https://img.icons8.com/color/70/000000/two-hearts.png"} ,
        {id:"4", title: "Family",   color:"#6A5ACD", Groups:5,  image:"https://img.icons8.com/color/70/000000/family.png"} ,
        {id:"5", title: "Healthcare",  color:"#FF69B4", Groups:6,  image:"https://img.icons8.com/color/70/000000/groups.png"} ,
        {id:"6", title: "School",   color:"#00BFFF", Groups:7,  image:"https://img.icons8.com/color/70/000000/classroom.png"} ,
        {id:"7", title: "Things",   color:"#00FFFF", Groups:8,  image:"https://img.icons8.com/dusk/70/000000/checklist.png"} ,
        {id:"8", title: "World",    color:"#20B2AA", Groups:23, image:"https://img.icons8.com/dusk/70/000000/globe-earth.png"} ,
        {id:"9", title: "Remember", color:"#191970", Groups:45, image:"https://img.icons8.com/color/70/000000/to-do.png"} ,
        {id:"10", title: "Game",     color:"#008080", Groups:13, image:"https://img.icons8.com/color/70/000000/basketball.png"} ,
      ]
    };
    
  }

  clickEventListener(item) {
    Alert.Alert(item.title)
  }
 
  render() {
    
    return (  
      
      <View style={styles.container}>
     
      <FlatList style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={this.state.data}
        horizontal={false}
        numColumns={2}
        keyExtractor= {(item) => {
          return item.id;
        }}
        
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={[styles.card, {backgroundColor:item.color}]} onPress={()=>this.props.myHookValue.navigate("ExplorePublicGroupCategoryBased",item)}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.title}</Text>                
              </View>
              <Image style={styles.cardImage} source={{uri:item.image}}/>
              <View style={styles.cardFooter}>
                <Text style={styles.subTitle}>{item.Groups} Groups</Text>
              </View>
            </TouchableOpacity>
          )
        }}/>
    </View>
    );
  }
 
}





const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:0,
  },
  list: {
    //paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    marginHorizontal:2,
    marginVertical:2,
    flexBasis: '48%',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 70,
    width: 70,
    alignSelf:'center'
  },
  title:{
    fontSize:16,
    flex:1,
    color:"#FFFFFF",
    fontWeight:'bold'
  },
  subTitle:{
    fontSize:12,
    flex:1,
    color:"#FFFFFF",
  },
  icon:{
    height: 20,
    width: 20, 
  }
});     