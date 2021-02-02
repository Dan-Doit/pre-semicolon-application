import React, { useState , useEffect } from "react";
import styled from "styled-components/native";
import Weather from "../../components/Weather"; 
import Loader from "../../components/Loader";
import * as Location from 'expo-location';
import {Alert} from 'react-native';
import Covid from "../../components/Covid";


const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;


export default () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Woops!","위치정보를 찾을수 없어요!")
        return;
      }

      try {
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
        const [{ region }]  = await Location.reverseGeocodeAsync({latitude,longitude});
        
        setLocation({ latitude, longitude, region:region.toLowerCase() });
        setLoading(false);
       } catch { 
        Alert.alert("위치를 찾을수없어요","다시 시도해 주세요 ㅠㅠ")
      }

    })();
  }, []);
  
  return (
    loading ? (<Loader />) : (<View><Weather latitude={location.latitude} longitude={location.longitude} /><Covid location={location.region} /></View>)
  )};