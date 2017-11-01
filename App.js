import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Login from './Components/Login';
import Main from './Components/Main';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCq3jqLxJski_zG-kGl17Lu_SeAFiPMYU8",
  authDomain: "reinsteigram.firebaseapp.com",
  databaseURL: "https://reinsteigram.firebaseio.com/",
  storageBucket: "gs://reinsteigram.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

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
      email: '',
      password: '',
      display: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let user = firebase.auth().currentUser;
    if (user != null) {
      this.setState({
        display: user.displayName,
        email: user.email,
        loggedIn: true
      })
    }
  }

  handleSubmit(name) {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      this.setState({
        loggedIn: true
      })
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      this.setState({
        password: ''
      });
      console.log(`Error ${errorCode}: ${errorMessage}`);
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
        display={this.state.display}/>);
    } else {
      return (<Login
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        />);
    }
  }
}
