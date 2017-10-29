import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

export default class Login extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    return (
      <Container>
        <Header/>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChange={(username) => this.setState({username})}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChange={(password) => this.setState({password})}
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
