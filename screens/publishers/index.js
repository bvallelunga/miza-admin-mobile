import React from 'react';
import { Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

export const Publishers = StackNavigator({
  Listing: { screen: require("./listing").Listing },
  Publisher: { screen: require("./publisher").Publisher },
}, {
  navigationOptions: {
    gesturesEnabled: false
  }
});
