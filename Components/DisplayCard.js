import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class DisplayCard extends Component<{}> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card>
        <CardItem>
          <Left>
            <Icon name='person' />
            <Body>
              <Text>{this.props.display}</Text>
              <Text note>{this.props.username}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={this.props.pic ? this.props.pic : require('./cabin.jpg')} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
