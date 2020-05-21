import 'react-native-gesture-handler';
import * as React from 'react'
import {createStackNavigator  } from '@react-navigation/stack';
import colors from '../constants/colors';
import ProfessionalGroupsScreen from '../screens/ProfessionalGroupScreens/ProfessionalGroupsScreen';
import { createMaterialBottomTabNavigator   } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet,TouchableOpacity, Text, View,  Image } from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import CreateaProfessionalGroup from '../screens/ProfessionalGroupScreens/CreateaProfessionalGroup';
import ProfessionalGroupFeedScreen from '../screens/ProfessionalGroupScreens/ProfessionalGroupFeedScreen';
import YourProfessionalGroupPostScreen from '../screens/ProfessionalGroupScreens/YourProfessionalGroupPostScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import CreateaNewPost from '../screens/Posts/CreateaNewPost';

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

const ProfessionalGroupRootStack = createStackNavigator();
  const ProfessionalGroupRootStackNavigator =()=>{
    
    return ( 
       <ProfessionalGroupRootStack.Navigator  headerMode='float' screenOptions={{ headerLeft: ({}) => <HeaderLeft/>,  cardStyle: { backgroundColor: colors.cardStyleBackgroundColor},
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
        

<ProfessionalGroupRootStack.Screen  
     options={{        
      headerTitle: 'Professional Groups' }} 
            name='ProfessionalGroupsScreen' 
            component={withMyHook(ProfessionalGroupsScreen)}/>

<ProfessionalGroupRootStack.Screen  
         
         options={{headerShown:false}} 
               name='CreateaProfessionalGroup' 
               component={CreateaProfessionalGroup}   />  

<ProfessionalGroupRootStack.Screen  
         options={{headerShown:false}} 
               name='ProfessionalGroupFeed' 
               component={ProfessionalGroupFeedScreenkNavigator}   />  

     

</ProfessionalGroupRootStack.Navigator>
     
    
    );
  };




  const ProfessionalGroupInsideGroupTabStack = createMaterialTopTabNavigator();
  const ProfessionalGroupInsideGroupTabStackNavigator =(props)=>{
    
    
    return (
  
     
        <ProfessionalGroupInsideGroupTabStack.Navigator   initialRouteName="Feed" 
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
        <ProfessionalGroupInsideGroupTabStack.Screen   options={{
          tabBarLabel: ({focused, tintColor:color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }}
      
            name='Feed' 
            component={withMyHook(ProfessionalGroupFeedScreen)}/>




<ProfessionalGroupInsideGroupTabStack.Screen  options={{
          tabBarLabel: 'Your Posts',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="local-post-office" color={color} size={26} />
          ),
          labelStyle:{fontWeight:"bold"}
        }}
      
      
      name='Your Posts' 
      component={YourProfessionalGroupPostScreen}/>



<ProfessionalGroupInsideGroupTabStack.Screen  options={{
           tabBarLabel: ({focused, tintColor:color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      
      
      name='Notification' 
      component={NotificationScreen}/>
  
        </ProfessionalGroupInsideGroupTabStack.Navigator>
    
      
    );
  };



  function withMyHook(Component) {
    return function WrappedComponent(props) {
      const myHookValue = useNavigation();
      return <Component {...props} myHookValue={myHookValue} />;
    }
  }

  const ProfessionalGroupFeedScreenStack = createStackNavigator();
  const ProfessionalGroupFeedScreenkNavigator =()=>{
    
    return ( 
       <ProfessionalGroupFeedScreenStack.Navigator  headerMode='float' screenOptions={{ headerLeft: ({}) => <HeaderLeftFeed/>,  cardStyle: { backgroundColor: colors.cardStyleBackgroundColor},
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
        



<ProfessionalGroupFeedScreenStack.Screen  
         options={{        
          headerTitle: 'Professional Groups Feed' }} 
               name='ProfessionalGroupFeed' 
               component={ProfessionalGroupInsideGroupTabStackNavigator}   />  

<ProfessionalGroupFeedScreenStack.Screen 
 
 options={{
   
   headerTitle: "Create a New Post" }} 
   name='CreateaNewPost' 
   component={CreateaNewPost}/>

</ProfessionalGroupFeedScreenStack.Navigator>
     
    
    );
  };
  const HeaderLeftFeed = () => {
    const navigation = useNavigation();
    return (
      <View style={styles.ImageHeader}>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.goBack()}>
        <Image   style={styles.ImageIconStyleFeed} 
         source={require('../Pictures/BackArrow.png')}/>
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
  ImageIconStyleFeed:{
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
  
  export default ProfessionalGroupRootStackNavigator;