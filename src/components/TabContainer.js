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
//Adding random commit Branch change2
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
