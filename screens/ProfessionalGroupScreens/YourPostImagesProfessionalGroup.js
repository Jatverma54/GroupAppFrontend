import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
 
  TouchableHighlight
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { MaterialCommunityIcons,FontAwesome,MaterialIcons } from '@expo/vector-icons';
import ImageView from "react-native-image-viewing";

export default class YourPostImagesProfessionalGroup extends React.Component {

  constructor(props) {
    super(props);
    var ArrayData= props.imagesdata?props.imagesdata:[]
    this.state = {
      countFrom: 5,
      conditionalRender: false,
    
      images:ArrayData    ,
      ImageData:[],
      isVisible:'false',
      imageindex:null,
     
    };
  }


 

//   clickEventListener() {
//   //  Alert.alert('Alert', 'image clicked');
// console.log();
// const images = [
//   {
//       source: {
//           uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
//       },
//       title: 'Paris',
//       width: 806,
//       height: 720,
//   },
// ];

// <ImageView
//   images={images}
//   imageIndex={0}
//   isVisible={true}
//   renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
// />

//   }

  renderOne() {
    const {images} = this.state;
    const {countFrom} = this.state;
    const conditionalRender = [1,2,3,4].includes(images.length) ;
    return(
    
  
    <View style={styles.row} >

{((images.length<2)?

<View style={styles.ImageView} >
<TouchableOpacity style={{flex:1}} onPress={() => {this.setState({isVisible: true,imageindex:0})}}>

    <Image
  style={styles.stretch}
  source={{uri:images[0]}}
  
  />
   </TouchableOpacity>
</View>

:   
        <TouchableOpacity style={[styles.imageContent, styles.imageContent1]} onPress={() => {this.setState({isVisible: true,imageindex:0})}}>
    
          <Image style={styles.image} source={{uri: (conditionalRender) ? images[0] : images[0]}}/>
        </TouchableOpacity>
        )}


  
      </View>


    );
  }

  renderTwo() {
    const {images} = this.state;
    const {countFrom} = this.state;
    const conditionalRender = [2, 3].includes(images.length) || images.length > +countFrom && [2, 3].includes(+countFrom);


let index;
let index1;
if(conditionalRender){
  index=1;
  index1=2;
}else{
  index=0;
  index1=1;
}
    return(

      <View style={styles.row}>
        <TouchableOpacity style={[styles.imageContent, styles.imageContent2]} onPress={() => {this.setState({isVisible: true,imageindex:index})}}>
          <Image style={styles.image} source={{uri: (conditionalRender) ? images[1] : images[0]}}/>
        </TouchableOpacity>
      { (images.length>2)&& <TouchableOpacity style={[styles.imageContent, styles.imageContent2]} onPress={() => {this.setState({isVisible: true,imageindex:index1})}}>
          <Image style={styles.image} source={{uri: (conditionalRender) ? images[2] : images[1]}}/>
        </TouchableOpacity>}
     
      </View>
    );
  }

  renderThree() {
    const {images} = this.state;
    const {countFrom} = this.state;
    const overlay = !countFrom || countFrom > 5 || images.length > countFrom && [4, 5].includes(+countFrom) ? this.renderCountOverlay(true) : this.renderOverlay();
    const conditionalRender = images.length == 4 || images.length > +countFrom && +countFrom == 4;


    let index;
    let index1;
    if(conditionalRender){
      index=1;
      index1=2;
    }else{
      index=2;
      index1=3;
    }



    return(
      <View style={styles.row}>
        <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => {this.setState({isVisible: true,imageindex:index})}}>
          <Image style={styles.image} source={{uri: (conditionalRender) ? images[1] : images[2]}}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => {this.setState({isVisible: true,imageindex:index1})}}>
          <Image style={styles.image} source={{uri: (conditionalRender) ? images[2] : images[3]}}/>
        </TouchableOpacity>
        {overlay}
      </View>
    );
  }

  renderOverlay() {
    const {images} = this.state;
    return(
        <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => {this.setState({isVisible: true,imageindex:images.length -1})}}>
          <Image style={styles.image} source={{uri: images[images.length - 1]}}/>
        </TouchableOpacity>
    );
  }

  renderCountOverlay(more) {
    const {images} = this.state;
    const {countFrom} = this.state;
    const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);
    const conditionalRender = images.length == 4 || images.length > +countFrom && +countFrom == 4;
    return(
        <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => {this.setState({isVisible: true,imageindex:4})}}>
          <Image style={styles.image} source={{uri: (conditionalRender) ? images[3] : images[4]}}/>
          <View style={styles.overlayContent}>
          <View style={{ width:"100%"}}>
              <Text style={styles.count}>+{extra}</Text>
            </View>
          </View>
        </TouchableOpacity>
    );
  }

 flag=true;
 getimageArray=(images)=>{
 

  if(images.length>0&&this.flag){

   
    for(var i in images){
     
      this.state.ImageData.push({uri:images[i]});
    }

  
   
  this.flag=false;
    }
   
 }
  render() {
   

    const {modal, index, countFrom,isVisible,imageindex} = this.state;
    const {images} = this.state;
    const imagesToShow = [...images];

    if(countFrom && images.length > countFrom) {
      imagesToShow.length = countFrom;
    }
  
 {isVisible!=true&&this.getimageArray(images)}
   
    
    return (
      <View style={styles.container}>
          {[1,2,3,4].includes(imagesToShow.length)  && this.renderOne()}
          {imagesToShow.length >= 2 && imagesToShow.length != 4 && this.renderTwo()}
          {imagesToShow.length >= 4 && this.renderThree()}



         
          {isVisible&&
         
            <ImageView
  images={this.state.ImageData}
  imageIndex={imageindex}
  visible={isVisible}
  onRequestClose={() =>  {this.setState({isVisible: false})}}
  FooterComponent={({ imageIndex }) => (
    <View style={styles.root}>
    <Text style={styles.text}>{`${imageIndex + 1} / ${this.state.ImageData.length}`}</Text>
  </View>
  )}
/>

    
   }


      </View>
    );
  }
}


 




const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  row:{
    flexDirection:'row',
 
  },
  imageContent:{
    borderWidth:1,
    borderColor:'black',
    height:120, 
  },
  imageContent1:{
    width:'100%',
  },
  imageContent2:{
    width:'50%',
  },
  imageContent3:{
    width:'33.33%',
  },
  image:{
    width:'100%',
    height:'100%',
  },
  //overlay efect
  overlayContent: {
    flex: 1,
    position: 'absolute',
    zIndex: 100,
    right: 0,
    width:'100%',
    height:'100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent:'center',
    alignItems:'center'
  },
  count:{
    fontSize:40,
    color: "#ffffff",
    fontWeight:'bold',
    textShadowColor: 'rgba(0, 0, 139, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginLeft:25
  },
  ImageView:{

    flex:1,
//justifyContent:'center',
    width: '100%',
   height: "100%",
 //  resizeMode: 'cover',
  },
  stretch: {
    flex:1,
   // justifyContent:'center',
    // width: '100%',
    // height: "100%",
    resizeMode: "contain",
     width:400,
     height:200,
  // alignSelf:"center",
 
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
  root: {
    height: 64,
    backgroundColor: "#00000077",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 17,
    color: "#FFF"
  }

});  