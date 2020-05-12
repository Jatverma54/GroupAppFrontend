import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator  } from '@react-navigation/stack';
import {DrawerActions,useNavigation} from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet,TouchableOpacity,  View, Image, Modal,  } from 'react-native';
import MainScreenPage from '../screens/MainScreenPage';
import LoginScreen from '../screens/LoginScreen';
import colors from '../constants/colors';
import PersonalGroupRootStackNavigator from '../stacks/PersonalGroupRootStackNavigator';
import PublicGroupStackNavigator from '../stacks/PublicGroupStackNavigator';
import NotificatioStackNavigator from '../stacks/NotificatioStackNavigator';
import PublicGroupFeedStackNavigator from '../stacks/PublicGroupFeedStackNavigator';
import DrawerContent from '../screens/DrawerContent';





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
      name='DrawerScreen' 
      component={DrawerScreen}/>

</RootMainStack.Navigator>

);

};




  const DrawerStack = createDrawerNavigator();
  const DrawerScreen = () => {
    return(

   
    <DrawerStack.Navigator    
      
 
      drawerContent={() => <DrawerContent  drawerContentOptions={{ 
        activeTintColor: colors.drawerHiglightcolor, marginTop:20,
        labelStyle:{color:colors.drawerTextcolor,fontWeight: colors.drawerfontWeight,width:colors.drawerwidth, fontSize: colors.drawerfontSize,
        }
      }}   
      drawerStyle={{
        backgroundColor: colors.drawerBackgroundcolor,
        width: 240,
        
        fontFamily: 'SomeFont',
      }}
      initialRouteName="Public Groups"
     />}
     
      >   
    <DrawerStack.Screen  name="Public Groups" component={PublicGroupStackNavigator} />
     <DrawerStack.Screen name="Public Groups Feed" component={PublicGroupFeedStackNavigator}/>
     <DrawerStack.Screen name="Personal Groups" component={PersonalGroupRootStackNavigator}/>
     <DrawerStack.Screen name="Profile" component={NotificatioStackNavigator}/>
       
    </DrawerStack.Navigator>
   
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