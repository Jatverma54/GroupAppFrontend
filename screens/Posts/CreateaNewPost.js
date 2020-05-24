import React, { Component } from "react";
import {
  View,
  ScrollView,
  DatePickerIOS,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import data from "./static.json";
import TextInputClass from "./TextInputClass";

FAIcon.loadFont();
MDIcon.loadFont();

export default class CreateaNewPost extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Choose an Option</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.CameraOptions.open()} style={styles.button}>
            <Text style={styles.buttonTitle}>Camera Options</Text>
          </TouchableOpacity>        
          <TouchableOpacity onPress={() => this.props.myHookValue.push("CreateaTextPost")} style={styles.button}>
            <Text style={styles.buttonTitle}>Text Input</Text>
          </TouchableOpacity>
          
        </View>

        {/* List Menu */}
        <RBSheet
          ref={ref => {
            this.CameraOptions = ref;
          }}
          height={330}
        >
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Create</Text>
            {data.lists.map(list => (
              <TouchableOpacity
                key={list.icon}
                style={styles.listButton}
                onPress={() => this.CameraOptions.close()}
              >
                <MDIcon name={list.icon} style={styles.listIcon} />
                <Text style={styles.listLabel}>{list.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </RBSheet>

       

      

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  textTitle: {
    fontSize: 25,
    marginTop: 120,
    fontWeight: "bold",
    width:"100%",
    marginLeft:200
    
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50
  },
  button: {
    width: 150,
    backgroundColor: "#4EB151",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 3,
    margin: 10
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    width:"100%",
    marginLeft:30

  },
  listContainer: {
    flex: 1,
    padding: 25
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666"
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },
  listIcon: {
    fontSize: 26,
    color: "#666",
    width: 60
  },
  listLabel: {
    fontSize: 16
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    marginBottom: 20
  },
  gridButtonContainer: {
    flexBasis: "25%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  gridButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  gridIcon: {
    fontSize: 30,
    color: "white"
  },
  gridLabel: {
    fontSize: 14,
    paddingTop: 10,
    color: "#333"
  },
  dateHeaderContainer: {
    height: 45,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dateHeaderButton: {
    height: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  dateHeaderButtonCancel: {
    fontSize: 18,
    color: "#666",
    fontWeight: "400"
  },
  dateHeaderButtonDone: {
    fontSize: 18,
    color: "#006BFF",
    fontWeight: "500"
  },
  inputContainer: {
    borderTopWidth: 1.5,
    borderTopColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  inputIcon: {
    fontSize: 24,
    color: "#666",
    marginHorizontal: 5
  },
  inputIconSend: {
    color: "#006BFF"
  },
  input: {
    flex: 1,
    height: 36,
    borderRadius: 36,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    marginHorizontal: 10
  },
  messageContainer: {
    flex: 1,
    padding: 25
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222"
  },
  message: {
    fontSize: 17,
    lineHeight: 24,
    marginVertical: 20
  },
  messageButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  messageButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#3385ff",
    marginLeft: 10
  },
  messageButtonText: {
    color: "#3385ff",
    fontSize: 16,
    fontWeight: "bold"
  },
  messageButtonRight: {
    backgroundColor: "#3385ff"
  },
  messageButtonTextRight: {
    color: "#fff"
  }
});


