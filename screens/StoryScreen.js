import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  Text
} from 'react-native';




const StoryScreen = ({ navigation }) => {
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [Story, setStory] = useState('');


  getData = async () => {
    // const url = `https://jsonplaceholder.typicode.com/users`;
    // this.setState({ loading: true,data:'' });

    //  try {
    //     const response = await fetch(url);
    //     const json = await response.json();
    //     this.setResult(json);
    //  } catch (e) {
    //     this.setState({ error: 'Error Loading content', loading: false });
    //  }
  };

  setResult = (res) => {

    setuserimageUrl(res);
    seterror(res.error || null);
    setloading(false);

  }





  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
      }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    error != null ?
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.state.error}</Text>
        <Button onPress={
          () => {
            this.getData();
          }
        } title="Reload" />
      </View> :
      <View style={styles.container}>
        <ScrollView>

          <View style={{ marginBottom: 10, marginRight: 10 }}>


            <Button title="Group APP features" onPress={() => navigation.navigate('GroupAppFeatures')} />


          </View>

          <Text style={{fontWeight:'900'}}>Hey Folks,{'\n'}{'\n'}Hope you are liking the app.{'\n'}{'\n'}<Text style={{fontWeight: 'bold'}}>Purpose of GroupApp:</Text>{'\n'}We see different Public/Personal/Professional groups as a great way to stay connected with friends, family, teams and the world. Hence we came up with this app idea to utilize the power of the group communication to the fullest by keeping your personal/public/professional networking under one umberalla.{'\n'}
     {'\n'}<Text style={{fontWeight: 'bold'}}>Story behind GroupApp:</Text>{'\n'}My father is battling with multiple myeloma. Fortunate enough, he is doing good after 1 year of rigorous medical procedures, strong committment and patience. While undergoing treatment, we always used to scroll the web groups for guidance on different healthcare groups for our open questions.{'\n'}Unfortunately, due to less information or less participation of certified healthcare providers on those groups, we used to feel helpless in different scenarios where there was no one to guide us.
     {'\n'}Lately, we analyzed that there is no such specific app where a health care provider who are selflessly willing to serve the community can connect with different soldiers(Patients battling with different diseases) and still keep his personal social life separate from the groups by not sharing his personal phone and networking id details.
     {'\n'}So with this idea, GroupApp comes into the world so that it can connect more healthcare providers as well as different members of the society together in one Umbrella when it comes to socializing on various group whether public, private or professional.
     {'\n'}{'\n'}<Text style={{fontWeight: 'bold',color:'#CAAC3E'}}>Hence, I would like to dedicate this app to my and all the fathers who are battling hard to keep their family ends meet{'\n'}We wish you all a healthy life</Text>{'\n'}{'\n'}
     Also, I would like to request from bottom of my heart to different medical service providers to join different medical groups created by people on various topics on GroupApp and lets help everyone to acheive a better life.
     {'\n'}{'\n'}<Text style={{fontWeight: 'bold'}}>Heartiest thanks to all the Medical workers.There is a reason why you get compared with god,{'\n'}{'\n'}Founder Group APP</Text>
       </Text>


        </ScrollView>

      </View>
  );

}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    //backgroundColor: '#3498db',
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




export default StoryScreen;