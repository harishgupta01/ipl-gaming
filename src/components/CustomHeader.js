import {Header} from 'react-native-elements';
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
      //leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{
        text: 'IPL BETTING',
        style: {color: '#fff', fontWeight: 'bold', fontSize: 20},
      }}
      rightComponent={<Logout />}
    />
  );
}
