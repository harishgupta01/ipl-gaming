import {Header, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';

//import {useNavigation} from 'react-navigation-hooks';
import Logout from './Logout';
export function CustomHeader() {
  //const {navigate} = useNavigation();

  return (
    <Header
      backgroundColor="#19388A"
      //style={{backgroundColor: '#19388A'}}
      leftComponent={loadImage()}
      centerComponent={{
        text: 'IPL BETTING',
        style: {color: '#fff', fontWeight: 'bold', fontSize: 20},
      }}
      rightComponent={<Logout />}
    />
  );
}

function loadImage() {
  return (
    <Avatar rounded size="small" source={require('../res/ipllogo2.jpeg')} />
  );
}
