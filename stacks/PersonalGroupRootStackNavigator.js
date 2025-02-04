import 'react-native-gesture-handler';
import * as React from 'react'
import { createStackNavigator  } from '@react-navigation/stack';
import colors from '../constants/colors';
import PersonalGroupsScreen from '../screens/PersonalGroupScreens/PersonalGroupsScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import CreateaPersonalGroup from '../screens/PersonalGroupScreens/CreateaPersonalGroup';
import PersonalGroupFeedScreen from '../screens/PersonalGroupScreens/PersonalGroupFeedScreen';
import YourPersonalGroupPostScreen from '../screens/PersonalGroupScreens/YourPersonalGroupPostScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CreateaNewPost from '../screens/Posts/CreateaNewPost';
import ViewMembers from '../components/ViewMembers';;
import PersonalGroupBio from '../screens/PersonalGroupScreens/PersonalGroupBio';
import Comments from '../components/Comment/Comments'
import Likes from '../components/Comment/Likes';
import AddMember from '../components/AddMember';
import CommentLikes from '../components/Comment/LikesComments';
import UpdatePersonalGroupAccountInfoScreen from '../screens/PersonalGroupScreens/UpdatePersonalGroupAccountInfoScreen';
import ReplyComments from '../components/Comment/ReplyComments';
import ReplyLikesComment from '../components/Comment/ReplyLikesComment';

const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image style={styles.ImageIconStyle}
          source={require('../Pictures/menu.png')} />
      </TouchableOpacity>
    </View>
  );
};

const PersonalGroupRootStack = createStackNavigator ();
const PersonalGroupRootStackNavigator = () => {

  return (
    <PersonalGroupRootStack.Navigator headerMode='float' screenOptions={{
      headerLeft: ({ }) => <HeaderLeft />, cardStyle: { backgroundColor: colors.cardStyleBackgroundColor },
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
          headerTitle: 'Personal Groups'
        }}
        name='PersonalGroupsScreen'
        component={withMyHook(PersonalGroupsScreen)} />



      <PersonalGroupRootStack.Screen
        options={{ headerShown: false }}
        name='PersonalGroupBio'
        component={PersonalGroupBioStackNavigator} />


      <PersonalGroupRootStack.Screen

        options={{ headerShown: false }}
        name='CreateaPersonalGroup'
        component={CreateaPersonalGroupStackNavigator} />

      <PersonalGroupRootStack.Screen
        options={{ headerShown: false }}
        name='PersonalGroupFeed'
        component={PersonalGroupFeedScreenkNavigator} />



    </PersonalGroupRootStack.Navigator>


  );
};


const PersonalGroupBioStack = createStackNavigator ();
const PersonalGroupBioStackNavigator = ({ route }) => {

  return (
    <PersonalGroupBioStack.Navigator headerMode='float' screenOptions={{
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


      <PersonalGroupBioStack.Screen
        options={{
          headerTitle: "About Group"
        }}
        name='CreateaPGroupBio'
        component={withMyHookBio(PersonalGroupBio, route.params)} />

      <PersonalGroupBioStack.Screen

        options={{

          headerTitle: "Group Members"
        }}
        name='ViewMembers'
        component={withMyHook(ViewMembers)} />

      <PersonalGroupBioStack.Screen

        options={{

          headerTitle: "Add Members"
        }}
        name='AddMembers'
        component={withMyHook(AddMember)}
      />


      <PersonalGroupBioStack.Screen

        options={{

          headerTitle: "Edit Group Information"
        }}
        name='UpdatePersonalGroupAccountInfoScreen'
        component={UpdatePersonalGroupAccountInfoScreen} />

    </PersonalGroupBioStack.Navigator>


  );
};


const CreateaPersonalGroupStack = createStackNavigator ();
const CreateaPersonalGroupStackNavigator = () => {

  return (
    <CreateaPersonalGroupStack.Navigator headerMode='float' screenOptions={{
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


      <CreateaPersonalGroupStack.Screen
        options={{
          headerTitle: 'Create a Personal Group'
        }}
        name='CreateaPGroup'
        component={CreateaPersonalGroup} />




    </CreateaPersonalGroupStack.Navigator>


  );
};


const PersonalGroupInsideGroupTabStack = createMaterialTopTabNavigator();
const PersonalGroupInsideGroupTabStackNavigator = ({ route }) => {

  let notification = true;
  return (


    <PersonalGroupInsideGroupTabStack.Navigator initialRouteName="Feed"
      activeColor="black"
      inactiveColor="Grey"
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
      <PersonalGroupInsideGroupTabStack.Screen options={{
        tabBarLabel: ({ focused, tintColor: color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}

        name='Feed'
        component={withMyHook(PersonalGroupFeedScreen)}
        initialParams={{ groupId: route.params.groupId }}
      />




      <PersonalGroupInsideGroupTabStack.Screen options={{
        tabBarLabel: 'Your Posts',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="local-post-office" color={color} size={26} />
        ),
      }}


        name='Your Posts'
        component={YourPersonalGroupPostScreen}
        initialParams={{ groupid: route.params.groupId }}
      />



      <PersonalGroupInsideGroupTabStack.Screen options={{
        tabBarLabel: ({ focused, tintColor: color }) => (
          focused ? <MaterialCommunityIcons name="bell" color={color} size={26} /> : <MaterialCommunityIcons name="bell-ring" color="black" size={26} />
        ),
      }}


        name='Notification'
        component={NotificationScreen}
        initialParams={{ groupid: route.params.groupId }}
      />

    </PersonalGroupInsideGroupTabStack.Navigator>


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

const PersonalGroupFeedScreenStack = createStackNavigator ();
const PersonalGroupFeedScreenkNavigator = ({ route }) => {
  const { GroupName } = route.params;

  let groupname = GroupName.length > 30 ? GroupName.toString().substring(0, 30) + ".." : GroupName;

  return (
    <PersonalGroupFeedScreenStack.Navigator headerMode="screen" screenOptions={{
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
      headerStyle: { backgroundColor: colors.StackheaderStyleBackgroundColor, height: 80 },
      headerTitleStyle: {
        fontSize: 18,

        width: colors.TabLabelStylewidth
      },
    }}>




      <PersonalGroupFeedScreenStack.Screen
        options={{
          headerTitle: groupname
        }}
        name='PersonalGroupFeed'
        component={PersonalGroupInsideGroupTabStackNavigator}
        initialParams={{ groupId: route.params }}
      />


      <PersonalGroupFeedScreenStack.Screen
        options={{
          headerTitle: "Comments"
        }}

        name='Comments'
        component={Comments} />

      <PersonalGroupFeedScreenStack.Screen
        options={{
          headerTitle: "Replying to "
        }}

        name='ReplyComments'
        component={ReplyComments} />


      <PersonalGroupFeedScreenStack.Screen
        options={{
          headerTitle: "Likes"
        }}

        name='CommentLikes'
        component={CommentLikes} />

      <PersonalGroupFeedScreenStack.Screen
        options={{
          headerTitle: "Likes"
        }}

        name='ReplyLikesComment'
        component={ReplyLikesComment} />


      <PersonalGroupFeedScreenStack.Screen
        options={{
          headerTitle: "Likes"
        }}

        name='Likes'
        component={Likes} />

      <PersonalGroupFeedScreenStack.Screen

        options={{

          headerTitle: "Group Members"
        }}
        name='ViewMembers'
        component={withMyHook(ViewMembers)} />


      <PersonalGroupFeedScreenStack.Screen

        options={{

          headerTitle: "Create a New Post"
        }}
        name='CreateaNewPost'
        component={withMyHookBio(CreateaNewPost, route.params)} />




      <PersonalGroupFeedScreenStack.Screen

        options={{

          headerTitle: "Add Members"
        }}
        name='AddMembers'
        component={withMyHook(AddMember)} />


    </PersonalGroupFeedScreenStack.Navigator>


  );
};
const HeaderLeftFeed = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.ImageHeader}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
        <Image style={styles.ImageIconStyleFeed}
          source={require('../Pictures/BackArrow.png')} />
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
  , ImageIconStyle: {

    padding: 10,
    margin: 5,
    height: 30,
    width: 50,
    resizeMode: 'stretch',

  },
  ImageIconStyleFeed: {
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

export default PersonalGroupRootStackNavigator;