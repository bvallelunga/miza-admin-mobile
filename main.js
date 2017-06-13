import Expo from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import Screens from './screens'

global.API_URL = "https://miza.io/api"

const App = StackNavigator({
  Login: { screen: Screens.Login },
  Publishers: { screen: Screens.Publishers },
}, {
  mode: 'modal',
  initialRouteName: "Login",
  headerMode: "none"
});

Expo.registerRootComponent(App);
