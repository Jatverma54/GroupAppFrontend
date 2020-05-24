import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator  } from '@react-navigation/stack';
import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet,TouchableOpacity, View,  Image } from 'react-native';
import {DrawerActions} from '@react-navigation/native';

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
  
  export default NotificatioStackNavigator;