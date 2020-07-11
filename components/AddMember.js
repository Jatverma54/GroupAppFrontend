
import React from "react";
import{StyleSheet,View,ActivityIndicator,FlatList,Text,TouchableOpacity,Image, Alert,RefreshControl} from "react-native";
import { Icon } from "react-native-elements";
import {
 
  Avatar,
 
} from 'react-native-paper';
import { ListItem, SearchBar } from "react-native-elements";
import Close_icon from'../Pictures/Close_icon.png'

export default class AddMembers extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
   

      data: [
        {id:1,  name: "Jatin",    username:"user1ghjkldndgusnksyh", image:"https://bootdey.com/img/Content/avatar/avatar7.png",isSelect:false, selectedClass:  {
          "alignItems": "center",
          "backgroundColor": "white",
          "flexDirection": "row",
          "justifyContent": "flex-start",
          "margin": 3,
          "paddingVertical": 5,
          "zIndex": -1,
        },},
        {id:2,  name: "Clark Man",   username:"user2", image:"https://bootdey.com/img/Content/avatar/avatar6.png",isSelect:false, selectedClass:  {
          "alignItems": "center",
          "backgroundColor": "white",
          "flexDirection": "row",
          "justifyContent": "flex-start",
          "margin": 3,
          "paddingVertical": 5,
          "zIndex": -1,
        },} ,
        {id:3,  name: "Jaden Boor",  username:"user3", image:"https://bootdey.com/img/Content/avatar/avatar5.png",isSelect:false, selectedClass:  {
          "alignItems": "center",
          "backgroundColor": "white",
          "flexDirection": "row",
          "justifyContent": "flex-start",
          "margin": 3,
          "paddingVertical": 5,
          "zIndex": -1,
        },} ,
        
      ],
      loading: false,   
     
     

      dataSearch:[
        {id:1,  name: "Jatin",    username:"user1ghjkldndgusnksyh", image:"https://bootdey.com/img/Content/avatar/avatar7.png",isSelect:false, selectedClass:  {
          "alignItems": "center",
          "backgroundColor": "white",
          "flexDirection": "row",
          "justifyContent": "flex-start",
          "margin": 3,
          "paddingVertical": 5,
          "zIndex": -1,
        },},
        {id:2,  name: "Clark Man",   username:"user2", image:"https://bootdey.com/img/Content/avatar/avatar6.png",isSelect:false, selectedClass:  {
          "alignItems": "center",
          "backgroundColor": "white",
          "flexDirection": "row",
          "justifyContent": "flex-start",
          "margin": 3,
          "paddingVertical": 5,
          "zIndex": -1,
        },} ,
        {id:3,  name: "Jaden Boor",  username:"user3", image:"https://bootdey.com/img/Content/avatar/avatar5.png",isSelect:false, selectedClass:  {
          "alignItems": "center",
          "backgroundColor": "white",
          "flexDirection": "row",
          "justifyContent": "flex-start",
          "margin": 3,
          "paddingVertical": 5,
          "zIndex": -1,
        },} ,
        
      ],
      error: null,
      search: null,
      isFetching:false,

      
      selected:[]
     };
  }
  // componentDidMount() {this.fetchData();}
  
  // fetchData = () => {this.setState({loading: true});
  
  // fetch("https://jsonplaceholder.typicode.com/photos")
  //   .then(response => response.json())
  //   .then(responseJson => {
  //     responseJson = responseJson.map(item => {
  //       item.isSelect = false;
  //       item.selectedClass = styles.list;
        
  //       return item;
  //     });
   
  //     this.setState({
  //       loading: false,
  //       dataSource: responseJson,
  //     });
  //     console.log(responseJson[0])
  //   }).catch(error => {this.setState({loading: false});
  //  });
  // };// ADD group id/Name with 

FlatListItemSeparator = () => <View style={styles.line} />;

selectItem = data => {
  data.item.isSelect = !data.item.isSelect;
  data.item.selectedClass = data.item.isSelect ? styles.selected : styles.list;

  const index = this.state.data.findIndex(
    item => data.item.id === item.id
  );

  this.state.data[index] = data.item;

  this.setState({
    data: this.state.data,
   // dataSearch:this.state.data,
   selected: this.state.data.filter(item => item.isSelect)
  });
};


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
          dataSearch:data2,
          selected:[],
          isFetching: false
      })

}




getSelectedArray(){

 // const itemss = this.state.data.filter(item => item.isSelect);
  const itemss = this.state.selected;
if(itemss.length>0){
  console.log(itemss);
}
else{
  Alert.alert("Please select an user")
}

  
}

goToStore = () =>(this.getSelectedArray());

renderItem = data =>
  <TouchableOpacity
    style={[styles.list, data.item.selectedClass]}      
    onPress={() => this.selectItem(data)}
  >
  <Image
    source={{ uri: data.item.image }}
    style={{ width: 40, height: 40, margin: 6 }}
  />
  <Text style={styles.lightText}>  {data.item.name}  </Text>
  <Text style={styles.lightText}>  {data.item.username}  </Text>
</TouchableOpacity>




setResult = (res) => {
  this.setState({
    data: [...this.state.data, ...res],
    temp: [...this.state.temp, ...res],
    error: res.error || null,
    loading: false
  });
}

renderHeader = () => {
    return  <SearchBar 
    
    placeholder="Type a name or username"
        lightTheme round editable={true}
        value={this.state.search}
        onChangeText={this.updateSearch} />;

  

}; 

updateSearch = search => {
      this.setState({ search }, () => {
          if ('' == search) {
              this.setState({
                  dataSearch: [...this.state.data]
              });
              return;
          }
          
          this.state.dataSearch = this.state.data.filter(function(item){
              return item.name.includes(search)||item.username.includes(search);
            }).map(function({id, name, username,image}){
              return {id, name,image,username};
          });
      });
};


// deselectItem = item => {
//   item.isSelect = !item.isSelect;
//   item.selectedClass = item.isSelect ? styles.selected : styles.list;

//   const index = this.state.data.findIndex(
//     item => item.id === item.id
//   );

//   this.state.data[index] = item;

//   this.setState({
//     data: this.state.data,
//    // dataSearch:this.state.data,
//    selected: this.state.data.filter(item => item.isSelect)
//   });
// };


render() {
  const itemNumber = this.state.data.filter(item => item.isSelect).length;
 
  if (this.state.loading) {return (
    <View style={styles.loader}>
     <ActivityIndicator size="large" color="black" />
    </View>
  );
}
 

 return (
   <View style={styles.container}>
     
   {this.state.selected.length>0&&
   
   <View style={{height:100}}>
   <FlatList style={styles.FaltlistSelect} 

        
   horizontal={true}
   showsHorizontalScrollIndicator={false}
   
             data={this.state.selected}



             keyExtractor= {(item) => {
               return item.id;
             }}
           
           

             renderItem={(data) => {
               //const item = post.item;
             
               return (
                   <View style={{ flex:1 }} >
                   <View style={{ height: 100,padding:5}}>
                  
                   
                   <View style={{ flex: 3 ,backgroundColor:"white" }}>
                            
                          <View>
                           <TouchableOpacity onPress={()=> this.selectItem(data)}>

                         <Image style={{height:15,width:15}} source={ Close_icon  }></Image>
                         </TouchableOpacity> 
                            <Avatar.Image 
                               style={{ marginHorizontal:2, borderColor: 'black', borderWidth: 2 }}
                                source={{uri:data.item.image}} size={60}/>
                          
                          {!(data.item.name.length>9)?
                              <Text style={{fontSize:12,alignSelf:"center",paddingTop:6 }}>{data.item.name}</Text>
                              : <Text style={{fontSize:12,alignSelf:"center",paddingTop:6 }}>{data.item.name.toString().substring(0,10)}..</Text>}
                              
                         </View>                
                       
                   </View>
                               
                 </View>
               
            
                  </View>
               )
              }}/>
</View>
               }
              
            
               
   
   <FlatList
     data={this.state.dataSearch}
    ItemSeparatorComponent={this.FlatListItemSeparator}
    ListHeaderComponent={this.renderHeader}
    renderItem={item => this.renderItem(item)}
    keyExtractor={item => item.id.toString()}
    refreshControl={
      <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
    }
    extraData={this.state}
   />

  <View style={styles.numberBox}>
    <Text style={styles.number}>{itemNumber}</Text>
  </View>
  
  <TouchableOpacity style={styles.icon}>
    <View>
      <Icon
        raised
        name="check"
        type="font-awesome"
        color="#e3e3e3" 
        size={30} 
        onPress={() => this.goToStore()}
        containerStyle={{ backgroundColor: "#FA7B5F" }}
      />
    </View>
 </TouchableOpacity>
</View>
);}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

    position: "relative"
   },
  name: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10
  },
  loader: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  list: {
    paddingVertical: 5,
    margin: 3,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: -1,
   
  },
  lightText: {
    color: "black",
    width: 200,
    paddingLeft: 15,
    fontSize: 12
   },
  line: {
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width:"78%",
    marginLeft:80

  },
  icon: {
    position: "absolute",  
    bottom: 20,
    width: "100%", 
    left: 290, 
    zIndex: 1
  },
  numberBox: {
    position: "absolute",
    bottom: 75,
    width: 30,
    height: 30,
    borderRadius: 15,  
    left: 330,
    zIndex: 3,
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    alignItems: "center"
  },
  number: {fontSize: 14,color: "#000"},
  selected: {backgroundColor: "#D9DBDC"},


  FaltlistSelect: {
    // paddingHorizontal: 4,
     backgroundColor:"white",
     
    // paddingHorizontal: 4,
   //paddingStart: 5,
    // paddingEnd: 5,
   },

   separator: {
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width:"78%",
    marginLeft:80

  },


  });
