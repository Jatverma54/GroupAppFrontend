import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ListView
} from 'react-native';

export default class ViewMembers extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
         {image: "https://bootdey.com/img/Content/avatar/avatar6.png", username:"johndoe1"},
         {image: "https://bootdey.com/img/Content/avatar/avatar2.png", username:"johndoe2"},
         {image: "https://bootdey.com/img/Content/avatar/avatar3.png", username:"johndoe3"},
         {image: "https://bootdey.com/img/Content/avatar/avatar4.png", username:"johndoe4"},
         {image: "https://bootdey.com/img/Content/avatar/avatar1.png", username:"johndoe5"},
         {image: "https://bootdey.com/img/Content/avatar/avatar6.png", username:"johndoe6"},
         {image: "https://bootdey.com/img/Content/avatar/avatar1.png", username:"johndoe7"},
         {image: "https://bootdey.com/img/Content/avatar/avatar2.png", username:"johndoe8"},
         {image: "https://bootdey.com/img/Content/avatar/avatar6.png", username:"johndoe2"},
      ]),
    };
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.body}>
            <ListView style={styles.container} enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={(user) => {
                return (
                  <TouchableOpacity>
                    <View style={styles.box}>
                      <Image style={styles.image} source={{uri: user.image}}/>
                      <Text style={styles.username}>{user.username}</Text>
                      <View style={styles.iconContent}>
                        <Image style={styles.icon} source={{uri: "https://png.icons8.com/customer/office/40"}}/>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
            }}/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    width: 60,
    height: 60,
  },
  body: {
    padding:30,
    backgroundColor :"#E6E6FA",
  },
  box: {
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  username:{
    color: "#20B2AA",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10
  },
  iconContent:{
    width: 60,
    height: 60,
    backgroundColor: '#40E0D0',
    marginLeft: 'auto',
    alignItems: 'center'
  },
  icon:{
    width: 40,
    height: 40,
  }
});
 