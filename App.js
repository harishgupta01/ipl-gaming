/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {Component} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Login from './src/components/Login';
import Signup from './src/components/Signup';
import UserAuth from './src/components/UserAuth.js';
import CurrentBet from './src/components/CurrentBet.js';
import TabContainer from './src/components/TabContainer.js';
//import CustomHeader from './src/components/CustomHeader.js';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';


import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import ScreenOne from './src/components/ScreenOne';





/*const App: () => React$Node = () => {
  return <Signup />;
};*/

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: UserAuth,
    App: TabContainer,
    //Header: CustomHeader,
  },
  {
    initialRouteName: 'Auth',
  },
);

const AppContainer = createAppContainer(SwitchNavigator);

// export  AppContainer;

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

AppRegistry.registerComponent("IplBetting", () => App);
