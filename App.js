import 'react-native-gesture-handler';
import React ,{ useEffect } from 'react';
import { StyleSheet ,StatusBar,View,AsyncStorage } from 'react-native';
import colors from './constants/colors';
import RootMainStackNavigator from './stacks/RootStackNavigator';
import {NavigationContainer,DrawerActions,Header} from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import  UserToken from './constants/APIPasswordCollection'
//console.disableYellowBox = true;

export default function App() {

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
      //  props.navigation.navigate('LoginScreen');
        return null;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;
      //const expirationDate = new Date(expiryDate);

      if ( !token || !userId) {//expirationDate <= new Date() ||
       // props.navigation.navigate('LoginScreen');
        return null;
      }

    //  const expirationTime = expirationDate.getTime() - new Date().getTime();
    UserToken.userToken =token;
    UserToken.UserId = userId;    
      //dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, []);


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

