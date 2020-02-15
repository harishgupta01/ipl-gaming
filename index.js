/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Login from './src/components/Login';
import Signup from './src/components/Signup';

AppRegistry.registerComponent(appName, () => Signup);
