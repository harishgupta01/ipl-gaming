import {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Card, ButtonGroup} from 'react-native-elements';
import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StyleSheet} from 'react-native';
import InputView from './InputView.js';
import ButtonView from './ButtonView.js';
import {Button, Text, Header} from 'react-native-elements';
import {getCurrentBet, getBetParticipant} from '../rest/RestAPI';
const TabIcon = props => (
  <Icon name={'home'} size={35} color={props.focused ? 'grey' : 'darkgrey'} />
);

export default class CurrentBets extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 1,
      teams: [],
    };
    //this.updateIndex = this.updateIndex.bind(this)

    getCurrentBet()
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(responseJson => {
        console.log(
          'getCurrentBet response final>> = ' + getBetParticipant(responseJson),
        );
        this.setState({
          teams: getBetParticipant(responseJson),
        });
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  }

  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  updateIndex = selectedIndex => {
    this.setState({selectedIndex});
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
        //leftComponent={{ icon: 'menu', color: '#fff' }}
        //centerComponent={{text: 'MY BETS', style: {color: '#fff'}}}
        //rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Card
          title="Current Bet"
          //containerStyle={styles.cardContainer}
          image={require('../res/team.jpg')}>
          {this.loadButtonGroup()}
          <Button
            containerStyle={styles.buttonContainer}
            // icon={<Icon name="code" color="#ffffff" />}

            title="BET NOW"
          />
        </Card>
      </View>
    );
  }

  loadButtonGroup = () => {
    const buttons = ['Hello', 'World'];
    const {selectedIndex} = this.state;
    var buttonView = [];

    var teams = this.state.teams;

    teams.forEach;

    teams.forEach(team => {
      buttonView.push(
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={team}
          //containerStyle={{height: 100}}
        />,
      );
    });

    return buttonView;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',

    backgroundColor: '#19388A',
  },
  cardContainer: {
    //flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',

    backgroundColor: '#19388A',
  },
  buttonContainer: {
    //width: 230,
    //marginTop: 40,
    //borderRadius: 80,
    //borderWidth: 2,
    backgroundColor: '#E40489',
    //Green :02B099
    //Blue:00AE96
    //olor:'#ffffff'
  },
  textContainer: {
    flexDirection: 'row',
    //alignItems:'center',
    //justifyContent:'center',
    fontStyle: 'italic',
    //textColor:'#ffffff',
    //marginRight: 10,
    marginTop: 10,
    //marginRight:50,
    //marginLeft:50,
  },

  textStyle1: {
    //flexDirection:'row',
    //alignItems:'center',
    //justifyContent:'center',
    fontStyle: 'italic',
    color: '#ffffff',
    //marginRight: 10,
    //marginTop: 10,
    //marginRight:50,
    //marginLeft:50,
  },

  textStyle2: {
    //flexDirection:'row',
    //alignItems:'center',
    //justifyContent:'center',
    fontStyle: 'italic',
    color: '#E40489',
    //marginRight: 10,
    //marginTop: 10,
    //marginRight:50,
    //marginLeft:50,
  },

  inputContainer: {
    //alignItems:'center',
    //justifyContent:'center',

    borderRadius: 20,
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
    borderColor: '#E8CBFE',
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 40,
    borderWidth: 2,
  },

  inputBackground: {
    //alignItems:'center',
    //justifyContent:'center',

    backgroundColor: '#E8CBFE',
  },
});
