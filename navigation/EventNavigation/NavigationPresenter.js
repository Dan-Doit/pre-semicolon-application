import React, { useState , useEffect } from "react";
import styled from "styled-components/native";
import constants from "../../constants";
import { StyleSheet } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from 'apollo-boost';
import NavigationView from "./NavigationView";

const Image = styled.Image`
  margin-top : -30px;
  margin-bottom : -30px;
  width: ${constants.width / 3};
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const GET_WEATHER = gql`
  query weather($latitude: Float! , $longitude:Float!) {
    weather(latitude: $latitude, longitude:$longitude){
        temp 
        weather
        }
    }
`;

const GET_COVID = gql`
  query covid19($location:String!) {
    covid19(location:$location){
      countryName
      newCase
      }
    }
`;



export default ({ location }) => {
  const [index, setIndex] = useState(0);

  const { data: weatherData, loading: weatherLoding } = useQuery(GET_WEATHER, {
    variables: {
      latitude: location.latitude,
      longitude: location.longitude
    }
  });
  const { data: covidData, loading: covidLoading } = useQuery(GET_COVID, {
    variables: {
      location: location.region
    }
  });

  const saveViews = () => { 
    if (index === 2) {
      setTimeout(() => setIndex(0), 5000);
    } else {
      setTimeout(() => setIndex(index + 1), 5000);
    }
  }

  useEffect(() => { 
    saveViews();
  },[index])

  return (covidData && weatherLoding ? (<Image resizeMode={"contain"} source={require("../../assets/logo.png")} />)
    :     < NavigationView index = {index}
            countryName = { covidData.covid19.countryName }
            newCase = { covidData.covid19.newCase }
            weather = { weatherData.weather.weather }
            temp = { weatherData.weather.temp } />
  
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  temp: {
    fontSize: 17,
    fontWeight:'bold',
    color: "black"
  }
});