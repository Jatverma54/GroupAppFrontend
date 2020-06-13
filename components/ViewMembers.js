import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
TextInput,
TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import { ListItem, SearchBar } from "react-native-elements";
export default class ViewMembers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1,  name: "Mark Doe",    status:"active", image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
        {id:2,  name: "Clark Man",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar6.png"} ,
        {id:3,  name: "Jaden Boor",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar5.png"} ,
        {id:4,  name: "Srick Tree",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:5,  name: "Erick Doe",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar3.png"} ,
        {id:6,  name: "Francis Doe", status:"active", image:"https://bootdey.com/img/Content/avatar/avatar2.png"} ,
        {id:8,  name: "Matilde Doe", status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"} ,
        {id:9,  name: "John Doe",    status:"active", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:10, name: "Fermod Doe",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar7.png"} ,
        {id:11, name: "Danny Doe",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
      ],
      loading: false,   
     
      temp: [{id:1,  name: "Mark Doe",    status:"active", image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
      {id:2,  name: "Clark Man",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar6.png"} ,
      {id:3,  name: "Jaden Boor",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar5.png"} ,
      {id:4,  name: "Srick Tree",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
      {id:5,  name: "Erick Doe",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar3.png"} ,
      {id:6,  name: "Francis Doe", status:"active", image:"https://bootdey.com/img/Content/avatar/avatar2.png"} ,
      {id:8,  name: "Matilde Doe", status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"} ,
      {id:9,  name: "John Doe",    status:"active", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
      {id:10, name: "Fermod Doe",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar7.png"} ,
      {id:11, name: "Danny Doe",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},],
      error: null,
      search: null
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







  renderItem = ({item}) => {
    return (
    
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
             
            </View>
            {/* <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.status}</Text>
            </View> */}
          </View>
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
      
      placeholder="Search Here..."
          lightTheme round editable={true}
          value={this.state.search}
          onChangeText={this.updateSearch} />; 
  }; 

  updateSearch = search => {
        this.setState({ search }, () => {
            if ('' == search) {
                this.setState({
                    data: [...this.state.temp]
                });
                return;
            }
            
            this.state.data = this.state.temp.filter(function(item){
                return item.name.includes(search);
              }).map(function({id, name, image}){
                return {id, name, image};
            });
        });
  };











  render() {
    return(
      <View style={{ flex: 1 }} >
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
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
}); 