import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator  } from '@react-navigation/stack';
import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet,TouchableOpacity, View,  Image } from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import ExplorePublicGroupTabStackNavigator from '../stacks/ExplorePublicGroupStackNavigator';
import SearchFunctionality from '../components/Search';
import SearchIcon from '../Pictures/SearchIcon.png';
import {HomeFeedStackNavigator} from '../stacks/JoinedPublicGroupStackNavigator';
import PublicGroupBio from '../screens/PublicGroupScreens/PublicGroupBio';
import {JoinedGroupBioStackNavigator} from '../stacks/JoinedPublicGroupStackNavigator';
import ViewMembers from '../screens/PublicGroupScreens/ViewMembersPublicGroup';
import AddMember from '../components/AddMember';

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

const Search=()=>{
  const navigation = useNavigation();
  return(
   
<View style={{flexDirection: 'row'}}>

<TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.push("Search Public Group")}>
<Image style={styles.SearchIconStyle}  source={SearchIcon}/>


</TouchableOpacity>


</View>


  );

}

  const PublicGroupStack = createStackNavigator();
  const PublicGroupStackNavigator =()=>{
   
    return (
      
     
     
        <PublicGroupStack.Navigator headerMode='float'   screenOptions={{ headerRight:({})=><Search/>, headerLeft: ({}) => <HeaderLeft/> , cardStyle: { backgroundColor: colors.cardStyleBackgroundColor },
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
          }} >

          <PublicGroupStack.Screen options={{        
            headerTitle: 'Public Groups' }} 
            name='Public Group' 
            component={ExplorePublicGroupTabStackNavigator}   />

 <PublicGroupStack.Screen options={{        
            headerTitle: 'Search Groups' }} 
            name='Search Public Group' 
            component={SearchFunctionality}   />

<PublicGroupStack.Screen   
           options={{headerShown:false}} 
           name='JoinedGroupInsideGroup' 
           component={HomeFeedStackNavigator}   />



<PublicGroupStack.Screen   
           options={{headerShown:false}} 
           name='PublicGroupBio' 
           component={PublicGroupBioStackNavigator}   />

           
<PublicGroupStack.Screen 
         options={{headerShown:false}} 
            name='JoinedPublicGroupBio' 
            component={JoinedGroupBioStackNavigator}/>
         
        </PublicGroupStack.Navigator>

       
    );
  };

  
  const PublicGroupBioStack = createStackNavigator();
   const PublicGroupBioStackNavigator =({route})=>{
    const { GroupName } = route.params;
     let name=GroupName;
    return (
  
    
       <PublicGroupBioStack.Navigator  headerMode='screen' screenOptions={{ headerLeft:({})=><HeaderLeftBio/>,
       
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
    
        headerTintColor: colors.StackheaderTintColor,
        headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor,height:85 },
      }}>
        

<PublicGroupBioStack.Screen  

     options={{        
      headerTitle: "About Group" }} 
     
            name='PublicGroupBio' 
            component={withMyHook(PublicGroupBio,route.params)}/>  

<PublicGroupBioStack.Screen 
 
 options={{
   
   headerTitle: "Group Members" }} 
   name='ViewMembers' 
   component={withMyHook(ViewMembers)}/>
   
<PublicGroupBioStack.Screen 
 
 options={{
   
   headerTitle: "Invite Members" }} 
   name='AddMembers' 
   component={withMyHook(AddMember)}/>

</PublicGroupBioStack.Navigator>


    );
  };

  function withMyHook(Component,name) {
    return function WrappedComponent(props) {
      const myHookValue = useNavigation();
    
      return <Component {...props} GroupName={name} myHookValue={myHookValue} />;
    }
  }

  const HeaderLeftBio = () => {
    const navigation = useNavigation();
    return (
      <View style={styles.ImageHeaderBio}>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.goBack()}>
        <Image   style={styles.ImageIconStyleBio} 
         source={require('../Pictures/BackArrow.png')}/>
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
  SearchIconStyle:{
   marginRight:20
  },

  ImageIconStyleBio:{
    padding: 10,
    margin: 5,
    height: 30,
    width: 50,
    resizeMode : 'stretch',
  },
  ImageHeaderBio:{
    padding: 5,
    marginLeft:7,
      justifyContent:'flex-end'
  },
  });
  
  export default PublicGroupStackNavigator;