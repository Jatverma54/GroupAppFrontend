import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet ,StatusBar,View } from 'react-native';
import colors from './constants/colors';
import RootMainStackNavigator from './stacks/RootStackNavigator';
import {NavigationContainer,DrawerActions,Header} from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

//console.disableYellowBox = true;

export default function App() {

  return (
    <NavigationContainer>
<View style={styles.Rootscreen}>

<StatusBar 
        barStyle = {colors.StatusBarStyle}
        hidden = {false}
        backgroundColor = {colors.StatusbackgroundColor}
        translucent = {true}
        networkActivityIndicatorVisible = {true}
        />
       
       <PaperProvider>
    

    <RootMainStackNavigator/>

   
   </PaperProvider>
  
    </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  Rootscreen: {
    flex: 1,
    backgroundColor: colors.rootscreenColor,
  }

});

