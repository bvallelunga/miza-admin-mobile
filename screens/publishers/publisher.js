import React from 'react';
import {
  View, Text, WebView
} from "react-native";

export class Publisher extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.publisher.name,
      headerBackTitle: null
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      publisher: this.props.navigation.state.params.publisher,
      token: this.props.navigation.state.params.token
    };
  }

  render() {
    return (
      <WebView style={{
        backgroundColor: '#F1F5F9',
      }} source={{uri: `${API_URL}/publishers/${this.state.publisher.key}?token=${this.state.token}`}} />
    )
  }
}
