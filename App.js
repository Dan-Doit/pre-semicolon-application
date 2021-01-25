import React, { useState, useEffect } from 'react';
import { StatusBar, Platform } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AsyncStorage from "@react-native-community/async-storage";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';
import apolloClientOptions from './Apollo';
import { ThemeProvider } from 'styled-components';
import styles from './styles';
import NavController from './components/NavController';
import { AuthProvider } from './AuthContext';
import { operationName } from '@apollo/client';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...AntDesign.font
      });

      await Asset.loadAsync([require('./assets/icon.png')]);

      const cache = new InMemoryCache({});

      await persistCache({
        cache,
        storage: AsyncStorage,
      });

      const client = new ApolloClient({
        cache,
        // 요청으로 오퍼레이션값을 요청할때마다 토큰을 집어넣어 처음 데이터가 없을때 발생하는 오류를 방지한다.
        request: async operation => { 
          const token = await AsyncStorage.getItem('jwt');
          return operation.setContext({
            headers: {Authorization: `Bearer ${token}`}
          });
        },
        ...apolloClientOptions
      });
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }

  }
  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client ? (
    <ApolloProvider client={client} >
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          {Platform.OS === "ios" ? <StatusBar barStyle="dark-content" /> : null}
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ ApolloProvider>
  ) : (
      <AppLoading />
    );

}