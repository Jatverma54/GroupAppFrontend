import 'react-native-gesture-handler';
import * as React from 'react'
import {createStackNavigator  } from '@react-navigation/stack';
import colors from '../constants/colors';
import PersonalGroupsScreen from '../screens/PersonalGroupsScreen';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet,TouchableOpacity,  View,  Image } from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import CreateaPersonalGroup from '../screens/CreateaPersonalGroup';
import PersonalGroupInsideGroup from '../screens/PersonalGroupInsideGroup';

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
            component={PersonalGroupsScreen}/>

<PersonalGroupRootStack.Screen  
         
         options={{headerShown:false}} 
               name='CreateaPersonalGroup' 
               component={CreateaPersonalGroup}   />  

<PersonalGroupRootStack.Screen  
         
      options={{headerShown:false}} 
            name='PersonalGroupInsideGroup' 
            component={PersonalGroupInsideGroup}   />          

</PersonalGroupRootStack.Navigator>
     
    
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
  
  export default PersonalGroupRootStackNavigator;