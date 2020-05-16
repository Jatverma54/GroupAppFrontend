import 'react-native-gesture-handler';
import React ,{ useState } from 'react';
import {createStackNavigator  } from '@react-navigation/stack';
import colors from '../constants/colors';
import PersonalGroupsScreen from '../screens/PersonalGroupsScreen';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet,TouchableOpacity, Text,Left,StatusBar ,View, ImageBackground, Image, Button, Modal } from 'react-native';
import {NavigationContainer,DrawerActions} from '@react-navigation/native';
import JoinedPublicGroupsScreen from '../screens/JoinedPublicGroupsScreen';
import JoinedGroupInsideGroupFeed from '../screens/JoinedGroupInsideGroup';
import { Appbar, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FeedDetails from '../components/FeedDetails';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import NotificationScreen from '../screens/NotificationScreen';
import BackArrow from '../Pictures/BackArrow.png';




  const JoinedPublicGroupStack = createStackNavigator();
  const JoinedPublicGroupStackNavigator =(props)=>{
    const navigation = useNavigation();
    return (
  
    
        <JoinedPublicGroupStack.Navigator   >
         

        <JoinedPublicGroupStack.Screen 
         options={{headerShown:false}} 
            name='JoinedPublicGroupsScreen' 
            component={withMyHook(JoinedPublicGroupsScreen)}/>

        <JoinedPublicGroupStack.Screen 
         options={{headerShown:false}} 
            name='JoinedGroupInsideGroup' 
            component={HomeFeedStackNavigator}   />
       
        </JoinedPublicGroupStack.Navigator>
    
    
    );
  };

  function withMyHook(Component) {
    return function WrappedComponent(props) {
      const myHookValue = useNavigation();
      return <Component {...props} myHookValue={myHookValue} />;
    }
  }



 

  const JoinedGroupInsideGroupTabStack = createMaterialBottomTabNavigator();
  const JoinedGroupInsideGroupTabStackNavigator =(props)=>{
    
    
    return (
  
     
        <JoinedGroupInsideGroupTabStack.Navigator   initialRouteName="Feed" 
      activeColor="black"
     // inactiveColor="#3e2465"
     barStyle={{ backgroundColor: colors.StackheaderStyleBackgroundColor }}
      
      
    >        
        <JoinedGroupInsideGroupTabStack.Screen  options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      
            name='Feed' 
            component={withMyHook(JoinedGroupInsideGroupFeed)}/>

<JoinedGroupInsideGroupTabStack.Screen  options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      
      
      name='Notification' 
      component={NotificationScreen}/>

       
        </JoinedGroupInsideGroupTabStack.Navigator>
    
      
    );
  };
  


  const HomeFeedStack = createStackNavigator();
  const HomeFeedStackNavigator =()=>{
    
   

      const [modalVisible, setModalVisible] = useState(true);
    return (
  
      <Modal   animationType="slide" 
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}     
      >
       <HomeFeedStack.Navigator  headerMode='float' screenOptions={{ headerLeft:()=>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>setModalVisible(false)}>
       <View style={styles.ImageHeader}>
        
        <Image   style={styles.ImageIconStyle} 
         source={BackArrow}/>
        
      </View>
      </TouchableOpacity>
       , cardStyle: { backgroundColor: colors.cardStyleBackgroundColor},
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
      fontWeight: 'bold',
      marginTop:-20
      
    },
        headerTintColor: colors.StackheaderTintColor,
        headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor,height:60 },
      }}>
        

<HomeFeedStack.Screen  
     options={{        
      headerTitle: 'Group Feed' }} 
     
            name='Group FEED' 
            component={JoinedGroupInsideGroupTabStackNavigator}/>  

</HomeFeedStack.Navigator>
</Modal>
    
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
  }
  });
  
  export default JoinedPublicGroupStackNavigator;