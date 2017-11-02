import React, { Component } from 'react';
import { Content } from 'native-base';
import DisplayCard from './DisplayCard';
import * as firebase from 'firebase';

export default class ExplorePage extends Component<{}> {
  constructor(props) {
    super(props);
    let user = firebase.auth().currentUser;
    this.state = {
      photos: [],
      userId: user.uid,
      highestlabel: null,
      highestProb: 0
    }
    this.filterPhotos = this.filterPhotos.bind(this);
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
          })
        }
      });
    })
    .then(() => {
      this.filterPhotos();
    })
  }

  filterPhotos() {
    let photoRef = firebase.database().ref('photos');
    photoRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        if (childData.label === this.state.highestlabel || this.state.highestLabel === null) {
          this.setState({
            photos: this.state.photos.concat([childData])
          })
        }
      });
    });
  }

  render() {
    return (
      <Content>
        {this.state.photos.map((photo, key) => (
          <DisplayCard
            url={null}
            key={key}
            pic={{uri: `data:image/jpeg;base64,${photo.picture}`}}
            display={photo.author}
            resize={null}
            />
        ))}
      </Content>
    );
  }
}
