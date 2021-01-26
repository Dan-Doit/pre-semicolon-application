import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from "react";
import Home from "../screens/tabs/Home";
import Search from "../screens/tabs/search";
import Notifications from "../screens/tabs/Notifications";
import Profile from "../screens/tabs/Profile";
import MessagesLink from "../components/MessagesLink";
import Detail from "../screens/Detail";
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from "react-native";
import NavIcon from "../components/NavIcon";
import { AntDesign } from '@expo/vector-icons'; 
import styled from "styled-components/native";
import constants from "../constants";
import styles from "../styles";
import UserDetail from "../screens/UserDetail";

const Image = styled.Image`
  margin-top : -30px;
  margin-bottom : -30px;
  width: ${constants.width / 3};
  
`;

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      },
      Detail: {
        screen: Detail,
        navigationOptions: {
          headerBackTitle:" ",
          headerTintColor: styles.blackColor,
          title: "Photo"
        }
      },
      
      UserDetail: {
        screen: UserDetail,
        navigationOptions: ({ navigation }) => ({
          title: navigation.getParam("username")
        })
      }
    },
    {
      defaultNavigationOptions: {
        headerBackTitle: " ",
        headerTintColor:styles.blackColor
    }
  });

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerRight: <MessagesLink />,
        headerTitle: ()=> <Image resizeMode={"contain"} source={require("../assets/logo.png")} />
      }),
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={ focused ? "home-sharp" : "home-outline"} />
        )
      }
    },
    Search: {
      screen: stackFactory(Search, {
        headerBackTitle:null
      }),
      navigationOptions: {
        headerBackTitle:" ",
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ?
              (focused ? "ios-search-sharp" : "ios-search-outline")
              :
              (focused ? "md-search-sharp" : "md-search-outline")
            }
            size={28}/>
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
            size={32} />
        )
      }
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        title: "Notifications"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <AntDesign
            focused={focused}
            name={focused ? "star" : "staro"}
            color={focused ? styles.navyColor : styles.darkGreyColor}
            size={26} />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile, {
        title: "Profile"
      }),
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={focused ? "person" : "person-outline"} />
        )
      }
    }
  },
  {
    initialRouteName:"Home",
    tabBarOptions: {
      showLabel: false
    }
  }
);