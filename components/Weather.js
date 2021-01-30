import React from 'react';
import styled from "styled-components/native";
import Loader from "../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { gql } from 'apollo-boost';
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const weatherOptions = {
  Thunderstorm: {
    iconName: "weather-lightning"
  },
  Drizzle: {
    iconName: "weather-hail"
  },
  Rain: {
    iconName: "weather-rainy"
  },
  Snow: {
    iconName: "weather-snowy"
  },
  Atmosphere: {
    iconName: "weather-hail"
  },
  Clear: {
    iconName: "weather-sunny"
  },
  Clouds: {
    iconName: "weather-cloudy"
  },
  Mist: {
    iconName: "weather-hail"
  },
  Dust: {
    iconName: "weather-hail"
  },
  Haze: {
    iconName: "weather-hail"
  }
};

const GET_WEATHER = gql`
  query weather($latitude: Float! , $longitude:Float!) {
    weather(latitude: $latitude, longitude:$longitude){
        temp 
        weather
        }
    }
`;


const Weather = ({ latitude, longitude }) => { 
    const { data, loading } = useQuery(GET_WEATHER, {
    variables: {
          latitude,
          longitude
    }
    });

    return loading ? <Loader /> : (
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
          size={50}
          name={weatherOptions[data.weather.weather].iconName}
          color="black"
        />
        <Text style={styles.temp}>{data.weather.temp}°</Text>
      </View>
    )
}

export default Weather;

Weather.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  temp: {
    fontSize: 20,
    color: "black"
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});