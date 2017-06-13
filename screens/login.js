import React from 'react';
import {
  StyleSheet, Text, TextInput,
  View, KeyboardAvoidingView,
  TouchableOpacity, AsyncStorage
} from 'react-native';

export class Login extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    AsyncStorage.getItem('@user:token', (error, token) => {
      if(!!token) {
        this.props.navigation.navigate('Publishers', { token })
      }
    })
  }

  loginUser() {
    const creds = this.state || {}

    fetch(API_URL + "/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds)
    }).then((response) => response.json()).then((response) => {
      if(!response.success) {
        alert(response.message)
      }

      const token = response.token
      AsyncStorage.setItem('@user:token', token)
      this.props.navigation.navigate('Publishers', { token })
    })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="height" style={styles.container}>

        <Text style={styles.intro_message}>
          Welcome back! Sign in to{"\n"}
          view admin analytics.
        </Text>

        <TextInput style={[styles.input, styles.input_top]} type="text" placeholder="Email Address"
          keyboardType="email-address" onChangeText={(email) => this.setState({email})} clearButtonMode='while-editing' />

        <TextInput style={[styles.input, styles.input_bottom]} type="password" placeholder="Password"
          onChangeText={(password) => this.setState({password})} secureTextEntry={true} clearButtonMode='while-editing' />

        <TouchableOpacity style={styles.button_container} onPress={this.loginUser.bind(this)}>
          <Text style={styles.button}>Sign In</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20
  },
  intro_message: {
    color: '#666',
    fontSize: 25,
    fontWeight: "400",
    textAlign: "center",
    textShadowColor: "white",
    textShadowOffset: {
      width: 0,
      height: -1
    },
    textShadowRadius: 0,
    marginBottom: 40
  },
  input_top: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  input_bottom: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: -1
  },
  input: {
    padding: 16,
    fontSize: 18,
    height: 60,
    color: "black",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dde5ed",
    overflow: "hidden"
  },
  button_container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: "#2D9BF3",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    marginTop: 15,
  },
  button: {
    color: "white",
    fontSize: 18,
    fontWeight: "700"
  }
});
