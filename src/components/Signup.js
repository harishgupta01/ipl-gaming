import {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StyleSheet} from 'react-native';
import InputView from './InputView.js';
import ButtonView from './ButtonView.js';
import {Button, Text} from 'react-native-elements';


export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmpwd: '',
      usernameError: false,
    };
  }

  onSignup = () => {
    console.log('onSignup = ' + this.state.username);
    if (this.state.username == '') {
      this.setState({
        usernameError: true,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <InputView
          placeHolder="Username"
          iconName="user"
          showError={this.state.usernameError}
          onChangeText={username =>
            this.setState({username, usernameError: false})
          }
        />

        <InputView placeHolder="Email" iconName="envelope" />

        <InputView placeHolder="Password" iconName="lock" />

        <InputView placeHolder="Confirm Password" iconName="lock" />

        <ButtonView title="Signup" onPress={this.onSignup} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#19388A',
  },
});
