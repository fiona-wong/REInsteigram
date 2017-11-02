import React, { Component } from 'react';
import { Container, Header, Content, Title, Text, Button, Icon, Left, Body, Right, Footer, FooterTab } from 'native-base';
import DisplayCard from './DisplayCard';
import ImagePicker from 'react-native-image-picker';
import { AppRegistry, StyleSheet, View, PixelRatio, TouchableOpacity, Image, StyleProvider } from 'react-native';
import * as firebase from 'firebase';
import { productData } from './productsdata';

export default class ExplorePage extends Component<{}> {
  constructor(props) {
    super(props);
    let user = firebase.auth().currentUser;
    this.state = {
      probabilities: null,
      pictures: [],
      userId: user.uid
    }
  }

  componentDidMount() {
    let userRef = firebase.database().ref('users');
    userRef.on(`${this.state.userId}`, (snapshot) => {
      this.setState({
        probabilities: snapshot.val()
      });
    }, (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    });
  }

  render() {
    return (
      <Content>
        {this.state.products.map((product, key) => (
          <DisplayCard
            url={product.link}
            key={key}
            pic={{uri: product.image}}
            display={"REI - Click for Details"}
            />
        ))}
      </Content>
    );
  }
}
