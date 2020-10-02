import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Alert
} from 'react-native';

import Post_Add from '../../Pictures/Post_Add.png';
import lock_Icon from '../../Pictures/lock.png';

export default class TextInputClass extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newValue: '',
      height: 40,
      //fontWeight
      fontSize: 20,
      width: "100%",
      marginLeft: 16,
      marginRight: 16,
      borderBottomColor: '#FFFFFF',
      flex: 1,
      marginTop: 20,
    }
  }
  updateSize = (height) => {
    this.setState({
      height
    });
  }


  render() {
    const { newValue, marginLeft, borderBottomColor, marginRight, flex, marginTop, width, height, fontWeight, fontSize } = this.state;
    let newStyle = {
      height, fontSize, marginLeft, borderBottomColor, flex, marginTop, width, marginRight
    }

    return (

      <View style={styles.container} >

        <View style={styles.inputContainer} >
          <ScrollView>
            <TextInput style={styles.inputs}
              //maxLength={500}
              placeholder="Type your thoughts here :)"
              // placeholderTextColor="black"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              style={[newStyle]}
              editable={true}
              multiline={true}
              value={newValue}
              onChangeText={(newValue) => this.setState({ newValue })}
              onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}

              multiline style={{
                ...styles.editor, fontSize: 26,
                textAlign: 'center', color: "black",
              }}>

            </TextInput>
          </ScrollView>
        </View>

        <View>

          <Image style={styles.inputIcon} source={Post_Add} />

          <Text style={styles.TextStyle}>Share</Text>

        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: "100%",
    height: "78%",
    marginBottom: 20,
    flexDirection: 'row',
    //alignItems:'center'
    marginTop: 5
  },
  inputs: {
    height: 45,
    width: "100%",
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 25,

  },
  inputIcon: {

    width: 60,
    height: 60,
    alignSelf: "center",
    //marginTop:270
  },

  TextStyle: {
    //alignSelf:"center",
    fontWeight: "bold",
    width: "100%",
    marginLeft: 185
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: "#FF4DFF",
  },
  signUpText: {
    color: 'white',
  },
  editor: {
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
});


