import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator  } from '@react-navigation/stack';
import colors from '../constants/colors';
import { useNavigation,Header } from '@react-navigation/native';
import { StyleSheet,TouchableOpacity, View, Image } from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExplorePublicGroupScreen from '../screens/ExplorePublicGroupScreen';
import JoinedPublicGroupStackNavigator from '../stacks/JoinedPublicGroupStackNavigator';
import CreateaPublicGroupScreen from '../screens/CreateaPublicGroupScreen';



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

  const ExplorePublicGroupTabStack = createMaterialTopTabNavigator();

  const ExplorePublicGroupTabStackNavigator =()=>{
    
    return (
  
   
        <ExplorePublicGroupTabStack.Navigator   initialRouteName="Explore Public Groups"
        tabBarOptions={{
          activeTintColor: colors.TabactiveTintColor,
          inactiveTintColor: colors.TabinactiveTintColor,

          style: {
           // borderTopLeftRadius: colors.TabStyleborderTopLeftRadius,
           // borderTopRightRadius: colors.TabStyleTopRightRadius,
          //  borderTopColor: colors.TabStyleBorderTopColour,
          //  borderTopWidth: colors.TabStyleborderTopWidth,
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
          //  borderTopLeftRadius: colors.TabStyleborderTopLeftRadius,
          //  borderTopRightRadius: colors.TabStyleTopRightRadius,
          },
          
        }}>
         

          <ExplorePublicGroupTabStack.Screen options={{        
            tabBarLabel: 'Explore Public Groups' }} 
            name='Explore Public Groups' 
            component={ExplorePublicGroupStackNavigator}   />

<ExplorePublicGroupTabStack.Screen options={{        
            tabBarLabel: 'Joined Public Groups' }} 
            name='Joined Public Groups' 
            component={JoinedPublicGroupStackNavigator}   />        
        </ExplorePublicGroupTabStack.Navigator>

    
    );
  };


  const ExplorePublicGroupStack = createStackNavigator();
  const ExplorePublicGroupStackNavigator =()=>{
    
    return (
  
        <ExplorePublicGroupStack.Navigator  initialRouteName="ExplorePublicGroups">

          <ExplorePublicGroupStack.Screen 
          options={{headerShown:false}} 
            name='ExplorePublicGroups' 
            component={ExplorePublicGroupScreen}   />      

<ExplorePublicGroupStack.Screen 
 
options={{
  headerTitle: "Create a Public Group" }} 
  name='Create a Public Group' 
  component={CreateaPublicGroupScreen}/>

</ExplorePublicGroupStack.Navigator>

    
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
  
  export default ExplorePublicGroupTabStackNavigator;