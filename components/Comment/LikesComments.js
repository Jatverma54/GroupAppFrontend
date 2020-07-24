import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
TouchableOpacity,
  Image,
  RefreshControl,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {  SearchBar } from "react-native-elements";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { 
  Button,
} from 'react-native-paper';

FAIcon.loadFont();
MDIcon.loadFont();

export default class LikesComments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:this.props.route.params,
       
     
      temp: this.props.route.params,

    
      loading: false, 
      error: null,
      search: null,
      Role:"admin", 
      isFetching:false,
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


         


  

        </View>
        
    );
  }



  renderHeader = () => {
      return <SearchBar 
      
      placeholder="Type a name or username"
          lightTheme round editable={true}
        //  containerStyle={{height:35,paddingBottom:40,}}
        containerStyle={{
          borderBottomColor:"#CCCCCC",
          borderBottomWidth:0.5,
          borderBottomStartRadius:170,
          borderBottomEndRadius:40,     
          }}
          platform="android"
          inputStyle={{color:"black"}}
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

    if (this.state.loading) {return (
      <View style={{ flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"}}>
       <ActivityIndicator size="large" color="black" />
      </View>
    );
  } 
  
    
    return(
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
      <View style={{ flex: 1 ,  backgroundColor: 'white',}} >
        <FlatList 
         ListHeaderComponent={this.renderHeader}
          extraData={this.state}
          data={this.state.data}
          refreshControl={
            <RefreshControl refreshing={this.state.isFetching} onRefresh={() => this.onRefresh()} />
          }

          // ItemSeparatorComponent={() => {
          //   return (
          //     <View style={styles.separator}/>
          //   )
          // }}


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
  //  borderColor: '#DCDCDC',
    backgroundColor: 'white',
    //borderBottomWidth: 1,
    padding: 10,

    
   
  },
  TouchableOpacityStyle:{
    flexDirection: 'row',
    alignItems: 'center',
   
    backgroundColor: 'white',
    
    
  },
  pic: {
    borderRadius: 30,
    width: 30,
    height: 30,
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
    width:"80%",
    marginLeft:50

  },


}); 