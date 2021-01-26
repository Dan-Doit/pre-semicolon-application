import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import SelectPhoto from "../screens/photo/SelectPhoto";
import TakePhoto from '../screens/photo/TakePhoto';
import UploadPhoto from '../screens/photo/UploadPhoto'; 
import styles from "../styles";
import React from "react";
import UploadLinks from "../components/UploadLinks";


const PhotoTabs = createMaterialTopTabNavigator(
    {
    Select: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: "Select"
      }
    },
    Take: {
      screen: TakePhoto,
      navigationOptions: {
        tabBarLabel: "Take"
      }
    }
    },
    {
      tabBarPosition: "bottom",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: styles.navyColor,
        marginBottom: 48
      },
      labelStyle: {
        color: styles.blackColor,
        fontWeight: "600"
      },
      style: {
          backgroundColor: styles.searchColor
      }
    }
    }
);

export default createStackNavigator({
    PhotoTabs: {
    screen: PhotoTabs,
        navigationOptions: {
            title: "Choose Photo",
            headerTintColor: styles.blackColor,
            headerBackTitle: " ",
            headerRight: ()=>
            <UploadLinks/>
        }
    },
    Upload: {
        screen: UploadPhoto,
        navigationOptions: {
            headerTintColor: styles.blackColor,
            headerBackTitle: " ",
            title: "UploadPhoto"
        }
    }
}, {
    mode:"modal"
})
