import React from 'react';
import {
  View, Text, FlatList, AsyncStorage,
  ActivityIndicator, Button,
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

export class Listing extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Publishers",
      headerRight: (
        <Button title="Logout" onPress={() => {
          AsyncStorage.removeItem('@user:token')
          navigation.goBack(null)
        }}></Button>
      )
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      filtered_data: [],
      error: null,
      refreshing: false,
      token: this.props.navigation.state.params.token
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `${API_URL}/publishers?token=${this.state.token}`;
    this.setState({ loading: true });

    fetch(url).then(res => res.json()).then(res => {
      this.setState({
        data: res.publishers,
        filtered_data: res.publishers,
        error: res.message || null,
        loading: false,
        refreshing: false
      });
    })
    .catch(error => {
      this.setState({ error, loading: false });
    });
  };

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.makeRemoteRequest();
    });
  };

  renderSeparator = () => {
    return (
      <View style={{
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
      }} />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme onChangeText={(query) => {
      this.setState({
        filtered_data: this.state.data.filter((publisher) => {
          return publisher.name.indexOf(query) > -1 || publisher.owner.indexOf(query) > -1
        })
      })
    }} />
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View style={{ backgroundColor: "transparent", paddingVertical: 20 }} >
        <ActivityIndicator animating size="small" />
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.state.filtered_data}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subtitle={item.owner}
            onPress={() => {
              this.props.navigation.navigate("Publisher", {
                publisher: item,
                token: this.state.token
              })
            }}
          />
        )}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
      />
    );
  }
}
