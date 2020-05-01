import React from 'react';
import {createStackNavigator  } from '@react-navigation/stack';
import {NavigationContainer,DrawerActions} from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet,TouchableOpacity, Text,Left,StatusBar ,View, ImageBackground, Image, Button } from 'react-native';
import MainScreenPage from '../screens/MainScreenPage';
import { useNavigation } from '@react-navigation/native';
import ExplorePublicGroupScreen from '../screens/ExplorePublicGroupScreen';
import JoinedPublicGroupsScreen from '../screens/JoinedPublicGroupsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import PersonalGroupsScreen from '../screens/PersonalGroupsScreen';
import LoginScreen from '../screens/LoginScreen';
import colors from '../constants/colors';
import PublicGroupFeedScreen from '../screens/PublicGroupFeedScreen';



const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}>
      <Image   style={styles.ImageIconStyle} 
       source={require('../Pictures/menu.png')}/>
       </TouchableOpacity>
    </View>
  );
};




const RootMainStack = createStackNavigator();
const RootMainStackNavigator=()=>{
return( 

<RootMainStack.Navigator>    

    <RootMainStack.Screen  
   name='MainScreenPage'
   component={MainScreenPage}           
  options={{headerShown:false}}/>


<RootMainStack.Screen  
 options={{headerShown:false}}
      name='LoginScreen' 
      component={LoginScreen}/>



<RootMainStack.Screen  

 options={{headerShown:false}}
      name='ExplorePublicGroupScreen' 
      component={DrawerScreen}/>

</RootMainStack.Navigator>

);

};



 const PersonalGroupRootStack = createStackNavigator();
  const PersonalGroupRootStackNavigator =()=>{
    
    return (
  

        <PersonalGroupRootStack.Navigator  headerMode='float' screenOptions={{ headerLeft: ({}) => <HeaderLeft/>,  cardStyle: { backgroundColor: colors.cardStyleBackgroundColor},
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
        

<PersonalGroupRootStack.Screen  
     options={{        
      headerTitle: 'Personal Groups' }} 
            name='PersonalGroupsScreen' 
            component={PersonalGroupsScreen}   />

</PersonalGroupRootStack.Navigator>
     
    
    );
  };

  

  const ExplorePublicGroupTabStack = createBottomTabNavigator();

  const ExplorePublicGroupTabStackNavigator =()=>{
    
    return (
  
   
        <ExplorePublicGroupTabStack.Navigator   initialRouteName="Explore Public Groups"
        tabBarOptions={{
          activeTintColor: colors.TabactiveTintColor,
          inactiveTintColor: colors.TabinactiveTintColor,

          style: {
            borderTopLeftRadius: colors.TabStyleborderTopLeftRadius,
            borderTopRightRadius: colors.TabStyleTopRightRadius,
            borderTopColor: colors.TabStyleBorderTopColour,
            borderTopWidth: colors.TabStyleborderTopWidth,
            width: colors.TabStylewidth,
            backgroundColor: colors.TabStylebackgroundColor,
            shadowColor: colors.TabStyleShadowColor,
            shadowOffset: {
              width: colors.TabStyleShadowoffsetwidth,
              height: colors.TabStyleShadowoffsetHeight
            },
            shadowRadius: colors.TabshadowRadius,
            elevation:colors.Tabelevation,
            shadowOpacity: colors.TabshadowOpacity,
            height:colors.Tabheight
          },

          labelStyle: {
            fontSize: colors.TabLabelStylefontSize,
            fontWeight: colors.TabLabelStylefontWeight,
           width:colors.TabLabelStylewidth
          },


          tabStyle: {
            alignItems: colors.TabTabStylealignItems,
            justifyContent: colors.TabTabStylejustifyContent,
            
            paddingVertical: colors.TabTabStylepaddingVertical,
            backgroundColor: colors.TabTabStylebackgroundColor,
            borderTopLeftRadius: colors.TabStyleborderTopLeftRadius,
            borderTopRightRadius: colors.TabStyleTopRightRadius,
          },
        }}>
         

          <ExplorePublicGroupTabStack.Screen options={{        
            headerTitle: 'Explore Public Groups' }} 
            name='Explore Public Groups' 
            component={ExplorePublicGroupStackNavigator}   />

<ExplorePublicGroupTabStack.Screen options={{        
            headerTitle: 'Joined Public Groups' }} 
            name='Joined Public Groups' 
            component={JoinedPublicGroupStackNavigator}   />
         
         
        </ExplorePublicGroupTabStack.Navigator>

    
    );
  };






  const ExplorePublicGroupStack = createStackNavigator();
  const ExplorePublicGroupStackNavigator =()=>{
    
    return (
  
   
        <ExplorePublicGroupStack.Navigator headerMode='float' screenOptions={{ headerLeft: ({}) => <HeaderLeft/>,  cardStyle: { backgroundColor: colors.cardStyleBackgroundColor },
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

          <ExplorePublicGroupStack.Screen options={{        
            headerTitle: 'Explore Public Groups' }} 
            name='ExplorePublicGroupScreen' 
            component={ExplorePublicGroupScreen}   />
         
        </ExplorePublicGroupStack.Navigator>

    
    );
  };


  const JoinedPublicGroupStack = createStackNavigator();
  const JoinedPublicGroupStackNavigator =()=>{
    
    return (
  
    
        <JoinedPublicGroupStack.Navigator headerMode='float' screenOptions={{ headerLeft: ({}) => <HeaderLeft/>,  cardStyle: { backgroundColor: colors.cardStyleBackgroundColor },
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
         

        <JoinedPublicGroupStack.Screen options={{        
            headerTitle: 'Joined Public Groups' }} 
            name='JoinedPublicGroupsScreen' 
            component={JoinedPublicGroupsScreen}   />


         
        </JoinedPublicGroupStack.Navigator>
    
    
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
            component={PublicGroupFeedScreen}   />


         
        </PublicGroupFeedStack.Navigator>
    
    
    );
  };






  const NotificatioStack = createStackNavigator();
  const NotificatioStackNavigator =()=>{
    
    return (
  
      
        <NotificatioStack.Navigator  headerMode='float' screenOptions={{ headerLeft: ({}) => <HeaderLeft/>,  cardStyle: { backgroundColor: colors.cardStyleBackgroundColor },
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
          

<NotificatioStack.Screen  
options={{        
  headerTitle: 'Notifications' }} 
            name='NotificationsScreen' 
            component={NotificationScreen}   />
         
        </NotificatioStack.Navigator>
     
    
    );
  };

  const Drawer = createDrawerNavigator();
  const DrawerScreen = () => {
    return(

     
    <Drawer.Navigator   drawerStyle={{
        backgroundColor: colors.drawerBackgroundcolor,
        width: 240,
        
        fontFamily: 'SomeFont',
      }} 
      

      drawerContentOptions={{ 
        activeTintColor: colors.drawerHiglightcolor, marginTop:20,
        labelStyle:{color:colors.drawerTextcolor,fontWeight: colors.drawerfontWeight,width:colors.drawerwidth, fontSize: colors.drawerfontSize,
        }
      }}
      
      initialRouteName="Explore Public Group"
      >   
    <Drawer.Screen  name="Explore Public Groups" component={ExplorePublicGroupTabStackNavigator} />
     <Drawer.Screen name="Public Groups Feed" component={PublicGroupFeedStackNavigator}/>
     <Drawer.Screen name="Personal Groups" component={PersonalGroupRootStackNavigator}/>
     <Drawer.Screen name="Notifications" component={NotificatioStackNavigator}/>
       
    </Drawer.Navigator>
   
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
  

  export default RootMainStackNavigator;