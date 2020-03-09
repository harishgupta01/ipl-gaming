import {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, Card, ButtonGroup} from 'react-native-elements';
import React from 'react';
import {View, ImageBackground, Text, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native';
import InputView from './InputView.js';
import ButtonView from './ButtonView.js';
import {Button, Header} from 'react-native-elements';
import {CustomHeader} from './CustomHeader.js';
import {getHistory, parseHistory} from '../rest/RestAPI';
import {List, ListItem} from 'react-native-elements';
import Spinner from 'react-native-spinkit';
const TabIcon = props => (
  <Icon
    name={'history'}
    type="material-community"
    size={25}
    style={{marginTop: 10}}
    color={props.focused ? 'white' : 'darkgrey'}
  />
);



export default class ScreenOne extends Component {
  constructor() {
    super();

    this.state = {
      matches: [],
      isVisible: true,
    };

    //parseHistory('');
    getHistory()
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(responseJson => {
        this.changeVisibility();
        this.setState({
          matches: parseHistory(responseJson),
        });
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  }
  render() {
    //matches = this.state.matches;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../res/b2.png')}
          style={styles.backgroundImage}>
          {CustomHeader()}
          <View style={styles.spinContainer}>
                <Spinner
                  style={styles.spinner}
                  isVisible={this.state.isVisible}
                  size={70}
                  type="Circle"
                  color="white"
                />
              </View>
          <ScrollView>{this.loadCards()}</ScrollView>
        </ImageBackground>
      </View>
    );
  }

  static navigationOptions = {
    tabBarIcon: TabIcon,
    textColor: '#ffff',
  };

  changeVisibility() {
    this.setState({isVisible: !this.state.isVisible});
  }

  loadCards() {
    const {matches} = this.state;
    var cardView = [];
    if (matches === '' || matches === undefined || matches === null) {
      return;
    }

    for (var match in matches) {
      matches[match].map((u, i) => {
        console.log('Harish u = ' + u.name);
        console.log('Harish bet = ' + u.bet);
      });
    }
    for (var match in matches) {
      cardView.push(
        <Card
          containerStyle={{
            //elevation: 0,
            backgroundColor: 'rgba(10, 20, 46,0.7)',
            //padding: 0,
            borderColor: '#19388A',
          }}
          titleStyle={styles.titleStyle}
          //titleNumberOfLines={10}
          title={match}>
          {matches[match].map((u, i) => {
            return (
              <ListItem
                key={i}
                roundAvatar
                title={u.name}
                //bottomDivider
                rightTitle={u.bet}
                titleStyle={{color: '#000000',fontWeight: "bold"}}
                rightTitleStyle={{color: '#000000',fontWeight: "bold"}}
                containerStyle={{
                  backgroundColor: 'rgba(255, 255, 255,0.9)',
                  flex: 1,
                  marginTop: 5,
                }}
                //avatar={{uri: u.avatar}}
              />
            );
          })}
        </Card>,
      );
    }

    return cardView;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',

    //backgroundColor: 'lightgrey',
  },
  cardContainer: {
    //flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',

    backgroundColor: '#19388A',
  },
  spinContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    //backgroundColor: 'lightgrey',
  },
  spinner: {
    marginBottom: 50,
  },
  titleStyle: {
   // flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',

    elevation: 0,
    //backgroundColor: '#19388A',
    color: '#ffffff',
    height: 20,
    //textAlignVertical: 'center',
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
  backgroundImage: {
    flex: 1,
    
    //resizeMode: 'cover', // or 'stretch'
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
