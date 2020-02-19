import {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StyleSheet, StatusBar} from 'react-native';
import InputView from './InputView.js';
import ButtonView from './ButtonView.js';
import {Button, Text} from 'react-native-elements';
import Login from './Login.js';
import Signup from './Signup.js';
import {signupUser, login} from '../rest/RestAPI';
import {saveAuthToken, retrieveAuthToken} from '../rest/Storage';
export default class UserAuth extends Component {
  constructor(props) {
    super(props);
    //Icon.loadFont();
    this.state = {
      isLogin: true,
      user: '',
      hasError: false,
    };
  }

  onButtonPress = user => {
    /*this.setState({
      isLogin: user.isLogin,
      user: user,
    });*/
    console.log('harish::UserAuth:onButtonPress = ' + JSON.stringify(user));

    if (user.isLogin) {
      login(user)
        //.then(response => response.json())
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            console.log('Login response = ' + response.status);
            console.log('Login response = ' + response.statusText);

            this.setState({
              hasError: true,
            });

            return Promise.reject(response);
          }
        })
        .then(responseJson => {
          console.log('Login response final = ' + responseJson);
          //saveAuthToken(responseJson);
        });
    } else {
      signupUser(user)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          saveAuthToken(responseJson);
          console.log('Signup response = ' + responseJson);
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Signup
          onButtonPress={this.onButtonPress}
          hasError={this.state.hasError}
        />
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
  iconContainer: {
    //alignItems:'center',
    //justifyContent:'center',

    marginRight: 10,

    //marginRight:50,
    //marginLeft:50,
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
    //alignItems:'center',
    //justifyContent:'center',
    fontStyle: 'italic',
    color: '#E40489',
    fontSize: 15,
    //marginRight: 10,
    //marginTop: 10,
    //marginRight:50,
    //marginLeft:50,
  },
  textButtonContainer: {
    //flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 5,
    marginTop: 5,
    backgroundColor: '#777777',
  },

  inputContainer: {
    //alignItems:'center',
    //justifyContent:'center',

    borderRadius: 20,
    marginTop: 10,
    backgroundColor: '#E8CBFE',
    //marginRight:50,
    //marginLeft:50,
  },
  input: {
    //alignItems:'center',
    //justifyContent:'center',

    //placeholderTextColor:'#FFFFFF',
    width: 300,
    marginTop: 20,
    borderColor: '#E8CBFE',
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 40,
    borderWidth: 2,
  },

  inputBackground: {
    //alignItems:'center',
    //justifyContent:'center',

    backgroundColor: '#E8CBFE',
  },

  textColumn: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: 50,
  },

  buttonContainer: {
    flex: 1,
    marginBottom: '5%',
    justifyContent: 'flex-end',
  },

  endButton: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 50,
  },

  buttonRow: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 5,
    marginLeft: 5,
  },

  name: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
  },

  status: {
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
});
