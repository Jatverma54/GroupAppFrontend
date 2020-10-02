import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FeedDetails = ({ navigation }) => {

   return (

      <View style={styles.container}>

         <Text>Feed Details</Text>

      </View>

   );
};
const styles = StyleSheet.create({

   ButtonContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'baseline',

   },
   button: {

      width: 300,
      marginVertical: 60,
      fontWeight: "bold",

   },
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5'
   },

});


export default FeedDetails;

