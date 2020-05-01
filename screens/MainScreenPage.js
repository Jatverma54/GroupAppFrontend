import  React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Button } from 'react-native';


import colors from '../constants/colors';
import MainScreenText from '../constants/MainScreenText';

import menu from '../Pictures/Logo.png';




const MainScreenPage = ({navigation}) => {
    
    
    return (
        
        // <View style={styles.Rootscreen}>
            <ImageBackground source={menu} style={styles.image}>
              
                <View style={styles.inputContainers}>
                    
                    <View>
                        <Text style={styles.TextContainer}>{MainScreenText.PrimaryHeaderText}</Text>
                    </View>
                    <View>
                        <Text style={styles.paragraph}>{MainScreenText.SubHeading} </Text>
                    </View>
                </View>

                <View style={styles.ButtonContainer}>
    <View style={styles.button}><Button title="Login" color={colors.LoginButtonColor}  onPress={({}) => navigation.push('LoginScreen')}/></View>
                    <View style={styles.button}><Button title="SignUp" color={colors.SignUpButton} /></View>

                 </View> 

            </ImageBackground>
        // </View>
     
    );

};




const styles = StyleSheet.create({
    Rootscreen: {
        flex: 1,
    },
    image: {
        justifyContent: 'center',
        height: "100%",
        resizeMode: 'cover'
    },
    container: {
        paddingTop: 50,
    },
    inputContainers: {
        flex: 2,
        justifyContent: 'flex-start',
        paddingTop: 80,
        padding: 30,
    },
    TextContainer: {
        margin: 24,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    paragraph: {

        margin: -20,
        fontSize: 19,
        textAlign: 'right',

    },
    ButtonContainer: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,

    },
    button: {
        width: 300,
        marginVertical: 10,
        fontWeight: "bold",
        
    },
});

export default MainScreenPage;