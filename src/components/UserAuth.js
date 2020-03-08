import {Component} from 'react';
import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StyleSheet} from 'react-native';
import Signup from './Signup.js';
import {signupUser, login} from '../rest/RestAPI';
import {saveLoginState, isLoggedIn} from '../rest/Storage';
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
      isUserloggedIn: true,
    };
    isLoggedIn().then(status => {
      if (status) {
        this.props.navigation.navigate('App');
      } else {
        this.setState({
          isUserloggedIn: false,
        });
      }
    });
  }

  onButtonPress = user => {
    var self = this;
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
        // .then(response => {
        //   if (response.ok) {
        //     this.setState({
        //       hasError: false,
        //       loading: false,
        //     });

        //     //this.props.navigation.navigate(CurrentBet);
        //     return response.json();
        //   } else {
        //     this.setState({
        //       hasError: true,
        //       loading: false,
        //     });

        //     return Promise.reject(response);
        //   }
        // })
        .then(responseJson => {
          console.log('Login response final>> = ' + responseJson);
          this.setState({
            hasError: false,
            loading: false,
          });

          //saveAuthToken(responseJson);
          saveLoginState(true);
          this.props.navigation.navigate('App');

          console.log(
            'harish:: this.props.navigation =' + this.props.navigation,
          );
        })
        .catch(function(error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
          self.setState({
            hasError: true,
            loading: false,
          });
        });
    } else {
      signupUser(user)
        // .then(response => {
        //   if (response.ok) {
        //     this.setState({
        //       hasError: false,
        //       loading: false,
        //     });
        //       console.log('signupUser:response is = '+response)
        //     //return response.json();
        //   } else {
        //     this.setState({
        //       hasError: true,
        //       loading: false,
        //     });

        //     return Promise.reject(response);
        //   }
        // })
        .then(responseJson => {
          console.log(responseJson);
          //saveAuthToken(responseJson);
          this.setState({
            hasError: false,
            loading: false,
          });
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
          self.setState({
            hasError: true,
            loading: false,
          });
        });
    }
  };

  render() {
    if (this.state.isUserloggedIn) {
      return null;
    } else {
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
