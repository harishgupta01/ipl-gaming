import {Button, Text, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {Component} from 'react';
export default class CustomHeader extends Component {


  onLogout  = ()=>{
    this.props.navigation.navigate('Auth');
  }
  render() {
    return (
      <Header
        backgroundColor="#19388A"
        //style={{backgroundColor: '#19388A'}}
        //leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{
          text: 'IPL BETTING',
          style: {color: '#fff', fontWeight: 'bold', fontSize: 20},
        }}
        rightComponent={
          <Icon
            type="material-community"
            name="logout"
            iconSize={60}
            color="#fff"
            onPress={this.onLogout}
            style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}
          />
        }
      />
    );
  }
}
/*export const customHeader = () => {
  return (
    <Header
      backgroundColor="#19388A"
      //style={{backgroundColor: '#19388A'}}
      //leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{
        text: 'IPL BETTING',
        style: {color: '#fff', fontWeight: 'bold', fontSize: 20},
      }}
      rightComponent={
        <Icon
          type="material-community"
          name="logout"
          iconSize={60}
          color="#fff"
          onPress={this.onPress}
          style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}
        />
      }
    />
  );
};*/
