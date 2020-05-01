import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Button } from 'react-native';
import colors from '../constants/colors';
import OverideBackButton from '../components/OverideBackButton'



const ExplorePublicGroupScreen = ({navigation}) => {
  
   return(
     
     <View style={styles.ButtonContainer}>
    <OverideBackButton/>
   {/* <Button style={styles.button} color={colors.LoginButtonColor} title="Menu " onPress={()=>navigation.push('JoinedPublicGroupsScreen')}/>  */}
   <Text>Yo</Text>
   </View> 
   );
};
const styles = StyleSheet.create({
  
   ButtonContainer: {   
      flexDirection:'row', 
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'baseline',
       
   },
   button: {
       
      width: 300,
        marginVertical: 60,
        fontWeight: "bold",
       
   },
});


export default ExplorePublicGroupScreen;

