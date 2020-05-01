
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    flexDirection:'row',
    justifyContent:'center',
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

const DisplayAnImageWithStyle = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={require('../Pictures/Logo.png')}
      />
    </View>
  );
}

export default DisplayAnImageWithStyle;
