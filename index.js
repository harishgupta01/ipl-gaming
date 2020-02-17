/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Login from './src/components/Login';
import Signup from './src/components/Signup';
import CurrentBets from './src/components/CurrentBet';
import UserAuth from './src/components/UserAuth';

AppRegistry.registerComponent(appName, () => UserAuth);
