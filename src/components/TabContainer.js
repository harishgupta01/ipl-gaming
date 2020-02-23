/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import CurrentBet from './CurrentBet.js';
import ScreenOne from './ScreenOne.js';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
/*const App: () => React$Node = () => {
  return <Signup />;
};*/
import {createBottomTabNavigator} from 'react-navigation-tabs';

const AppTabNavigator = createBottomTabNavigator({
  Home: CurrentBet,
  App: ScreenOne,
  //Settings: ScreenTwo,
});

const TabContainer = createAppContainer(AppTabNavigator);

export default TabContainer;
