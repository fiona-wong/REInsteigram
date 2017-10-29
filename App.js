import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Login from './Components/Login';
import Main from './Components/Main';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      password: '',
      display: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(name) {
    this.setState({
      loggedIn: true,
    });
  }

  handleChange(value, name) {
    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.loggedIn) {
      return (<Main
        username={this.state.username}
        display={this.state.display}/>);
    } else {
      return (<Login
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        />);
    }
  }
}
