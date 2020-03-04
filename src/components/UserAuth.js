import {Component} from 'react';
import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StyleSheet} from 'react-native';
import Signup from './Signup.js';
import {signupUser, login} from '../rest/RestAPI';
import Toast from 'react-native-simple-toast';

export default class UserAuth extends Component {
  constructor(props) {
    super(props);
    //Icon.loadFont();
    this.state = {
      isLogin: true,
      user: '',
      hasError: false,
      loading: false,
    };
  }

  onButtonPress = user => {
    /*this.setState({
      isLogin: user.isLogin,
      user: user,
    });*/
    console.log('harish::UserAuth:onButtonPress = ' + JSON.stringify(user));
    this.setState({
      loading: true,
    });
    if (user.isLogin) {
      login(user)
        //.then(response => response.json())
        .then(response => {
          if (response.ok) {
            this.setState({
              hasError: false,
              loading: false,
            });

            //this.props.navigation.navigate(CurrentBet);
            return response.json();
          } else {
            this.setState({
              hasError: true,
              loading: false,
            });

            return Promise.reject(response);
          }
        })
        .then(responseJson => {
          console.log('Login response final>> = ' + responseJson);
          this.props.navigation.navigate('App');

          //saveAuthToken(responseJson);
          console.log(
            'harish:: this.props.navigation =' + this.props.navigation,
          );
        })
        .catch(function(error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
        });
    } else {
      signupUser(user)
        .then(response => {
          if (response.ok) {
            this.setState({
              hasError: false,
              loading: false,
            });

            return response.json();
          } else {
            this.setState({
              hasError: true,
              loading: false,
            });

            return Promise.reject(response);
          }
        })
        .then(responseJson => {
          console.log(responseJson);
          //saveAuthToken(responseJson);
          console.log('Signup response = ' + responseJson);
          Toast.showWithGravity(
            'Signup successfull. Please try login.',
            Toast.SHORT,
            Toast.BOTTOM,
          );
        })
        .catch(function(error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
        });
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../res/b8-2.png')}
        style={styles.backgroundImage}>
        <View style={styles.container}>
          <Signup
            onButtonPress={this.onButtonPress}
            hasError={this.state.hasError}
            loading={this.state.loading}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    //backgroundColor: '#19388A',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
});
