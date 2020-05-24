import 'react-native-gesture-handler';
import React ,{ useState } from 'react';
import {createStackNavigator  } from '@react-navigation/stack';
import colors from '../constants/colors';
import PersonalGroupsScreen from '../screens/PersonalGroupScreens/PersonalGroupsScreen';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet,TouchableOpacity, Text,Left,StatusBar ,View, ImageBackground, Image, Button, Modal } from 'react-native';
import {NavigationContainer,DrawerActions} from '@react-navigation/native';
import JoinedPublicGroupsScreen from '../screens/JoinPublicGroupScreen/JoinedPublicGroupsScreen';
import JoinedGroupInsideGroupFeed from '../screens/JoinPublicGroupScreen/JoinedGroupInsideGroup';
import { Appbar, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import FeedDetails from '../components/FeedDetails';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NotificationScreen from '../screens/NotificationScreen';
import BackArrow from '../Pictures/BackArrow.png';
import YourPublicGroupPostscreen from '../screens/JoinPublicGroupScreen/YourPublicGroupPostscreen';
import CreateaNewPost from '../screens/Posts/CreateaNewPost';
import TextInputClass from '../screens/Posts/TextInputClass';


  const JoinedPublicGroupStack = createStackNavigator();
  const JoinedPublicGroupStackNavigator =(props)=>{
    const navigation = useNavigation();
    return (
  
    
        <JoinedPublicGroupStack.Navigator   >
         

        <JoinedPublicGroupStack.Screen 
         options={{headerShown:false}} 
            name='JoinedPublicGroupsScreen' 
            component={withMyHook(JoinedPublicGroupsScreen)}/>

     
       
       
        </JoinedPublicGroupStack.Navigator>
    
    
    );
  };

  function withMyHook(Component) {
    return function WrappedComponent(props) {
      const myHookValue = useNavigation();
      return <Component {...props} myHookValue={myHookValue} />;
    }
  }



 

  const JoinedGroupInsideGroupTabStack = createMaterialTopTabNavigator();
  const JoinedGroupInsideGroupTabStackNavigator =(props)=>{
    
    
    return (
  
     
        <JoinedGroupInsideGroupTabStack.Navigator   initialRouteName="Feed" 
        activeColor="black"  
        inactiveColor="Grey"
       barStyle={{ backgroundColor: 'white' }}
       tabBarOptions={{
        
  
        labelStyle: {
          fontSize: colors.TabLabelStylefontSize,
          fontWeight: colors.TabLabelStylefontWeight,
         width:colors.TabLabelStylewidth
        },   
        
      }}
      
    >        
        <JoinedGroupInsideGroupTabStack.Screen  options={{
           tabBarLabel: ({focused, tintColor:color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      
            name='Feed' 
            component={withMyHook(JoinedGroupInsideGroupFeed)}/>




<JoinedGroupInsideGroupTabStack.Screen  options={{ tabBarLabel: 'Your Posts',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="local-post-office" color={color} size={26} />
          ),
          labelStyle:{fontWeight:"bold"}
        }}
      
      
      name='Your Posts' 
      component={YourPublicGroupPostscreen}/>



<JoinedGroupInsideGroupTabStack.Screen  options={{
         tabBarLabel: ({focused, tintColor:color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      
      
      name='Notification' 
      component={NotificationScreen}/>
  
        </JoinedGroupInsideGroupTabStack.Navigator>
    
      
    );
  };
  


  const HomeFeedStack = createStackNavigator();
  export const HomeFeedStackNavigator =()=>{
    
     
    return (
  
    
       <HomeFeedStack.Navigator  headerMode='screen' screenOptions={{ headerLeft:()=>
        <HeaderLeftFeed/>
       ,
       
       cardStyle: { backgroundColor: colors.cardStyleBackgroundColor},
    cardOverlayEnabled: true,
    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: [0, 0.25, 0.7, 1],
        }),
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
          extrapolate: 'clamp',
        }),
      },
    }),     
    // headerTitleStyle: {
    //   fontWeight: 'bold',
      
      
    // },
        headerTintColor: colors.StackheaderTintColor,
        headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor,height:85 },
      }}>
        

<HomeFeedStack.Screen  
     options={{        
      headerTitle: 'Group Feed' }} 
     
            name='Group FEED' 
            component={JoinedGroupInsideGroupTabStackNavigator}/>  

<HomeFeedStack.Screen 
 
 options={{
   
   headerTitle: "Create a New Post" }} 
   name='CreateaNewPost' 
   component={withMyHook(CreateaNewPost)}/>

   
<HomeFeedStack.Screen 
 
 options={{
   
   headerTitle: "Start a conversation" }} 
   name='CreateaTextPost' 
   component={withMyHook(TextInputClass)}/>

</HomeFeedStack.Navigator>


    );
  };

  const HeaderLeftFeed = () => {
    const navigation = useNavigation();
    return (
      <View style={styles.ImageHeader}>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.goBack()}>
        <Image   style={styles.ImageIconStyle} 
         source={BackArrow}/>
       
         </TouchableOpacity>
      </View>
    );
  };


  const HeaderRightFeed = () => {
    const navigation = useNavigation();
    return (
      <View style={styles.ImageHeaderRight}>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.goBack()}>
        <Image   style={styles.ImageIconStyleFeedRight} 
         source={require('../Pictures/Post_Add.png')}/>
         <Text>Add Post</Text>
         </TouchableOpacity>
      </View>
    );
  };



  const styles = StyleSheet.create({

    DrawerText: {
    
      backgroundColor: colors.rootscreenColor,
    }
  ,ImageIconStyle:{
  
    padding: 10,
    margin: 5,
    height: 30,
    width: 50,
    resizeMode : 'stretch',
   
  },
  ImageHeader:{
  padding: 5,
    marginLeft:7,
  justifyContent:'flex-end'
  },
  ImageIconStyleFeedRight:{
    marginTop: 10,
    marginLeft:10,
    height: 30,
    width: 34,

    resizeMode : 'stretch',
  },
  ImageHeaderRight:{
   
    marginRight:7,
      justifyContent:'flex-end'
  }
  });
  
  export default JoinedPublicGroupStackNavigator;
 