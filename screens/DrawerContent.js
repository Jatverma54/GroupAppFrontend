import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator,Image } from 'react-native';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import {
  DrawerItem,
  DrawerContentScrollView
} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Button,
  Divider
} from 'react-native-paper';
import {
  AsyncStorage,
  Dimensions,
  Text,
  Alert,
  BackHandler,
 
} from 'react-native';

import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import DrawerLogo from '../Pictures/DrawerLogo.png';
import FooterLogo from '../Pictures/Father.png';
import colors from '../constants/colors';
import ImageView from "react-native-image-viewing";
import Loader from '../components/Loader';
import APIBaseUrl from '../constants/APIBaseUrl';
const { width, height } = Dimensions.get('window');


const DrawerContent = (props,) => {
  const navigation = useNavigation();
  const route=useRoute();
  const [isVisible, setisVisible] = useState(false);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [userimageUrl, setuserimageUrl] = useState('');
  const [userName, setuserName] = useState('');
  const [isImageLoaded, setisImageLoaded] = useState(true);


  // useEffect(() => {

  //   const tryLogin = async () => {

  //     try {
  //       setloading(true)
  //       const userData = await AsyncStorage.getItem('userData');
  //       const transformedData = JSON.parse(userData);
  //       const { token, userId } = transformedData;

  //     var myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");
  //     myHeaders.append("Authorization", "Bearer "+token);     
  //     var requestOptions = {
  //       method: 'GET',
  //       headers: myHeaders,

  //     };

  //     const response = await fetch(`${APIBaseUrl.BaseUrl}/users/userInformation`, requestOptions );             
  //       const json = await response.json();

  //       setuserimageUrl(json.result.profile.profile_pic);
  //       setuserName(json.result.profile.full_name);
  //       setloading(false)
  //    } catch (e) {
  //    setloading(false)
  //     seterror("Reload the Page")
  //       //this.setState({ error: 'Reload the Page',  });
  //       console.log("Error ",e)
  //    }


  //   };

  //   tryLogin();
  // }, []);



  
 



  const images = [
    {
      uri: props.Userdata.profile.profile_pic,
    },

  ];



 const LogOut = async () => {

    try {
      setloading(true)
      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      var myHeaders = new Headers();
      //myHeaders.append("Content-Type", "multipart/form-data");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        // body:JSON.stringify(personInfo), //formdata,
        //redirect: 'follow'
      };

      const response = await fetch(`${APIBaseUrl.BaseUrl}/users/logout`, requestOptions


      );

      if (response.ok) {
        setloading(false)

        await AsyncStorage.clear();// removeItem('userData');

        navigation.navigate('MainScreenPage');
      // route.name=""
      }
      else {
        setloading(false)
        //   saveDataToStorage(token, userId)
        alert("Unable to logout. Please try again")
      }


    } catch (e) {
      setloading(false)
      console.log(e)
      Alert.alert(

        "Something went wrong!!",
        "Please try again",
        [
          { text: "Ok", onPress: () => null }
        ],
        { cancelable: false }
      );
    }
  }
  
  return (

    error != null ?
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.state.error}</Text>
        <Button onPress={
          () => {
            this.getData();
          }
        }  >
          <MaterialCommunityIcons name="reload" size={30} style={{ height: 15, width: 15, }} />
        </Button>
      </View> :
      <DrawerContentScrollView >
      <View {...props}
        style={
          styles.drawerContent
        }
      >
         <Loader isLoading={loading} />
        <View style={styles.userInfoSection}>

          <TouchableOpacity onPress={() => setisVisible(true)}>
            <Image 
              source={{ uri:props.Userdata.profile.profile_pic }}
              style={[styles.avatar,{ display: (!isImageLoaded ? 'flex' : 'none') }]}
                     onLoad={ () => setisImageLoaded(true) }
                     onLoadEnd={() => setisImageLoaded(false) }
                   />
                      <ActivityIndicator
                      animating={isImageLoaded} color="black"
         />
          </TouchableOpacity>


          {isVisible &&

            <ImageView
              images={images}
              imageIndex={0}
              visible={isVisible}
              onRequestClose={() => setisVisible(false)}

            />


          }


          <Title style={styles.title}>{props.Userdata.profile.full_name}</Title>
          <Paragraph style={[styles.paragraph, styles.caption]}>
            Groups App
                </Paragraph>
          <Caption style={styles.caption}>Its All About Groups</Caption>
          <View style={styles.row}>

            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption  ]}>
                Private | Public | GroupChat
                </Paragraph>

            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection} >
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-group"
                color={color}
                size={size}
              />
            )}
            label="Public Groups"


            labelStyle={{
              color: colors.drawerTextcolor, fontWeight: colors.drawerfontWeight, width: colors.drawerwidth, fontSize: colors.drawerfontSize,

            }}
            onPress={() => navigation.dispatch(DrawerActions.jumpTo('Public Groups'))}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <FontAwesome name="feed" color={color} size={size} />
            )}
            label='Public Groups Feed'
            labelStyle={{ marginLeft: 5, color: colors.drawerTextcolor, fontWeight: colors.drawerfontWeight, width: colors.drawerwidth, fontSize: colors.drawerfontSize, }}
            onPress={() => navigation.dispatch(DrawerActions.jumpTo('Public Groups Feed'))}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-group-outline"
                color={color}
                size={size}
              />
            )}
            label="Personal Groups"
            labelStyle={{ color: colors.drawerTextcolor, fontWeight: colors.drawerfontWeight, width: colors.drawerwidth, fontSize: colors.drawerfontSize, }}
            onPress={() => navigation.dispatch(DrawerActions.jumpTo('Personal Groups'))}
          />

          {/* <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome
                  name="suitcase"
                  color={color}
                  size={size}
                />
              )}
              label="Professional Groups"
              labelStyle={{color:colors.drawerTextcolor,fontWeight: colors.drawerfontWeight,width:colors.drawerwidth, fontSize: colors.drawerfontSize,}}
              onPress={() =>  navigation.dispatch(DrawerActions.jumpTo('Professional groups'))}
              /> */}


          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="face-profile"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            labelStyle={{ color: colors.drawerTextcolor, fontWeight: colors.drawerfontWeight, width: colors.drawerwidth, fontSize: colors.drawerfontSize, }}
            onPress={() => navigation.dispatch(DrawerActions.jumpTo('Profile'))}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="logout"
                color={color}
                size={size}
              />
            )}
            label="Logout"
            labelStyle={{ color: colors.drawerTextcolor, fontWeight: colors.drawerfontWeight, width: colors.drawerwidth, fontSize: colors.drawerfontSize, }}
            onPress={() => LogOut()}
          />

        </Drawer.Section>
        <View style={styles.drawerSectionFooter}>
        <TouchableOpacity onPress={() => navigation.navigate('StoryScreen')}>
         

            <Avatar.Image
              source={FooterLogo}
              size={80}
              style={{marginLeft:60}}
            />
            <Paragraph style={[styles.paragraphfooter, styles.caption]}>
              Dedicated to all the Fathers
         </Paragraph>

       
        </TouchableOpacity>
        </View>


      </View>
     </DrawerContentScrollView> 
  );

}

const styles = StyleSheet.create({
  Captioncolor:{
    color: '#CAAC3E'
  },
  drawerContent: {
    flex: 1,
    backgroundColor: colors.drawerBackgroundcolor,
    paddingTop: 38,
    
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
   // marginTop: 5,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,

  },
  drawerSection: {
    marginTop: 15,

  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  drawerSectionFooter: {
    flexDirection: 'column',
    justifyContent: "flex-end",
   // alignContent:"center",
   //paddingVertical: "58%",
    alignItems: 'center',
   flex:1,
   // marginRight: 15,
  //  marginTop:-10,
    marginVertical:130
    
  },
  paragraphfooter: {
    fontWeight: 'bold',
    marginRight: 3,
    marginTop: 10,
    color: '#CAAC3E'
  },
  avatar:{
    width: 90,
    height: 90,
    borderRadius: 25,
  }
});


export default DrawerContent;
