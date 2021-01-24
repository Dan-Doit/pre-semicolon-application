import React from "react";
import Home from "../screens/tabs/Home";
import Search from "../screens/tabs/Search";
import Profile from "../screens/tabs/Profile";
import { View, Platform } from "react-native";
import constants from "../constants";
import styled from "styled-components";
import styles from "../styles";
import MessagesLink from "../components/MessagesLink";
import Notifications from "../screens/tabs/Notifications";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons'; 
import NavIcon from "../components/NavIcon";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig }
    }
  });

const Image = styled.Image`
  margin : -30px 0px;
  width: ${constants.width / 3};
`;

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerRight: <MessagesLink />,
        headerTitle: <Image resizeMode={"contain"} source={require("../assets/logo.png")} />
      }),
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios"? focused ? "home-sharp" : "home-outline" : focused ? "home-sharp" : "home-outline"} size={26} />
        )
      }
    },
    Search: {
      screen: stackFactory(Search, {
        title: "Search"
      }),
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused} name={Platform.OS === "ios" ? focused ? "ios-search-sharp" : "ios-search-outline" : focused ? "md-search-sharp" : "md-search-outline"}  size={26} />
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
            focused={focused} name={Platform.OS === "ios" ? "ios-add" : "md-add"} size={ 32 } />
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
            focused={focused} name={Platform.OS === "ios" ? focused ? "star" : "staro" : focused ? "star" : "staro"} size={26}
            color={ focused ? styles.navyColor : styles.darkGreyColor } />
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
            focused={focused} name={Platform.OS === "ios"? focused ? "person" : "person-outline" : focused ? "person" : "person-outline"} size={26} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);