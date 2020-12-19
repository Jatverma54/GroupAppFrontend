import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import ImageView from "react-native-image-viewing";

export default class YourPostImagesPersonalGroup extends React.Component {

  constructor(props) {
    super(props);
    var ArrayData = props.imagesdata ? props.imagesdata : []
    this.state = {
      countFrom: 5,
      conditionalRender: false,

      images: ArrayData,
      ImageData: [],
      isVisible: 'false',
      imageindex: null,
      loading: true,
      isImageLoaded: true
    };
  }



  renderOne() {
    const { images } = this.state;
    const { countFrom } = this.state;
    const conditionalRender = [1, 2, 3, 4].includes(images.length);
    return (


      <View style={styles.row} >

        {((images.length < 2) ?

          <View style={styles.ImageView} >
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.setState({ isVisible: true, imageindex: 0 }) }}>
              <Image
                source={{ uri: images[0] }}
                style={[styles.stretch, { display: (!this.state.isImageLoaded ? 'flex' : 'none') }]}
                onLoad={() => this.setState({ isImageLoaded: true })}
                onLoadEnd={() => this.setState({ isImageLoaded: false })}
              />
              <ActivityIndicator
                animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
              />
            </TouchableOpacity>
          </View>

          :
          <TouchableOpacity style={[styles.imageContent, styles.imageContent1]} onPress={() => { this.setState({ isVisible: true, imageindex: 0 }) }}>

            <Image source={{ uri: (conditionalRender) ? images[0] : images[0] }}
              style={[styles.image, { display: (!this.state.isImageLoaded ? 'flex' : 'none') }]}
              onLoad={() => this.setState({ isImageLoaded: true })}
              onLoadEnd={() => this.setState({ isImageLoaded: false })}
            />
            <ActivityIndicator
              animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
            />
          </TouchableOpacity>
        )}



      </View>


    );
  }
  _onLoadEnd = () => {
    this.setState({
      loading: false
    })
  }


  renderTwo() {
    const { images } = this.state;
    const { countFrom } = this.state;
    const conditionalRender = [2, 3].includes(images.length) || images.length > +countFrom && [2, 3].includes(+countFrom);


    let index;
    let index1;
    if (conditionalRender) {
      index = 1;
      index1 = 2;
    } else {
      index = 0;
      index1 = 1;
    }
    return (

      <View style={styles.row}>
        <TouchableOpacity style={[styles.imageContent, styles.imageContent2]} onPress={() => { this.setState({ isVisible: true, imageindex: index }) }}>
          <Image source={{ uri: (conditionalRender) ? images[1] : images[0] }}
            style={[styles.image, { display: (!this.state.isImageLoaded ? 'flex' : 'none') }]}
            onLoad={() => this.setState({ isImageLoaded: true })}
            onLoadEnd={() => this.setState({ isImageLoaded: false })}
          />
          <ActivityIndicator
            animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
          />
        </TouchableOpacity>
        { (images.length > 2) && <TouchableOpacity style={[styles.imageContent, styles.imageContent2]} onPress={() => { this.setState({ isVisible: true, imageindex: index1 }) }}>
          <Image source={{ uri: (conditionalRender) ? images[2] : images[1] }}
            style={[styles.image, { display: (!this.state.isImageLoaded ? 'flex' : 'none') }]}
            onLoad={() => this.setState({ isImageLoaded: true })}
            onLoadEnd={() => this.setState({ isImageLoaded: false })}
          />
          <ActivityIndicator
            animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
          />
        </TouchableOpacity>}

      </View>
    );
  }

  renderThree() {
    const { images } = this.state;
    const { countFrom } = this.state;
    const overlay = !countFrom || countFrom > 5 || images.length > countFrom && [4, 5].includes(+countFrom) ? this.renderCountOverlay(true) : this.renderOverlay();
    const conditionalRender = images.length == 4 || images.length > +countFrom && +countFrom == 4;


    let index;
    let index1;
    if (conditionalRender) {
      index = 1;
      index1 = 2;
    } else {
      index = 2;
      index1 = 3;
    }



    return (
      <View style={styles.row}>
        <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => { this.setState({ isVisible: true, imageindex: index }) }}>
          <Image source={{ uri: (conditionalRender) ? images[1] : images[2] }}
            style={[styles.image, { display: (!this.state.isImageLoaded ? 'flex' : 'none') }]}
            onLoad={() => this.setState({ isImageLoaded: true })}
            onLoadEnd={() => this.setState({ isImageLoaded: false })}
          />
          <ActivityIndicator
            animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => { this.setState({ isVisible: true, imageindex: index1 }) }}>
          <Image source={{ uri: (conditionalRender) ? images[2] : images[3] }}
            style={[styles.image, { display: (!this.state.isImageLoaded ? 'flex' : 'none') }]}
            onLoad={() => this.setState({ isImageLoaded: true })}
            onLoadEnd={() => this.setState({ isImageLoaded: false })}
          />
          <ActivityIndicator
            animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
          />
        </TouchableOpacity>
        {overlay}
      </View>
    );
  }

  renderOverlay() {
    const { images } = this.state;
    return (
      <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => { this.setState({ isVisible: true, imageindex: images.length - 1 }) }}>
        <Image source={{ uri: images[images.length - 1] }}
          style={[styles.image, { display: (!this.state.isImageLoaded ? 'flex' : 'none') }]}
          onLoad={() => this.setState({ isImageLoaded: true })}
          onLoadEnd={() => this.setState({ isImageLoaded: false })}
        />
        <ActivityIndicator
          animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
        />
      </TouchableOpacity>
    );
  }

  renderCountOverlay(more) {
    const { images } = this.state;
    const { countFrom } = this.state;
    const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);
    const conditionalRender = images.length == 4 || images.length > +countFrom && +countFrom == 4;
    return (
      <TouchableOpacity style={[styles.imageContent, styles.imageContent3]} onPress={() => { this.setState({ isVisible: true, imageindex: 4 }) }}>
        <Image source={{ uri: (conditionalRender) ? images[3] : images[4] }}
          style={[styles.image, { display: (!this.state.isImageLoaded ? 'flex' : 'none') }]}
          onLoad={() => this.setState({ isImageLoaded: true })}
          onLoadEnd={() => this.setState({ isImageLoaded: false })}
        />
        <ActivityIndicator
          animating={this.state.isImageLoaded} style={{ justifyContent: "center", position: 'absolute', flexDirection: "row", alignItems: "center", alignContent: "center", alignSelf: "center", bottom: 0, left: 0, right: 0, height: 45 }} color="black"
        />
        <View style={styles.overlayContent}>
          <View style={{ width: "100%" }}>
            <Text style={styles.count}>+{extra}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  flag = true;
  getimageArray = (images) => {


    if (images.length > 0 && this.flag) {


      for (var i in images) {

        this.state.ImageData.push({ uri: images[i] });
      }


      this.flag = false;
    }

  }
  render() {


    const { modal, index, countFrom, isVisible, imageindex } = this.state;
    const { images } = this.state;
    const imagesToShow = [...images];

    if (countFrom && images.length > countFrom) {
      imagesToShow.length = countFrom;
    }

    { isVisible != true && this.getimageArray(images) }


    return (
      <View style={styles.container}>
        {[1, 2, 3, 4].includes(imagesToShow.length) && this.renderOne()}
        {imagesToShow.length >= 2 && imagesToShow.length != 4 && this.renderTwo()}
        {imagesToShow.length >= 4 && this.renderThree()}




        {isVisible &&

          <ImageView
            images={this.state.ImageData}
            imageIndex={imageindex}
            visible={isVisible}
            onRequestClose={() => { this.setState({ isVisible: false }) }}
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
  row: {
    flexDirection: 'row',

  },
  imageContent: {
    borderWidth: 1,
    borderColor: 'black',
    height: 120,
  },
  imageContent1: {
    width: '100%',
  },
  imageContent2: {
    width: '50%',
  },
  imageContent3: {
    width: '33.33%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  //overlay efect
  overlayContent: {
    flex: 1,
    position: 'absolute',
    zIndex: 100,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  count: {
    fontSize: 40,
    color: "#ffffff",
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 139, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginLeft: 25
  },
  ImageView: {
    flex: 1,
    width: '100%',
    height: "100%",
  },
  stretch: {
    flex: 1,
    resizeMode: "contain",
    width: 400,
    height: 200,
  },
  overlayCancel: {
    padding: 20,
    position: 'absolute',
    right: 10,
    top: 0,
  },
  cancelIcon: {
    color: 'black',
    marginTop: 10

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
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }

});  