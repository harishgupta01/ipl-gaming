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
import CustomHeader from './src/components/CustomHeader.js';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
/*const App: () => React$Node = () => {
  return <Signup />;
};*/

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: UserAuth,
    App: TabContainer,
    Header: CustomHeader,
  },
  {
    initialRouteName: 'Auth',
  },
);

const AppContainer = createAppContainer(SwitchNavigator);

// export  AppContainer;

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;
