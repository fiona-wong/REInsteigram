import React, { Component } from 'react';
import { Linking, Image, TouchableHighlight } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class DisplayCard extends Component<{}> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    Linking.canOpenURL(`${this.props.url}`).then(supported => {
      if (supported) {
        Linking.openURL(`${this.props.url}`);
      } else {
        console.log(`Don't know how to open URI: ${this.props.url}`);
      }
    });
  }

  render() {
    return (
      <Card>
        <CardItem>
          <Left>
            <Icon name='person' />
            <Body>
              <TouchableHighlight onPress={this.handleClick}>
                <Text>{this.props.display}</Text>
              </TouchableHighlight>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={this.props.pic ? this.props.pic : require('./cabin.jpg')} style={{height: 200, width: null, flex: 1, resizeMode: 'contain'}}/>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>0 Likes</Text>
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>0 Comments</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
