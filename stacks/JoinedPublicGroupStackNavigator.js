import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { createStackNavigator  } from '@react-navigation/stack';
import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, Text, View, Image, } from 'react-native';
import JoinedPublicGroupsScreen from '../screens/JoinPublicGroupScreen/JoinedPublicGroupsScreen';
import JoinedGroupInsideGroupFeed from '../screens/JoinPublicGroupScreen/JoinedGroupInsideGroup';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NotificationScreen from '../screens/NotificationScreen';
import BackArrow from '../Pictures/BackArrow.png';
import YourPublicGroupPostscreen from '../screens/JoinPublicGroupScreen/YourPublicGroupPostscreen';
import CreateaNewPost from '../screens/Posts/CreateaNewPost';
import JoinedPublicGroupBio from '../screens/JoinPublicGroupScreen/JoinedPublicGroupBio';
import ViewMembers from '../components/ViewMembers';
import AddMember from '../components/AddMember';
import Comments from '../components/Comment/Comments';
import Likes from '../components/Comment/Likes';
import CommentLikes from '../components/Comment/LikesComments';
import UpdatePublicGroupAccountInfoScreen from '../screens/JoinPublicGroupScreen/UpdatePublicGroupAccountInfoScreen';
import ReplyComments from '../components/Comment/ReplyComments';
import JoinPublicGroupRequestScreen from '../screens/JoinPublicGroupScreen/JoinPublicGroupRequestScreen';
import ReplyLikesComment from '../components/Comment/ReplyLikesComment';

const JoinedPublicGroupStack = createStackNavigator ();
const JoinedPublicGroupStackNavigator = (props) => {
  const navigation = useNavigation();
  return (


    <JoinedPublicGroupStack.Navigator   >


      <JoinedPublicGroupStack.Screen
        options={{ headerShown: false }}
        name='JoinedPublicGroupsScreen'
        component={withMyHook(JoinedPublicGroupsScreen)} />




    </JoinedPublicGroupStack.Navigator>


  );
};



const JoinedGroupBioStack = createStackNavigator ();
export const JoinedGroupBioStackNavigator = ({ route }) => {

  return (
    <JoinedGroupBioStack.Navigator headerMode='float' screenOptions={{
      headerLeft: ({ }) => <HeaderLeftFeed />, cardStyle: { backgroundColor: colors.cardStyleBackgroundColor },
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


      <JoinedGroupBioStack.Screen
        options={{
          headerTitle: "About Group"
        }}
        name='JoinedPGroupBio'
        component={withMyHookBio(JoinedPublicGroupBio, route.params)} />

      <JoinedGroupBioStack.Screen

        options={{

          headerTitle: "Group Members"
        }}
        name='ViewMembers'
        component={withMyHook(ViewMembers)} />

      <JoinedGroupBioStack.Screen

        options={{

          headerTitle: "Add Members"
        }}
        name='AddMembers'
        component={withMyHook(AddMember)} />


      <JoinedGroupBioStack.Screen

        options={{

          headerTitle: "Edit Group Information"
        }}
        name='UpdatePublicGroupAccountInfoScreen'
        component={UpdatePublicGroupAccountInfoScreen} />



    </JoinedGroupBioStack.Navigator>


  );
};



function withMyHookBio(Component, name) {
  return function WrappedComponent(props) {
    const myHookValue = useNavigation();
    return <Component {...props} GroupName={name} myHookValue={myHookValue} />;
  }
}



function withMyHook(Component) {
  return function WrappedComponent(props) {
    const myHookValue = useNavigation();
    return <Component {...props} myHookValue={myHookValue} />;
  }
}



const JoinedGroupInsideGroupTabStack = createMaterialTopTabNavigator();
const JoinedGroupInsideGroupTabStackNavigator = ({ route }) => {



  const [notification, setnotification] = useState(true)

  return (


    <JoinedGroupInsideGroupTabStack.Navigator initialRouteName="Feed"
      activeTintColor="black"
      inactiveTintColor="Grey"

      barStyle={{ backgroundColor: 'white' }}



      tabBarOptions={{

        indicatorStyle: {
          backgroundColor: colors.StackheaderStyleBackgroundColor
        },

        labelStyle: {
          fontSize: colors.TabLabelStylefontSize,
          fontWeight: colors.TabLabelStylefontWeight,
          width: colors.TabLabelStylewidth
        },

      }}

    >
      <JoinedGroupInsideGroupTabStack.Screen options={{
        tabBarLabel: ({ focused, tintColor: color }) => (
          <MaterialCommunityIcons name="home" color="black" size={26} />
        ),
      }}

        name='Feed'
        component={JoinedGroupInsideGroupFeed}
        initialParams={{ groupId: route.params.groupId }}
      />




      <JoinedGroupInsideGroupTabStack.Screen options={{
        tabBarLabel: 'Your Posts',
        tabBarIcon: ({ color }) => (

          <MaterialIcons name="local-post-office" color={color} size={26} />

        ),
        labelStyle: { fontWeight: "bold" }
      }}


        name='Your Posts'
        component={YourPublicGroupPostscreen}
        initialParams={{ groupid: route.params.groupId }}
      />

      <JoinedGroupInsideGroupTabStack.Screen options={({ navigation }) => ({
        tabBarLabel: ({ focused, tintColor: color }) => {
          return focused ?
            <MaterialCommunityIcons name="bell" color="black" size={26} /> :
            <MaterialCommunityIcons name="bell-ring" color="black" size={26} />
        },
      })}
        name='Notification'
        component={NotificationGroupTabStackNavigator}
        initialParams={{ groupid: route.params.groupId }}
      />
    </JoinedGroupInsideGroupTabStack.Navigator>


  );
};





const NotificationGroupTabStack = createMaterialTopTabNavigator();
const NotificationGroupTabStackNavigator = ({ route }) => {


  return (


    <NotificationGroupTabStack.Navigator initialRouteName="GroupRequests"
      activeTintColor="black"
      inactiveTintColor="Grey"
      barStyle={{ backgroundColor: 'white' }}



      tabBarOptions={{

        indicatorStyle: {
          backgroundColor: colors.StackheaderStyleBackgroundColor
        },

        labelStyle: {
          fontSize: colors.TabLabelStylefontSize,
          fontWeight: colors.TabLabelStylefontWeight,
          width: colors.TabLabelStylewidth
        },

      }}

    >
      <NotificationGroupTabStack.Screen options={{
        tabBarLabel: 'Group Requests'
      }}

        name='GroupRequests'
        component={withMyHook(JoinPublicGroupRequestScreen)}
        initialParams={{ groupid: route.params.groupid }}
      />



      <NotificationGroupTabStack.Screen options={{
        tabBarLabel: 'Notifications'
      }}


        name='Notification'
        component={NotificationScreen}
        initialParams={{ groupid: route.params.groupid }}
      />


    </NotificationGroupTabStack.Navigator>


  );
};


const HomeFeedStack = createStackNavigator ();
export const HomeFeedStackNavigator = ({ route }) => {

  const { GroupName } = route.params;


  let groupname = GroupName.length > 30 ? GroupName.toString().substring(0, 30) + ".." : GroupName;

  return (


    <HomeFeedStack.Navigator headerMode='screen' screenOptions={{
      headerLeft: () =>
        <HeaderLeftFeed />
      ,

      cardStyle: { backgroundColor: colors.cardStyleBackgroundColor },

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
      headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor, height: 80 },
      headerTitleStyle: {
        fontSize: 18,
        width: colors.TabLabelStylewidth
      },


    }}

    >


      <HomeFeedStack.Screen
        options={{
          headerTitle: groupname
        }}

        name='Group FEED'
        component={JoinedGroupInsideGroupTabStackNavigator}

        initialParams={{ groupId: route.params }}
      />

      <HomeFeedStack.Screen
        options={{
          headerTitle: "Comments"
        }}

        name='Comments'
        component={Comments} />



      <HomeFeedStack.Screen
        options={{
          headerTitle: "Replying to "
        }}

        name='ReplyComments'
        component={ReplyComments} />

      <HomeFeedStack.Screen
        options={{
          headerTitle: "Likes"
        }}

        name='CommentLikes'
        component={CommentLikes} />

      <HomeFeedStack.Screen
        options={{
          headerTitle: "Likes"
        }}

        name='ReplyLikesComment'
        component={ReplyLikesComment} />

      <HomeFeedStack.Screen
        options={{
          headerTitle: "Likes"
        }}

        name='Likes'
        component={Likes} />

      <HomeFeedStack.Screen

        options={{

          headerTitle: "Create a New Post"
        }}
        name='CreateaNewPost'
        component={withMyHookBio(CreateaNewPost, route.params)} />

      <HomeFeedStack.Screen

        options={{

          headerTitle: "Add Members"
        }}
        name='AddMembers'
        component={withMyHook(AddMember)} />

    </HomeFeedStack.Navigator>
  );
};


function withMyHookJoined(Component, name) {
  return function WrappedComponent(props) {

    return <Component {...props} route={name} />;
  }
}


const HeaderLeftFeed = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.ImageHeader}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
        <Image style={styles.ImageIconStyle}
          source={BackArrow} />

      </TouchableOpacity>
    </View>
  );
};


const HeaderRightFeed = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.ImageHeaderRight}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
        <Image style={styles.ImageIconStyleFeedRight}
          source={require('../Pictures/Post_Add.png')} />
        <Text>Add Post</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({

  DrawerText: {

    backgroundColor: colors.rootscreenColor,
  }
  ,
  ImageIconStyle: {

    padding: 10,
    margin: 5,
    height: 30,
    width: 50,
    resizeMode: 'stretch',

  },
  ImageHeader: {
    padding: 5,
    marginLeft: 7,
    justifyContent: 'flex-end'
  },
  ImageIconStyleFeedRight: {
    marginTop: 10,
    marginLeft: 10,
    height: 30,
    width: 34,

    resizeMode: 'stretch',
  },
  ImageHeaderRight: {

    marginRight: 7,
    justifyContent: 'flex-end'
  }
});

export default JoinedPublicGroupStackNavigator;
