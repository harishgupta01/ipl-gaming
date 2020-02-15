/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Login from './src/components/Login';
import Signup from './src/components/Signup';

const App: () => React$Node = () => {
  return <Signup />;
};

export default App;
