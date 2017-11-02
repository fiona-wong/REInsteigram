import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class MainFooter extends Component<{}> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button vertical onPress={this.props.setExplore}>
            <Icon name="apps" />
            <Text>Explore</Text>
          </Button>
          <Button vertical onPress={this.props.selectPhotoTapped}>
            <Icon name="camera" />
            <Text>Camera</Text>
          </Button>
          <Button vertical onPress={this.props.setProduct}>
            <Icon name="cart" />
            <Text>Products</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}
