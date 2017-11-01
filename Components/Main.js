import React, { Component } from 'react';
import { Container, Header, Content, Title, Text, Button, Icon, Left, Body, Right, Footer, FooterTab } from 'native-base';
import DisplayCard from './DisplayCard';
import ImagePicker from 'react-native-image-picker';
import { AppRegistry, StyleSheet, View, PixelRatio, TouchableOpacity, Image } from 'react-native';
import * as firebase from 'firebase';

export default class Main extends Component<{}> {
  constructor(props) {
    let user = firebase.auth().currentUser;
    super(props);
    this.state = {
      picSource: null,
      id: user.uid
    };
    this.writeNewPhoto = this.writeNewPhoto.bind(this);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  writeNewPhoto(uid, name, picture) {
    let photoData = {
      author: name,
      uid: uid,
      likesCount: 0,
      picture: picture
    };

    // Get a key for a new Post.
    let newPhotoKey = firebase.database().ref().child('photos').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    updates[`/photos/'${newPhotoKey}`] = photoData;
    updates[`/users/'${uid}`] = photoData;

    return firebase.database().ref().update(updates);
  }

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
        let storageRef = firebase.storage().ref();
        let base64Source = {uri: `data:image/jpeg;base64,${response.data}`};

        this.setState({
          picSource: base64Source
        });
        this.writeNewPhoto(this.state.id, this.props.display, response.data);
      }
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>REInsteigram</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <DisplayCard
          pic={this.state.picSource}
          display={this.props.display}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="apps" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={this.selectPhotoTapped.bind(this)}>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
});
