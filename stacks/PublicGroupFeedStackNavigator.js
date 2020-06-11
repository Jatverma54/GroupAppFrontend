import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator  } from '@react-navigation/stack';
import colors from '../constants/colors';
import PublicGroupFeedScreen from '../screens/PublicGroupScreens/PublicGroupFeedScreen';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet,TouchableOpacity, View,  Image } from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import NotificationScreen from '../screens/NotificationScreen';
const HeaderLeft = () => {
    const navigation = useNavigation();
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
        <Image   style={styles.ImageIconStyle} 
         source={require('../Pictures/menu.png')}/>
         </TouchableOpacity>
      </View>
    );
  };

  const PublicGroupFeedStack = createStackNavigator();
  const PublicGroupFeedStackNavigator =()=>{
    
    return (
  
    
        <PublicGroupFeedStack.Navigator headerMode='float' screenOptions={{ headerLeft: ({}) => <HeaderLeft/>,  cardStyle: { backgroundColor: colors.cardStyleBackgroundColor },
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
            headerTintColor: colors.StackheaderTintColor,
            headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor },
          }}>
         

        <PublicGroupFeedStack.Screen options={{        
            headerTitle: 'Public Groups Feed' }} 
            name='PublicGroupFeedScreen' 
            component={PublicGroupFeedTabStackNavigator}   />


         
        </PublicGroupFeedStack.Navigator>
    
    
    );
  };


  const PublicGroupFeedTabStack = createMaterialTopTabNavigator();
  const PublicGroupFeedTabStackNavigator =(props)=>{
    const navigation = useNavigation();
    return (
  
     
        <PublicGroupFeedTabStack.Navigator   initialRouteName="Feed" 
        activeColor="black"  
        inactiveColor="Grey"
       barStyle={{ backgroundColor: 'white' }}


      

       tabBarOptions={{
        
        indicatorStyle:{
          backgroundColor: colors.StackheaderStyleBackgroundColor
        },
  
  
        labelStyle: {
          fontSize: colors.TabLabelStylefontSize,
          fontWeight: colors.TabLabelStylefontWeight,
         width:colors.TabLabelStylewidth
        },   
        
      }}
     
    >        
        <PublicGroupFeedTabStack.Screen  options={{
         tabBarLabel: ({focused, tintColor:color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      
            name='Feed' 
            component={PublicFeedHomeFeedStackNavigator}/>

<PublicGroupFeedTabStack.Screen  options={{
          tabBarLabel: ({focused, tintColor:color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      
      
      name='Notification' 
      component={NotificationScreen}/>

       
        </PublicGroupFeedTabStack.Navigator>
    
       
    );
  };



  const PublicFeedHomeFeedStack = createStackNavigator();
  const PublicFeedHomeFeedStackNavigator =()=>{
    
    return ( 
       <PublicFeedHomeFeedStack.Navigator  headerMode='screen' screenOptions={{  cardStyle: { backgroundColor: colors.cardStyleBackgroundColor},
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
    headerTitleStyle: {
     
      marginTop:-20
      
    },
        headerTintColor: colors.StackheaderTintColor,
        headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor,height:60 },
      }}>
        

<PublicFeedHomeFeedStack.Screen  
      options={{headerShown:false}} 
            name='Public Group FEED' 
            component={PublicGroupFeedScreen}/>  

</PublicFeedHomeFeedStack.Navigator>
     
    
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
  }
  });
  
  export default PublicGroupFeedStackNavigator;