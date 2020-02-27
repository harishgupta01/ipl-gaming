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
import {customHeader} from './Header.js';
/*const App: () => React$Node = () => {
  return <Signup />;
};*/
import {createBottomTabNavigator} from 'react-navigation-tabs';

const AppTabNavigator = createBottomTabNavigator(
  {
    Bet: CurrentBet,
    History: ScreenOne,
    //Settings: ScreenTwo,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#19388A',
      },
      labelStyle: {
        color: '#ffff',
        //paddingTop:5,
      },
    },
    navigationOptions: {},
  },
);



const TabContainer = createAppContainer(AppTabNavigator);

export default TabContainer;
