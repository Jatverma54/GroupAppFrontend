import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native';
import {DrawerActions,useNavigation} from '@react-navigation/native';
import {
  DrawerItem,
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
  AsyncStorage
} from 'react-native';

import { MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import DrawerLogo from '../Pictures/DrawerLogo.png';
import FooterLogo from '../Pictures/Father.png';
import colors from '../constants/colors';
import ImageView from "react-native-image-viewing";




  const DrawerContent=(props)=> {
    const navigation = useNavigation();
    const [isVisible, setisVisible] = useState(false);
    const [error, seterror] = useState(null);
    const [loading, setloading] = useState(false);
    const [userimageUrl, setuserimageUrl] = useState('');
    
    getData = async ()  => {
      // const url = `https://jsonplaceholder.typicode.com/users`;
      // this.setState({ loading: true });
       
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
    if (loading) {return (
      <View style={{ flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"}}>
       <ActivityIndicator size="large" color="black" />
      </View>
    );
  } 
  
  
    const images = [
      {
        uri: userimageUrl,
      },
    
    ];


    // saveDataToStorage = (token, userId) => {
    //   AsyncStorage.setItem(
    //     'userData',
    //     JSON.stringify({
    //       token: token,
    //       userId: userId,
       
    //     })
    //   );
    // };
  
    LogOut=async()=>{
     
try{

  const userData = await AsyncStorage.getItem('userData');
  const transformedData = JSON.parse(userData);
  const { token, userId } = transformedData;

      var myHeaders = new Headers();
      //myHeaders.append("Content-Type", "multipart/form-data");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer "+token);
   
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
       // body:JSON.stringify(personInfo), //formdata,
        //redirect: 'follow'
      };

      const response = await fetch("http://192.168.0.105:3000/users/logout", requestOptions
          
        
      );

      if(response.ok){
        await  AsyncStorage.removeItem('userData');
        navigation.navigate('LoginScreen');
      }
     else{
  
    //   saveDataToStorage(token, userId)
       alert("Unable to logout. Please try again")
     }
     
  
    }catch(e){
console.log(e)
    }
    }
   
    return (
      error != null ?
      <View style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', alignItems: 'center' }}>
          <Text>{this.state.error}</Text>
        <Button onPress={
          () => {
            this.getData();
          }
        }  >
          <MaterialCommunityIcons name="reload" size={30} style={{height:15,width:15,}}/>
        </Button>
      </View> :
      // <DrawerContentScrollView {...props}>
        <View {...props}
          style={
            styles.drawerContent
          }
        >
          <View style={styles.userInfoSection}>

            <TouchableOpacity  onPress={() => setisVisible(true)}>
            <Avatar.Image
              source={DrawerLogo}
              size={90}
            />
            </TouchableOpacity>


            {isVisible&&
            
            <ImageView
  images={images}
  imageIndex={0}
  visible={isVisible}
  onRequestClose={() =>  setisVisible(false)}
 
/>
            
            
            }


            <Title style={styles.title}>Jatin Verma</Title>
            <Paragraph style={[styles.paragraph, styles.caption]}>
                  Groups App
                </Paragraph>
                <Caption style={styles.caption}>Its All About Groups</Caption>
            <View style={styles.row}>
             
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
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
             
       
                labelStyle={{color:colors.drawerTextcolor,fontWeight: colors.drawerfontWeight,width:colors.drawerwidth, fontSize: colors.drawerfontSize,
                
              }}
              onPress={() => navigation.dispatch(DrawerActions.jumpTo('Public Groups'))}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome name="feed" color={color} size={size} />
              )}
              label='Public Groups Feed'
              labelStyle={{marginLeft:5, color:colors.drawerTextcolor,fontWeight: colors.drawerfontWeight,width:colors.drawerwidth, fontSize: colors.drawerfontSize,}}
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
              labelStyle={{color:colors.drawerTextcolor,fontWeight: colors.drawerfontWeight,width:colors.drawerwidth, fontSize: colors.drawerfontSize,}}
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
              labelStyle={{color:colors.drawerTextcolor,fontWeight: colors.drawerfontWeight,width:colors.drawerwidth, fontSize: colors.drawerfontSize,}}
              onPress={() =>  navigation.dispatch(DrawerActions.jumpTo('Profile'))}
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
              labelStyle={{color:colors.drawerTextcolor,fontWeight: colors.drawerfontWeight,width:colors.drawerwidth, fontSize: colors.drawerfontSize,}}
              onPress={() => LogOut()}
            />

          </Drawer.Section>
         
         <TouchableOpacity  onPress={() => navigation.navigate('StoryScreen')}>
         <View style={styles.drawerSectionFooter}>
        
         <Avatar.Image
              source={FooterLogo}
              size={100}
            />
         <Paragraph style={[styles.paragraphfooter, styles.caption]}>
          Dedicated to all the Fathers
         </Paragraph>
       
       </View>
       </TouchableOpacity>
           

          
        </View>
      /* </DrawerContentScrollView> */
    );
              
  }
  
  const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      backgroundColor:colors.drawerBackgroundcolor,
      paddingTop:38
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      marginTop: 20,
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
    drawerSectionFooter:{
      flexDirection:'column',
      justifyContent: 'flex-end',
      paddingVertical: "100%",
      alignItems: 'center',
      marginRight: 15,
    //  marginVertical:10
    },
    paragraphfooter: {
      fontWeight: 'bold',
      marginRight: 3,
      marginTop:10,
      color:'#CAAC3E'
    },
  });


export default  DrawerContent;
 