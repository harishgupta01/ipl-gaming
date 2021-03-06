import {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StyleSheet} from 'react-native';
import InputView from './InputView.js';
import ButtonView from './ButtonView.js';
import {Button, Text} from 'react-native-elements';

export const isValid = prop => {
  if (prop !== '' && prop !== undefined) {
    console.log('prop is = ' + prop + ' so returning true');
    return true;
  }
  console.log('prop is = ' + prop + ' so returning false');
  return false;
};
