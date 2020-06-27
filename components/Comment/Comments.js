import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';

import {
 
  Divider, 
 
} from 'react-native-paper';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import ViewMoreText from 'react-native-view-more-text';

export default class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {id:1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name:"Jatin Vremakklkkklklkjkjkjkjkjkjkl jhjhjhjhjhhjjh", likeCount:"1",   comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name:"John DoeLink",    likeCount:"1", comment:"Lorem ipsum dolor sit amet."},
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name:"March SoulLaComa",likeCount:"1", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name:"Finn DoRemiFaso", likeCount:"1", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Maria More More", likeCount:"1", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name:"Clark June Boom!",likeCount:"1", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name:"The googler",    likeCount:"2",  comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
      ],
      msg: '',
     
     
      height: 40,
      //fontWeight
    


    }
    this.send = this.send.bind(this);
   
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





  LikesScreen(){

return(

  <View style={{ flex:1 }} >
  <View style={{ height: 10,padding:10 }}>
 
  
  <View style={{ flex: 3 ,backgroundColor:"white" }}>
           
         
        <View>
       <Text>Likes</Text>
       <Divider style={{height: 0.5,marginTop:10,marginLeft:20, width: "90%",backgroundColor:"grey"}}/>  
        </View>                
      
  </View>
              
</View>


 </View>
)



  }

  send() {
    if (this.state.msg.length > 0) {
      var data = this.state.data;
      data.push({
        id:Math.floor((Math.random() * 99999999999999999) + 1),
        name: "example",
        comment: this.state.msg,
        image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'
      });
      this.setState({data:data,msg:'',height:40});
    //   setTimeout(() => {
    //     this.reply();
    //   }, 2000);
    }
  }

  updateSize = (height) => {

    if(height<200){
    this.setState({
      height
    });
  }
  }
 

  render() {

   
    const {height} = this.state;

    return (
        <KeyboardAvoidingView  style={styles.keyboard}>
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}

      //   ListHeaderComponent={
      //    this.LikesScreen()
          
      // }

        // ItemSeparatorComponent={() => {
        //   return (
        //     <View style={styles.separator}/>
        //   )
        // }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          return(
            <View style={styles.container}>
            <Image style={styles.avatar} source={{ uri: Notification.image }}></Image>
            <View style={styles.ContainerAtCenter}>
                <View style={styles.contentContainer}>
                  

                   {!(Notification.name.length>38)?
                    <Text  style={styles.name}>{Notification.name}</Text>
                    :<Text style={styles.name}>{Notification.name.toString().substring(0,38)}..</Text>}
                  
                    <Text style={styles.Time}>2w</Text>

                    <ViewMoreText
          numberOfLines={4}
          renderViewMore={this.renderViewMore}
          renderViewLess={this.renderViewLess}
          textStyle={styles.title2}
        >   

                    <Text style={styles.content}>{Notification.comment}</Text>
                    </ViewMoreText>
                </View>
               
                <View style={styles.LikesContainer}>
                   
         
           <TouchableOpacity style={styles.likeBtn}><Text style={{fontWeight:"bold",color:"grey"}}>Like</Text></TouchableOpacity>
           <Text style={{fontSize:12,marginLeft:80}} >{Notification.likeCount} {(parseInt(Notification.likeCount)>1)?"Likes":"Like"}</Text>  
                    {/* <TouchableOpacity style={styles.replyBtn}><Text>Reply</Text></TouchableOpacity> */}
                </View>
            </View>
        </View>
          )
        }}/>



<View style={{

flexDirection: 'row',
alignSelf: 'flex-end',
padding: 10,
height: height,
// width: width - 20,
marginRight:80,
backgroundColor: 'white',
margin: 10,
shadowColor: '#3d3d3d',
shadowRadius: 2,
shadowOpacity: 0.5,
shadowOffset: {
  height: 1,
},
borderColor:'#696969',
borderWidth:1,
borderRadius:30,
borderBottomWidth: 1,






}}>
  <ScrollView>
              <TextInput
               style={{flex:1, height:height, 
                width:"100%",
               
               
                flex:1,
              }}

                editable={true}
                placeholder="Type a message"
                multiline={true}
                value={this.state.msg}
               // placeholderTextColor = "#696969"
               
                onChangeText={msg => this.setState({ msg })}
                blurOnSubmit={false}
                onSubmitEditing={() => this.send()}
               
                returnKeyType="send"
                onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
              
                multiline style={{
                  width: '100%',height:height, marginTop:-10,fontSize:18,padding:10
                 
           }}

                />
</ScrollView>

          {/* <TextInput style={{flex:1}}
          //maxLength={500}
              placeholder="Type a message"
             // placeholderTextColor="black"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              style={[newStyle]}
              editable={true}
              multiline={true}
              value={newValue}
              onChangeText={(newValue) => this.setState({newValue})}             
              onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
              
               multiline style={{
                    ...styles.editor, fontSize: 26,
                    textAlign: 'center', color: "black", 
             }}>
                      
              </TextInput> */}
             
          
           </View>

           
           
           <View style={styles.sendIcon}>
           <TouchableOpacity onPress={() => this.send()}>
            <MaterialCommunityIcons
                  name="send"
                //  color={color}
                  size={40}
                />
                </TouchableOpacity>
                </View>

              </KeyboardAvoidingView>
            
    );
  }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop:10,
  },
  keyboard: {
    flex: 1,
   justifyContent: 'center',
   backgroundColor:"white"
  },

  editor: {
   // justifyContent: 'center',
   height:"100%",
    width: '100%',
   // fontSize:5,
   // marginTop:-70
},
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
   // width: width - 20,
    marginRight:80,
    backgroundColor: 'white',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor:'#696969',
    borderWidth:1,
   
  },

sendIcon:{

  flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
   // height: 40,
   // width: width - 20,
    //marginRight:80,
    marginTop:-62,
    marginRight:10,
    backgroundColor: 'white',
   // margin: 10,
   

},

  container: {
    //paddingLeft: ,
    paddingRight: 5,
   paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    
  },
  content: {
  //  marginLeft: 16,
    //flex: 1,

  //   borderBottomColor: 'black',
  //  // backgroundColor: '#FFFFFF',
  //   borderRadius:60,
  //   borderBottomWidth: 1,
  //   width:width,
  //   height:45,
  //   marginBottom:20,
  //   flexDirection: 'row',
  borderRadius:30,
  flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 5,
    height: 70,
   // width: width ,
   // marginRight:20,
    backgroundColor: "#e9ebee",
    margin: 5,
    shadowColor: '#3d3d3d',
    shadowRadius: 6,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor:'#696969',
    borderWidth:1,
    fontSize:15

  },
  contentHeader: {
  // flex:1,
   // justifyContent: "space-between",
   
    //width:"100%",
    //flexWrap:"nowrap"
  //  marginBottom: 3


  //paddingVertical:,
  paddingHorizontal: 10,
  borderTopLeftRadius: 1,
  borderTopRightRadius: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  },
  separator: {
    height: 0.5,
    backgroundColor: "#CCCCCC",
    width:"78%",
    marginLeft:60

  },

  image:{
    width:40,
    height:40,
    borderRadius:20,
    marginLeft:10
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
   name:{
    fontSize:12,
    fontWeight:"bold",
   // flexDirection:"row",
    width:"80%",
    marginLeft:10,
  // alignSelf:"flex-start"


  },


    container: {
        flexDirection: 'row',
        marginBottom: 15
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10,
        marginLeft:10 
    },
    ContainerAtCenter: {
        width: screenWidth * 0.7

    },
    contentContainer: {
        marginBottom: 10,
        padding: 10,
        paddingTop: 5,
        backgroundColor: '#e9ebee',
        borderRadius: 10,
        width: width-70 ,
         marginRight:20,
    },
    name: {
        fontWeight: 'bold',
       
    },
   
    image: {
        borderRadius: 10
    },
    LikesContainer: {
        marginTop: -5,
        marginLeft:5,
        flexDirection: 'row',
       // width: 0.6 * screenWidth,

    },
    Time: {
        flex: 1,
        marginLeft:300,
        marginTop:-20
    },
    likeBtn: {
        textAlign: 'center',
        flex: 1,
       
      
    },
    replyBtn: {
        textAlign: 'center',
        flex: 1
    }



});  