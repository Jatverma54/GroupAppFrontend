import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet ,StatusBar,View } from 'react-native';
import colors from './constants/colors';
import RootMainStackNavigator from './stacks/RootStackNavigator';
import {NavigationContainer,DrawerActions} from '@react-navigation/native';



export default function App() {

  return (
<View style={styles.Rootscreen}>

<StatusBar 
        barStyle = {colors.StatusBarStyle}
        hidden = {false}
        backgroundColor = {colors.StatusbackgroundColor}
        translucent = {true}
        networkActivityIndicatorVisible = {true}
        />
    <NavigationContainer>

    <RootMainStackNavigator/>

   </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({

  Rootscreen: {
    flex: 1,
    backgroundColor: colors.rootscreenColor,
  }

});

