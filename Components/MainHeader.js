import React, { Component } from 'react';
import { Header, Left, Body, Right, Title } from 'native-base';

export default class MainHeader extends Component<{}> {
  render() {
    return (
      <Header>
        <Left/>
        <Body>
          <Title>REInsteigram</Title>
        </Body>
        <Right />
      </Header>
    )
  }
}
