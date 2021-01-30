import React, { useState , useEffect } from "react";
import styled from "styled-components/native";
import Weather from "../../components/Weather"; 
import Loader from "../../components/Loader";
import * as Location from 'expo-location';
import {Alert} from 'react-native';


const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;


export default () => {
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  
  const getPermission = async () => {  
    try {
      await Location.requestPermissionsAsync();
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      setLatitude(latitude);
      setLongitude(longitude);
      setLoading(false);
      return;
  } catch (e) {
    console.log(e);
      Alert.alert("당신을 찾을수 없어요 ㅠㅠ");
      return ;
    }
  }
  getPermission();
  
  return (
    loading ? (<Loader />) : (<View><Weather latitude={latitude} longitude={longitude} /></View>)
  )};