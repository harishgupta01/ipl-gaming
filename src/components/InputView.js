import {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StyleSheet} from 'react-native';
import Utils from './Utils';

export default class InputView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      'getDerivedStateFromProps:nextProps.showError = ' + nextProps.showError,
    );
    console.log(
      'getDerivedStateFromProps:prevState.showError = ' + prevState.showError,
    );
    if (
      Utils.isValid(nextProps.showError) &&
      nextProps.showError !== prevState.showError
    ) {
      return {errorMessage: nextProps.placeHolder + ' is empty'}; // <- this is setState equivalent
    }
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
        leftIcon={<Icon name={this.props.iconName} size={24} color="#8E909E" />}
        leftIconContainerStyle={styles.iconContainer}
        onChangeText={this.props.onChangeText}
      />
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    //alignItems:'center',
    //justifyContent:'center',

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
