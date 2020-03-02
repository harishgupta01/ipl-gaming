import {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import Icon from 'react-native-vector-icons/AntDesign';
import {Input, Card, ButtonGroup} from 'react-native-elements';
import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StyleSheet} from 'react-native';
import InputView from './InputView.js';
import ButtonView from './ButtonView.js';
import {CustomHeader} from './CustomHeader.js';
import Toast from 'react-native-simple-toast';
import {Button, Text, Header} from 'react-native-elements';
import {getCurrentBet, getBetParticipant, saveBet} from '../rest/RestAPI';
const TabIcon = props => (
  <Icon
    name={'poker-chip'}
    type="material-community"
    size={25}
    style={{marginTop: 10}}
    color={props.focused ? 'white' : 'darkgrey'}
  />
);

export default class CurrentBets extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndexFirst: 1,
      selectedIndexSecond: 1,
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
          teams: getBetParticipant(
            JSON.parse(
              '[{"_id":"5e2082714518353a5ce96411","id":"301","name":"Test1vsTest2","DateFrom":"2020-01-09T14:00:00.000Z","DateTo":"2020-01-30T14:00:00.000Z"},{"_id":"5e2082714518353a5ce96412","id":"302","name":"Test3vsTest4","DateFrom":"2020-01-10T14:00:00.000Z","DateTo":"2020-01-30T14:00:00.000Z"}]',
            ),
          ),
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
    textColor: '#ffff',
  };

  updateIndexFirst = selectedIndexFirst => {
    this.setState({selectedIndexFirst});
  };

  updateIndexSecond = selectedIndexSecond => {
    this.setState({selectedIndexSecond});
  };

  saveBet = () => {
    const {teams, selectedIndexFirst, selectedIndexSecond} = this.state;

    saveBet(teams, selectedIndexFirst, selectedIndexSecond)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(responseJson => {
        console.log('Bet saved successfully');
        Toast.showWithGravity(
          'Your bet saved successfully',
          Toast.SHORT,
          Toast.BOTTOM,
        );
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  };
  render() {
    return (
      <View style={styles.container}>
        {CustomHeader()}

        <ImageBackground
          source={require('../res/b3.jpeg')}
          style={styles.backgroundImage}>
          <View style={{marginTop:10}}>
            <Card
              //containerStyle={styles.cardContainerStyle}
              title="Current Bet"
              titleStyle={styles.titleStyle}
              containerStyle={styles.cardContainer}
              image={require('../res/b5.jpeg')}
              imageStyle={styles.cardImage}>
              
              {this.loadFirstBtnGrp()}
              {this.loadSecondBtnGrp()}
              <View style={styles.buttonContainer}>
              <ButtonView
                title="BET NOW"
                onPress={this.saveBet}
                // onPress={this.onSignup}
                //loading={this.state.loading}
              />
              </View>
            </Card>
          </View>
        </ImageBackground>
      </View>
    );
  }

  /*loadButtonGroup = () => {
    const buttons = ['Hello', 'World'];
    const {selectedIndexFirst} = this.state;
    var buttonView = [];

    var teams = this.state.teams;

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
  };*/

  loadFirstBtnGrp = () => {
    var teams = this.state.teams;
    const {selectedIndexFirst} = this.state;
    if (teams.length !== 0) {
      return (
        <ButtonGroup
          onPress={this.updateIndexFirst}
          selectedIndex={selectedIndexFirst}
          buttons={teams[0]}
          selectedButtonStyle={{backgroundColor: '#19388A',borderColor:'#ffffff00',elevation:0}}
          //containerStyle={{height: 100}}
        />
      );
    }
  };

  loadSecondBtnGrp = () => {
    var teams = this.state.teams;
    if (teams.length > 1) {
      const {selectedIndexSecond} = this.state;
      return (
        <ButtonGroup
          onPress={this.updateIndexSecond}
          selectedIndex={selectedIndexSecond}
          buttons={teams[1]}
          //containerStyle={{height: 100}}
        />
      );
    }
  };
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
    padding: 0,
    //backgroundColor: '#ffffff00',
    //borderColor: '#ffffff00',
    //marginTop:10,
    backgroundColor: 'rgba(255, 255, 255,0.4)',
  },
  cardContainerStyle: {
    //flex: 1,
    elevation: 0,
    backgroundColor: '#ffffff00',
    padding: 0,
    //borderColor:'ffffff00'
  },
  buttonContainer: {
   // flex:1,
    //width: 230,
    //marginTop: 40,
    //borderRadius: 80,
    //borderWidth: 2,
    //backgroundColor: '#E40489',
    //Green :02B099
    //Blue:00AE96
    //olor:'#ffffff'
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    //flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',

    //elevation: 0,
    backgroundColor: '#19388A',
    color: '#ffffff',
    height: 50,
    //textAlignVertical: 'center',
    fontWeight:'bold',
    fontSize:20,
    marginBottom:0,
    marginTop:0
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  cardImage: {
    //flex: 1,
    resizeMode: 'cover', // or 'stretch'
    height:280,
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
