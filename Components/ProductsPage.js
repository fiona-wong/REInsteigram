import React, { Component } from 'react';
import { Container, Header, Content, Title, Text, Button, Icon, Left, Body, Right, Footer, FooterTab } from 'native-base';
import DisplayCard from './DisplayCard';
import ImagePicker from 'react-native-image-picker';
import { AppRegistry, StyleSheet, View, PixelRatio, TouchableOpacity, Image, StyleProvider } from 'react-native';
import * as firebase from 'firebase';
import { productData } from './productsdata';

export default class ProductsPage extends Component<{}> {
  constructor(props) {
    super(props);
    let user = firebase.auth().currentUser;
    this.state = {
      products: productData.slice(0, 50),
      userId: user.uid,
      highestlabel: null,
      highestProb: 0
    }
  }

  componentDidMount() {
    let userRef = firebase.database().ref(`users/${this.state.userId}`);
    userRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        if (childData > this.state.highestProb && childKey !== 'photoCount') {
          this.setState({
            highestlabel: childKey,
            highestProb: childData,
            products: productData.filter(product => {
              return product.label === childKey;
            })
          })
        }
      });
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
