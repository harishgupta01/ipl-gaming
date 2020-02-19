import {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StyleSheet} from 'react-native';
import InputView from './InputView.js';
import ButtonView from './ButtonView.js';
import {Button, Text} from 'react-native-elements';
import {isValid} from './Utils';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmpwd: '',
      usernameError: false,
      emailError: false,
      passwordError: false,
      confirmpwdError: false,
      isLogin: true,
      errorMsg: '',
      hasError: false,
    };
  }

  onSignup = () => {
    this.setState({
      hasError: false,
    });

    console.log('onSignup = ' + this.state.username);
    if (this.state.username === '') {
      this.setState({
        usernameError: true,
      });
    }
    if (this.state.email === '') {
      this.setState({
        emailError: true,
      });
    }

    if (this.state.password === '') {
      this.setState({
        passwordError: true,
      });
    }

    if (this.state.confirmpwd === '') {
      this.setState({
        confirmpwdError: true,
      });
    }

    if (!isValid(this.state.password) || !isValid(this.state.email)) {
      console.log("Returning from first condition")
      return;
    }

    if (
      !this.state.isLogin &&
      (isValid(this.state.username) || isValid(this.state.confirmpwd))
    ) {
      console.log("Returning from second condition")
      return;
    }

    var user = {
      isLogin: this.state.isLogin,
      name: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmpwd,
    };
    this.props.onButtonPress(user);
  };

  onTextPress = () => {
    console.log('Buton pressed');
    this.setState(prevState => ({
      isLogin: !prevState.isLogin,
    }));
  };

  onChangeText = text => {
    console.log('onChangeText = ' + this.state.username);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (isValid(nextProps.hasError)) {
      if (nextProps.hasError === true && this.state.isLogin === true) {
        return {errorMsg: 'Username or Password is incorrect', hasError: true};
      } else if (nextProps.hasError === true && this.state.isLogin === false) {
        return {errorMsg: 'Username already exist'};
      }
    }
    return null;
  }

  render() {
    let msg, buttonTitle, title;
    if (!this.state.isLogin) {
      msg = 'Already have an account.';
      buttonTitle = 'Login';
      title = 'Signup';
    } else {
      msg = "Don't have an account.";
      buttonTitle = 'Signup';
      title = 'Login';
    }

    return (
      <View style={styles.container}>
        {this.displayError()}
        {this.displayUsername()}
        <InputView
          placeHolder="Email"
          iconName="envelope"
          showError={this.state.emailError}
          onChangeText={email => this.setState({email, emailError: false})}
        />

        <InputView
          placeHolder="Password"
          iconName="lock"
          showError={this.state.passwordError}
          onChangeText={password =>
            this.setState({password, passwordError: false})
          }
        />

        {this.displayConfirmPwd()}

        <ButtonView title={title} onPress={this.onSignup} />

        <View style={styles.textContainer}>
          <Text style={styles.textStyle1}>{msg} </Text>
          <Button
            style={styles.textButtonContainer}
            title={buttonTitle}
            type="clear"
            buttonContainer={styles.textButtonContainer}
            titleStyle={styles.textStyle2}
            //onPress={this.setState(prevState => ({
            //isSignUp: !prevState.isSignUp,
            //}))}
            onPress={this.onTextPress}
          />
        </View>
      </View>
    );
  }

  displayUsername() {
    if (!this.state.isLogin) {
      return (
        <InputView
          placeHolder="Username"
          iconName="user"
          showError={this.state.usernameError}
          onChangeText={username =>
            this.setState({username, usernameError: false})
          }
        />
      );
    }
  }

  displayConfirmPwd() {
    if (!this.state.isLogin) {
      return (
        <InputView
          placeHolder="Confirm Password"
          iconName="lock"
          showError={this.state.confirmpwdError}
          onChangeText={confirmpwd =>
            this.setState({confirmpwd, confirmpwdError: false})
          }
        />
      );
    }
  }

  displayError() {
    if (this.state.hasError) {
      return <Text style={styles.textStyle1}>{this.state.errorMsg} </Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',

    //backgroundColor: '#19388A',
  },

  textContainer: {
    flexDirection: 'row',
    //alignItems:'center',
    //justifyContent:'center',
    fontStyle: 'italic',
    //textColor:'#ffffff',
    //marginRight: 10,
    marginTop: 10,
    //marginRight:50,
    //marginLeft:50,
  },

  textStyle1: {
    //flexDirection:'row',
    //alignItems:'center',
    //justifyContent:'center',
    fontStyle: 'italic',
    color: '#ffffff',
    //marginRight: 10,
    //marginTop: 10,
    //marginRight:50,
    //marginLeft:50,
  },

  textStyle2: {
    //flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontStyle: 'italic',
    color: '#E40489',
    fontSize: 15,
    //marginRight: 10,
    marginTop: 0,
    //marginRight:50,
    //marginLeft:50,
  },
  textButtonContainer: {
    //flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    //width: 5,
    marginTop: 0,
    //backgroundColor: '#ffffff',
  },
});
