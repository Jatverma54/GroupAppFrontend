import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

const GroupAppFeatures = () => {

  return (
    <View style={styles.container}>
      <ScrollView>

        <Text ><Text style={{ fontWeight: 'bold' }}>Features v1.0</Text>{'\n'}{'\n'}<Text style={{ fontWeight: 'bold' }}>Public Groups:</Text>{'\n'}Public groups will be visible to all the users of GroupHelpMe.{'\n'}{'\n'}Public Group Privacy{'\n'}<Text style={{ fontWeight: 'bold' }}>Open Group:</Text>  Anyone can join and post in the group{'\n'}<Text style={{ fontWeight: 'bold' }}>Private Group:</Text> Group Admin need to approve the joining request of GroupHelpMe users to join the group{'\n'}

          {'\n'}<Text style={{ fontWeight: 'bold' }}>Personal Groups:</Text>{'\n'}Personal groups will be visible to the group members only.{'\n'}{'\n'}Personal Group Privacy{'\n'}Only group admin can add GroupHelpMe users to a personal group.{'\n'}{'\n'}<Text style={{ fontWeight: 'bold' }}>Want to be an investor or want to get in touch with us? Feel free to drop a mail at</Text>{'\n'}support@grouphelpme.com{'\n'}{'\n'}Visit www.grouphelpme.com for latest updates.
       </Text>

    

      </ScrollView>

    </View>
  );
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
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
  listContainer: {
    flex: 1,
    padding: 25,

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
});




export default GroupAppFeatures;