import React from 'react';
import { View, StyleSheet } from 'react-native';
import {DrawerActions,useNavigation} from '@react-navigation/native';
import {
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { MaterialCommunityIcons,FontAwesome,MaterialIcons } from '@expo/vector-icons';
import DrawerLogo from '../Pictures/DrawerLogo.png';
import FooterLogo from '../Pictures/Father.png';
import colors from '../constants/colors';


  const DrawerContent=(props)=> {
    const navigation = useNavigation();
    return (
      
      // <DrawerContentScrollView {...props}>
        <View {...props}
          style={
            styles.drawerContent
          }
        >
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={DrawerLogo}
              size={90}
            />
            <Title style={styles.title}>Jatin Verma</Title>
            <Paragraph style={[styles.paragraph, styles.caption]}>
                  Groups App
                </Paragraph>
                <Caption style={styles.caption}>Its All About Groups</Caption>
            <View style={styles.row}>
             
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                 Private | Public | GroupChat
                </Paragraph>
                
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection} >
            <DrawerItem 
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-group"
                  color={color}
                  size={size}
                />
              )}
              label="Public Groups"
             
       
                labelStyle={{color:colors.drawerTextcolor,fontWeight: colors.drawerfontWeight,width:colors.drawerwidth, fontSize: colors.drawerfontSize,
                
              }}
              onPress={() => navigation.dispatch(DrawerActions.jumpTo('Public Groups'))}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome name="feed" color={color} size={size} />
              )}
              label='Public Groups Feed'
              labelStyle={{color:colors.drawerTextcolor,fontWeight: colors.drawerfontWeight,width:colors.drawerwidth, fontSize: colors.drawerfontSize,}}
              onPress={() => navigation.dispatch(DrawerActions.jumpTo('Public Groups Feed'))}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-group-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Personal Groups"
              labelStyle={{color:colors.drawerTextcolor,fontWeight: colors.drawerfontWeight,width:colors.drawerwidth, fontSize: colors.drawerfontSize,}}
              onPress={() => navigation.dispatch(DrawerActions.jumpTo('Personal Groups'))}
            />

              <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome
                  name="suitcase"
                  color={color}
                  size={size}
                />
              )}
              label="Professional Groups"
              labelStyle={{color:colors.drawerTextcolor,fontWeight: colors.drawerfontWeight,width:colors.drawerwidth, fontSize: colors.drawerfontSize,}}
              onPress={() =>  navigation.dispatch(DrawerActions.jumpTo('Professional groups'))}
              />


             <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="face-profile"
                  color={color}
                  size={size}
                />
              )}
              label="Profile"
              labelStyle={{color:colors.drawerTextcolor,fontWeight: colors.drawerfontWeight,width:colors.drawerwidth, fontSize: colors.drawerfontSize,}}
              onPress={() =>  navigation.dispatch(DrawerActions.jumpTo('Profile'))}
            />
          </Drawer.Section>
         
         
           
         
         <View style={styles.drawerSectionFooter}>
         <Avatar.Image
              source={FooterLogo}
              size={100}
            />
         <Paragraph style={[styles.paragraphfooter, styles.caption]}>
          Dedicated to all the Fathers
         </Paragraph>
         
       </View>
         
           

          
        </View>
      /* </DrawerContentScrollView> */
    );
  }
  
  const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      backgroundColor:colors.drawerBackgroundcolor,
      paddingTop:38
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      marginTop: 20,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
     
    },
    drawerSection: {
      marginTop: 15,
      
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    drawerSectionFooter:{
      flexDirection:'column',
      justifyContent: 'flex-end',
      paddingVertical: "100%",
      alignItems: 'center',
      marginRight: 15,
      marginVertical:-10
    },
    paragraphfooter: {
      fontWeight: 'bold',
      marginRight: 3,
      marginTop:10,
      color:'#CAAC3E'
    },
  });


export default  DrawerContent;
 