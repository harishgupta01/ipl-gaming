import React from 'react';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import {deleteStorage, saveLoginState} from './../rest/Storage.js';
import {logout} from '../rest/RestAPI';
class Logout extends React.Component {
  onLogout = () => {
    logout().then(() => {
      saveLoginState(false);
      this.props.navigation.navigate('Auth');
    });
  };

  render() {
    return (
      <Icon
        type="material-community"
        name="logout"
        iconSize={60}
        color="#fff"
        onPress={this.onLogout}
        style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}
      />
    );
  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(Logout);
