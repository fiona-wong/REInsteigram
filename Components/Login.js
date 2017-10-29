import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Title, Left, Right, Body, Content, Form, Item, Input, Label, Button } from 'native-base';

export default class Login extends Component<{}> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>Please Login</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Full Name</Label>
              <Input
                autoCorrect={false}
                onChangeText={(fullName) => this.props.handleChange(fullName, "display")}
              />
            </Item>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(username) => this.props.handleChange(username, "username")}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={(password) => this.props.handleChange(password, "password")}
              />
            </Item>
            <Button full dark
              onPress={() => this.props.handleSubmit()}>
            <Text style={styles.login}>Login</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    color: '#A8C73F',
    fontWeight: 'bold',
  },
});
