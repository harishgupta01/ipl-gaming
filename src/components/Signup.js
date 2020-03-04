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
      loading: false,
    };
  }

  onSignup = () => {
    this.setState({
      hasError: false,
      loading: true,
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
      console.log('Returning from first condition');
      return;
    }

    if (
      !this.state.isLogin &&
      (!isValid(this.state.username) || !isValid(this.state.confirmpwd))
    ) {
      console.log('Returning from second condition');
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
      hasError: false,
    }));
  };

  onChangeText = text => {
    console.log('onChangeText = ' + this.state.username);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      'getDerivedStateFromProps:nextProps.showError = ' + nextProps.hasError,
    );

    console.log(
      'getDerivedStateFromProps:nextProps.prevState.isLogin = ' +
        prevState.isLogin,
    );
    let update = {};
    if (isValid(nextProps.hasError)) {
      if (nextProps.hasError === true && prevState.isLogin === true) {
        update.errorMsg = 'Username or Password is incorrect';
        update.hasError = true;
      } else if (nextProps.hasError === true && prevState.isLogin === false) {
        update.errorMsg = 'User already exist';
        update.hasError = true;
      } else if (nextProps.hasError === false) {
        update.hasError = false;
      }
    }

    if (isValid(nextProps.loading)) {
      update.loading = nextProps.loading;
    }

    // if (isValid(nextProps.isLogin)) {
    //   update.loading = nextProps.loading;
    // }

    return update;
  }

  render() {
    console.log('this.state.loading = ' + this.state.loading);
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
          onChangeText={email =>
            this.setState({email, emailError: false, hasError: false})
          }
        />

        <InputView
          placeHolder="Password"
          iconName="lock"
          showError={this.state.passwordError}
          onChangeText={password =>
            this.setState({password, passwordError: false, hasError: false})
          }
        />

        {this.displayConfirmPwd()}
        <View style={{marginTop:40}}>
        <ButtonView
          title={title}
          onPress={this.onSignup}
          loading={this.state.loading}
        />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textStyle1}>{msg} </Text>
          <Button
            //style={styles.textButtonContainer}
            title={buttonTitle}
            type="clear"
            //buttonContainer={styles.textButtonContainer}
            buttonStyle = {styles.textButtonContainer}
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
            this.setState({username, usernameError: false, hasError: false})
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
            this.setState({confirmpwd, confirmpwdError: false, hasError: false})
          }
        />
      );
    }
  }

  displayError() {
    if (this.state.hasError) {
      return <Text style={styles.errorTextStyle}>{this.state.errorMsg} </Text>;
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
  errorTextStyle: {
    //flexDirection:'row',
    //alignItems:'center',
    //justifyContent:'center',
    fontStyle: 'italic',
    color: 'red',
    //marginRight: 10,
    //marginTop: 10,
    //marginRight:50,
    //marginLeft:50,
  },

  textStyle2: {
    //flexDirection:'row',
   // alignItems: 'flex-start',
    //justifyContent: 'flex-start',
    fontStyle: 'italic',
    color: '#E40489',
    fontSize: 15,
    textAlignVertical:'top'
    //marginRight: 10,
    //marginTop: 0,
    //marginRight:50,
    //marginLeft:50,
  },
  textButtonContainer: {
    //flexDirection:'row',
    alignItems: 'flex-start',
    //justifyContent: 'flex-start',
    //width: 5,
    //height:30,
    marginTop: -10,
    marginLeft: -10,
    //backgroundColor: '#ffffff',
  },
});
