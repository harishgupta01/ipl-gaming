import {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StyleSheet} from 'react-native';

export default class ButtonView extends Component {
  onPress = () => {
    console.log('onPress');
    this.props.onPress();
  };

  render() {
    return (
      <Button
        title={this.props.title}
        type="clear"
        color="#ffffff"
        containerStyle={styles.buttonContainer}
        titleStyle={styles.titleStyle}
        onPress={this.onPress}
        loading={this.props.loading}
      />
    );
  }
}
//Adding random commit Branch change1
const styles = StyleSheet.create({
  buttonContainer: {
    width: 230,
    //marginTop: 40,
    borderRadius: 80,
    //borderWidth: 2,
    backgroundColor: '#E40489',
    //Green :02B099
    //Blue:00AE96
    //olor:'#ffffff'
  },

  titleStyle: {
    color: '#ffffff',
  },
});
