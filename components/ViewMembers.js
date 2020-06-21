import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
TextInput,
TouchableHighlight,
TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import { ListItem, SearchBar } from "react-native-elements";
import deleteButton from '../Pictures/deleteButton.png';
import { Button } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";

import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { MaterialCommunityIcons ,FontAwesome} from '@expo/vector-icons';


FAIcon.loadFont();
MDIcon.loadFont();

export default class ViewMembers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1,  name: "Mark Doe",    username:"user1", image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
        {id:2,  name: "Clark Man",   username:"user2", image:"https://bootdey.com/img/Content/avatar/avatar6.png"} ,
        {id:3,  name: "Jaden Boor",  username:"user3", image:"https://bootdey.com/img/Content/avatar/avatar5.png"} ,
        {id:4,  name: "Srick Tree",  username:"user4", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:5,  name: "Erick Doe",   username:"user5", image:"https://bootdey.com/img/Content/avatar/avatar3.png"} ,
        {id:6,  name: "Francis Doe", username:"user6", image:"https://bootdey.com/img/Content/avatar/avatar2.png"} ,
        {id:8,  name: "Matilde Doe", username:"user7", image:"https://bootdey.com/img/Content/avatar/avatar1.png"} ,
        {id:9,  name: "John Doe",    username:"user8", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:10, name: "Fermod Doe",  username:"user9", image:"https://bootdey.com/img/Content/avatar/avatar7.png"} ,
        {id:11, name: "Danny Doe",   username:"user10", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
      ],
      loading: false,   
     
      temp: [{id:1,  name: "Mark Doe",    username:"user1", image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
      {id:2,  name: "Clark Man",   username:"user2", image:"https://bootdey.com/img/Content/avatar/avatar6.png"} ,
      {id:3,  name: "Jaden Boor",  username:"user3", image:"https://bootdey.com/img/Content/avatar/avatar5.png"} ,
      {id:4,  name: "Srick Tree",  username:"user4", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
      {id:5,  name: "Erick Doe",   username:"user5", image:"https://bootdey.com/img/Content/avatar/avatar3.png"} ,
      {id:6,  name: "Francis Doe", username:"user6", image:"https://bootdey.com/img/Content/avatar/avatar2.png"} ,
      {id:8,  name: "Matilde Doe", username:"user7", image:"https://bootdey.com/img/Content/avatar/avatar1.png"} ,
      {id:9,  name: "John Doe",    username:"user8", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
      {id:10, name: "Fermod Doe",  username:"user9", image:"https://bootdey.com/img/Content/avatar/avatar7.png"} ,
      {id:11, name: "Danny Doe",   username:"user10", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},],

      internal:[{id:1,  name: "Mark Doe",    username:"user1", image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
      {id:2,  name: "Clark Man",   username:"user2", image:"https://bootdey.com/img/Content/avatar/avatar6.png"} ,
      {id:3,  name: "Jaden Boor",  username:"user3", image:"https://bootdey.com/img/Content/avatar/avatar5.png"} ,
      {id:4,  name: "Srick Tree",  username:"user4", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
      {id:5,  name: "Erick Doe",   username:"user5", image:"https://bootdey.com/img/Content/avatar/avatar3.png"} ,
      {id:6,  name: "Francis Doe", username:"user6", image:"https://bootdey.com/img/Content/avatar/avatar2.png"} ,
      {id:8,  name: "Matilde Doe", username:"user7", image:"https://bootdey.com/img/Content/avatar/avatar1.png"} ,
      {id:9,  name: "John Doe",    username:"user8", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
      {id:10, name: "Fermod Doe",  username:"user9", image:"https://bootdey.com/img/Content/avatar/avatar7.png"} ,
      {id:11, name: "Danny Doe",   username:"user10", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},],

      error: null,
      search: null,
      Role:"admin", 
      searchStarted:"false",
      AdminTab:''
    };
  }



  // componentDidMount() {
  //   this.getData();
  // }

  //  getData = async ()  => {
  //   const url = `https://jsonplaceholder.typicode.com/users`;
  //   this.setState({ loading: true });
     
  //    try {
  //       const response = await fetch(url);
  //       const json = await response.json();
  //       this.setResult(json);
  //    } catch (e) {
  //       this.setState({ error: 'Error Loading content', loading: false });
  //    }
  // };




  delete(item){

    Alert.alert(
      "",
      "Do you want to remove "+item.name+" from the group",
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
   
    const index = this.state.temp.findIndex(
      items => item.id === items.id
    );
 

let newArrayDeleted = (this.state.searchStarted===true)?[]:this.state.data.filter((x,i) => i != index);

     this.setState({
     
      data:newArrayDeleted,
      temp:this.state.temp.filter((x,i) => i != index),  
    })
    
  {(this.state.searchStarted===true)?null:
    this.AdminOptions.close()}
      
  //  console.log(this.state.data,"updated")
   // console.log(this.state.internal,"updated")
  }
  
  makeAdmin(item){

    Alert.alert(
      "",
      "Do you want to make "+item.name+" admin",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => console.log("Make Admin")}
      ],
      { cancelable: false }
    );









  };


  renderItem = ({item}) => {
    return (
     
        <View  style={styles.row}>
            <TouchableOpacity   style={styles.TouchableOpacityStyle}  onPress={()=> {this.AdminOptions.open(); this.setState({AdminTab:item})}}>    
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
             
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.username}</Text>
            </View>
           
            {/* {(this.state.Role.includes("admin")) &&  
            <View style={{flex:1, marginLeft:300}}>
            <TouchableOpacity onPress={()=>this.delete(item)}>  

             {/* <Button color="black" style={{height:15,width:10,marginRight:30}}>Admin Tab</Button> */}
              {/* <Image style={{height:15,width:10}} source={deleteButton}/>  */}
            
            {/* </TouchableOpacity>
            
            </View>
         
            
            
            }  */}
            
          </View>
          </TouchableOpacity>


         


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
                onPress={() => this.delete(this.state.AdminTab)}
              >
                <MDIcon name="delete" style={styles.listIconNewPost} />
                <Text style={styles.listLabelNewPost}>Delete User</Text>
              </TouchableOpacity>

                
              <TouchableOpacity
                
                style={styles.listButtonNewPost}
                onPress={() => this.makeAdmin(this.state.AdminTab)}
              >
                <FontAwesome name="user-secret" style={styles.listIconNewPost} />
                <Text style={styles.listLabelNewPost}>Make Admin</Text>
              </TouchableOpacity></View>: <Text style={styles.listTitleNewPost}>You need to be Admin to view Admin Options</Text>}



            
           
          </View>
        </RBSheet>
        

        </View>
        
    );
  }



  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      temp: [...this.state.temp, ...res],
      error: res.error || null,
      loading: false
    });
  }

  renderHeader = () => {
      return <SearchBar 
      
      placeholder="Type a name or username"
          lightTheme round editable={true}
          value={this.state.search}
          onChangeText={this.updateSearch} />; 
  }; 

  updateSearch = search => {
        this.setState({ search }, () => {
            if ('' == search) {

              
                this.setState({
                    data: [...this.state.temp],
                   
                });
                return;
            }
           
            this.setState({
     
              searchStarted:true
             
            
            })

            this.state.data = this.state.temp.filter(function(item){
                return item.name.includes(search)||item.username.includes(search);
              }).map(function({id, name, image,username}){
                return {id, name, image,username};
            });
        });

        this.setState({
     
          searchStarted:false
         
        
        })
  };











  render() {
    return(
      <View style={{ flex: 1 ,  backgroundColor: 'white',}} >
        <FlatList 
         ListHeaderComponent={this.renderHeader}
          extraData={this.state}
          data={this.state.data}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    padding: 10,
   
  },
  TouchableOpacityStyle:{
    flexDirection: 'row',
    alignItems: 'center',
   
    backgroundColor: 'white',
    
    
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
   

  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
    width:"100%"
  },




  listContainerNewPost: {
    flex: 1,
    padding: 25
  },
  listTitleNewPost: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666"
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
}); 