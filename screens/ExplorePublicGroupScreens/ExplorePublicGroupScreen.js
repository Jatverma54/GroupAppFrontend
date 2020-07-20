import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { 
  Button,
} from 'react-native-paper';

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
      ],
      loading: false,   
      error: null,
    
    
    };
    
  }

  clickEventListener(item) {
    Alert.Alert(item.title)
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