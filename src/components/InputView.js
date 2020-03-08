import {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StyleSheet} from 'react-native';
import {isValid} from './Utils';

export default class InputView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      errorMessage: '',
    };
  }

  onChangeText = text => {
    console.log('InputView:onChangeText=', text);
    this.props.onChangeText(text);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (isValid(nextProps.showError)) {
      if (nextProps.showError === true) {
        return {errorMessage: nextProps.placeHolder + ' is empty'};
      } else {
        return {errorMessage: ''};
      }
    }
    return null;
  }

  render() {
    return (
      <Input
        placeholder={this.props.placeHolder}
        placeholderTextColor="#8E909E"
        containerStyle={styles.input}
        // eslint-disable-next-line react-native/no-inline-styles
        errorStyle={styles.errorStyle}
        inputStyle={styles.inputStyle}
        errorMessage={this.state.errorMessage}
        leftIcon={<Icon name={this.props.iconName} size={20} color="#8E909E" />}
        leftIconContainerStyle={styles.iconContainer}
        onChangeText={this.onChangeText}
      />
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    //alignItems:'center',
    //justifyContent:'center',
    width: 20,
    marginRight: 10,

    //marginRight:50,
    //marginLeft:50,
  },
  inputContainer: {
    //alignItems:'center',
    //justifyContent:'center',

    //borderRadius: 20 ,
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
    borderColor: '#8E909E',
    //marginRight: 50,
    //marginLeft: 50,
    //borderRadius: 40 ,
    //borderWidth: 1
  },

  inputStyle: {
    color: '#ffffff',
  },
  errorStyle: {
    color: 'red',
    marginLeft: 40,
    fontSize: 15,
  },
});
