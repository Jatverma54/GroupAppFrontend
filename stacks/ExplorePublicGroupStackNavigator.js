import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../constants/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExplorePublicGroupScreen from '../screens/ExplorePublicGroupScreens/ExplorePublicGroupScreen';
import JoinedPublicGroupStackNavigator from '../stacks/JoinedPublicGroupStackNavigator';
import CreateaPublicGroupScreen from '../screens/PublicGroupScreens/CreateaPublicGroupScreen';
import PublicGroupListScreen from '../screens/PublicGroupScreens/PublicGroupListScreen';
import BackArrow from '../Pictures/BackArrow.png';


const ExplorePublicGroupTabStack = createMaterialTopTabNavigator();

const ExplorePublicGroupTabStackNavigator = () => {


  return (

    <ExplorePublicGroupTabStack.Navigator initialRouteName="Explore Public Groups"
      tabBarOptions={{
        activeTintColor: colors.TabactiveTintColor,
        inactiveTintColor: colors.TabinactiveTintColor,

        style: {
          width: colors.TabStylewidth,
          backgroundColor: colors.TabStylebackgroundColor,
          shadowColor: colors.TabStyleShadowColor,
          shadowOffset: {
            width: colors.TabStyleShadowoffsetwidth,
            height: colors.TabStyleShadowoffsetHeight
          },
          shadowRadius: colors.TabshadowRadius,
          elevation: colors.Tabelevation,
          shadowOpacity: colors.TabshadowOpacity,
          height: colors.Tabheight
        },

        labelStyle: {
          fontSize: colors.TabLabelStylefontSize,
          fontWeight: colors.TabLabelStylefontWeight,
          width: colors.TabLabelStylewidth,

        },


        tabStyle: {
          alignItems: colors.TabTabStylealignItems,
          justifyContent: colors.TabTabStylejustifyContent,

          paddingVertical: colors.TabTabStylepaddingVertical,
          backgroundColor: colors.TabTabStylebackgroundColor,

        },

      }}>


      <ExplorePublicGroupTabStack.Screen options={{
        tabBarLabel: 'Explore Public Groups'
      }}
        name='Explore Public Groups'
        component={ExplorePublicGroupStackNavigator} />

      <ExplorePublicGroupTabStack.Screen options={{
        tabBarLabel: 'Joined Public Groups'
      }}
        name='Joined Public Groups'
        component={JoinedPublicGroupStackNavigator} />
    </ExplorePublicGroupTabStack.Navigator>


  );
};


const ExplorePublicGroupStack = createStackNavigator();
const ExplorePublicGroupStackNavigator = () => {


  return (

    <ExplorePublicGroupStack.Navigator initialRouteName="ExplorePublicGroups"  >

      <ExplorePublicGroupStack.Screen
        options={{ headerShown: false }}
        name='ExplorePublicGroups'
        component={withMyHook(ExplorePublicGroupScreen)} />

      <ExplorePublicGroupStack.Screen

        options={{ headerShown: false }}
        name='ExplorePublicGroupCategoryBased'
        component={ExplorePublicGroupCategoryBasedStackNavigator} />

    </ExplorePublicGroupStack.Navigator>


  );
};

const ExplorePublicGroupCategoryBasedStack = createStackNavigator();
const ExplorePublicGroupCategoryBasedStackNavigator = ({ route }) => {
  const { title } = route.params;
  var SearchTitle = ''
  if (route.params.GroupCategory != undefined) {
    SearchTitle = route.params.GroupCategory;
  }

  return (

    <ExplorePublicGroupCategoryBasedStack.Navigator headerMode="screen" screenOptions={{
      cardStyle: { backgroundColor: colors.cardStyleCreatePublicGroupBackgroundColor },
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

        marginTop: -30
      },
      headerTintColor: colors.StackheaderTintColor,
      headerStyle: { backgroundColor: colors.StackheaderCreatePublicStyleBackgroundColor, height: 60 },

    }} >
      <ExplorePublicGroupCategoryBasedStack.Screen

        options={{
          headerShown: false
        }}
        name='Public Groups List'
        component={withMyHookCategory(PublicGroupListScreen, route.params)}
      />


      <ExplorePublicGroupCategoryBasedStack.Screen
        options={{

          headerTitle: "Create a Public Group",

          headerStyle: { backgroundColor: colors.StackheaderCreatePublicStyleBackgroundColor, height: 50 },
          headerTitleStyle: {
            fontSize: 19,
            marginTop: -30,

            width: colors.TabLabelStylewidth
          },
          headerLeft: ({ }) => <HeaderLeftCreateaPublicGroup />,

        }}



        name='Create a Public Group'
        component={withMyHookCategory(CreateaPublicGroupScreen, route.params)} />

    </ExplorePublicGroupCategoryBasedStack.Navigator>


  );
};

function withMyHookCategory(Component, title) {

  return function WrappedComponent(props) {
    const myHookValue = useRoute();
    myHookValue.params = title
    return <Component {...props} myHookValue={myHookValue} />;
  }
}


const HeaderLeftCreateaPublicGroup = () => {
  const navigation = useNavigation();
  return (

    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
      <View style={styles.ImageHeader}>

        <Image style={styles.ImageIconStyle}
          source={BackArrow} />


      </View>
    </TouchableOpacity>

  );
};


function withMyHook(Component) {
  return function WrappedComponent(props) {
    const myHookValue = useNavigation();
    return <Component {...props} myHookValue={myHookValue} />;
  }
}



const styles = StyleSheet.create({

  DrawerText: {

    backgroundColor: colors.rootscreenColor,
  }
  , ImageIconStyle: {
    margin: 10,
    height: 30,
    width: 50,
    resizeMode: 'stretch',

  },
  ImageHeader: {
    padding: 5,
    marginLeft: 7,
    justifyContent: 'flex-end',
    marginTop: 16
  }
});

export default ExplorePublicGroupTabStackNavigator;