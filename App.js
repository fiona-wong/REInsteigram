import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({
      loggedIn: true
    });
  }

  render() {
    if (this.state.loggedIn) {
      return (<Text>Done with Sign up</Text>);
    } else {
      return (<Login handleSubmit={this.handleSubmit}/>);
    }
  }
}

class Login extends Component {
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
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    color: '#A8C73F',
  },
  login: {
    color: '#A8C73F',
    fontWeight: 'bold',
  },
  header: {
    color: '#A8C73F',
    backgroundColor: '#000000',
    fontWeight: 'bold',
  }
});
