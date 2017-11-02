import React, { Component } from 'react';
import { Container, Content, Button } from 'native-base';
import DisplayCard from './DisplayCard';
import ImagePicker from 'react-native-image-picker';
import { AppRegistry, StyleSheet, View, PixelRatio, TouchableOpacity, Image, StyleProvider } from 'react-native';
import * as firebase from 'firebase';
import { productData } from './productsdata';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import ProductsPage from './ProductsPage';

export default class Main extends Component<{}> {
  constructor(props) {
    let user = firebase.auth().currentUser;
    super(props);
    this.state = {
      picSource: null,
      id: user.uid,
      photos: null,
      probabilities: null,
      productActive: true,
    };
    this.writeNewPhoto = this.writeNewPhoto.bind(this);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.updatePhotoCount = this.updatePhotoCount.bind(this);
    this.handleEinstein = this.handleEinstein.bind(this);
    this.updatePhotoProb = this.updatePhotoProb.bind(this);
    this.setExplore = this.setExplore.bind(this);
    this.setProduct = this.setProduct.bind(this);
  }

  setExplore() {
    this.setState({
      productActive: false
    })
  }

  setProduct() {
    this.setState({
      productActive: true
    })
  }

  //added photo probabilities to user
  updatePhotoProb(probabilities, uid, photoCount) {
    probabilities.forEach(probability => {
      let userLabelRef = firebase.database().ref(`users/${uid}/${probability.label}`);
      userLabelRef.transaction(currentProb => {
        return (currentProb + probability.probability) / photoCount;
      });
    });
  }

  //updates photo count in the database
  updatePhotoCount(probabilities, uid) {
    let userPhotoCountRef = firebase.database().ref(`users/${uid}/photoCount`);
    return userPhotoCountRef.transaction(currentPhotoCount => {
      return currentPhotoCount + 1;
    }, (error, completed, snapshot) => {
      if (completed) {
        this.updatePhotoProb(probabilities, uid, snapshot.val());
      }
    });
  }

  //updates photos in the database
  writeNewPhoto(uid, name, picture, probabilities) {
    let photoData = {
      author: name,
      uid: uid,
      likesCount: 0,
      picture: picture,
      probabilities: probabilities,
      label: probabilities[0]['label']
    };

    // Get a key for a new Photo.
    let newPhotoKey = firebase.database().ref().child('photos').push().key;

    // Write the new photo's data simultaneously in the photos list and the user's photo list.
    let updates = {};
    updates[`/photos/'${newPhotoKey}`] = photoData;
    updates[`/user-photos/${uid}/${newPhotoKey}`] = photoData;

    this.setState({
      probability: probabilities
    });
    return firebase.database().ref().update(updates);
  }

  //makes call to einstein api for image analysis
  handleEinstein(imgString) {
    //convert data to form data as the acceptable request body
    let form_data = new FormData();
    form_data.append('modelId', 'VUAMRM3AOOQGP2SS6EGRSVHN3M');
    form_data.append('sampleBase64Content', imgString);

    fetch('https://api.einstein.ai/v2/vision/predict', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer OC6A527QGYDS5DNYOY7Z3CACV466RRDUVHWKFW3FJRUC7CTZQGMHDUXSNOG7NBLTU6OKR2TLAMU5KIQHWUQIKO4ZWI6HSPGQGL4NMCY',
        'Content-Type': 'multipart/form-data',
        'Cache-Control': 'no-cache'
      },
      body: form_data
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.writeNewPhoto(this.state.id, this.props.display, imgString, responseJson.probabilities);
      this.updatePhotoCount(responseJson.probabilities, this.state.id);
    })
    .catch(err => console.log(err));
  }

  //generates a base64 string for the photo
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let base64Source = {uri: `data:image/jpeg;base64,${response.data}`};
        this.setState({
          picSource: base64Source
        });
        this.handleEinstein(response.data);
      }
    });
  }

  render() {
    return (
      <Container>
        <MainHeader/>
          {this.state.productActive ? <ProductsPage/> : null}
        <MainFooter
          setProduct={this.setProduct}
          setExplore={this.setExplore}
          selectPhotoTapped={this.selectPhotoTapped}/>
      </Container>
    );
  }
}
