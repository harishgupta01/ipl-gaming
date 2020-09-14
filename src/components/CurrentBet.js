import {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import Icon from 'react-native-vector-icons/AntDesign';
import {Input, Card, ButtonGroup, avatar} from 'react-native-elements';
import React from 'react';
import {View, ImageBackground, ScrollView} from 'react-native';
import {StyleSheet, Image} from 'react-native';
import InputView from './InputView.js';
import ButtonView from './ButtonView.js';
import {CustomHeader} from './CustomHeader.js';
//import Toast from 'react-native-simple-toast';
import {Button, Text, Header, Avatar, ListItem} from 'react-native-elements';
//import Spinner from 'react-native-spinkit';
import {
  getCurrentBet,
  getBetParticipant,
  saveBet,
  getBetCount,
} from '../rest/RestAPI';
//import { ScrollView } from 'react-native-gesture-handler';
const TabIcon = props => (
  <Icon
    name={'poker-chip'}
    type="material-community"
    size={25}
    style={{marginTop: 10}}
    color={props.focused ? 'white' : 'darkgrey'}
  />
);

const users = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'harish',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'Manish',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'Nija',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
];

export default class CurrentBets extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndexFirst: 1,
      selectedIndexSecond: 1,
      teams: [],
      users: [],
      isVisible: true,
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
        this.setState({
          teams: getBetParticipant(responseJson),
        });
        this.changeVisibility();
        console.log('getCurrentBet:: = ' + this.state.teams);
        this.getUsersDoneWithBet(this.state.teams);
      })
      .catch(function(error) {
        this.props.navigation.navigate('Auth');
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  }

  changeVisibility() {
    this.setState({isVisible: !this.state.isVisible});
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
  /*
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
  */

  saveBet = () => {
    const {teams, selectedIndexFirst, selectedIndexSecond} = this.state;

    saveBet(teams, selectedIndexFirst, selectedIndexSecond)
      .then(responseJson => {
        console.log('Bet saved successfully');
        // Toast.showWithGravity(
        //   'Your bet saved successfully!!',
        //   Toast.SHORT,
        //   Toast.BOTTOM,
        // );
        this.getUsersDoneWithBet(this.state.teams);
      })
      .catch(function(error) {
        console.log(
          'Save::There has been a problem with your fetch operation: ' +
            error.message,
        );
        // Toast.showWithGravity('Bet already exist!!', Toast.SHORT, Toast.BOTTOM);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {CustomHeader()}

        <ImageBackground
          source={require('../res/b8.jpg')}
          style={styles.backgroundImage}>
          <ScrollView>
            <View style={{marginTop: 10}}>
              <Card
                //containerStyle={styles.cardContainerStyle}
                title="Current Bet"
                titleStyle={styles.titleStyle}
                containerStyle={styles.cardContainer}
                image={require('../res/b5.jpeg')}
                // image={{
                //   uri:
                //     'https://i.pickadummy.com/300x300?fontsize=120&font=FFF%20Tusj&text=MIvsCSK!',
                // }}
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
              <View style={styles.spinContainer}>
                {/* <Spinner
                  style={styles.spinner}
                  isVisible={this.state.isVisible}
                  size={70}
                  type="Circle"
                  color="white"
                /> */}
              </View>
              {this.loadUserList()}
            </View>
          </ScrollView>
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
  loadUserList = () => {
    var betUsers = this.state.users;
    if (betUsers.length != 0) {
      return (
        <Card
          //containerStyle={styles.cardContainerStyle}
          title="Bets done so far by ..."
          titleStyle={styles.titleStyle}
          containerStyle={styles.cardContainer}
          imageStyle={styles.cardImage}>
          {betUsers.map((u, i) => {
            return (
              <ListItem
                key={i}
                roundAvatar
                title={u.name}
                bottomDivider
                //bottomDivider
                leftAvatar={{
                  source: {
                    uri: 'https://api.adorable.io/avatars/50/' + u.name,
                  },
                }}
                titleStyle={{color: '#000000', fontWeight: 'bold'}}
                containerStyle={{
                  backgroundColor: 'rgba(255, 255, 255,1)',
                  //flex: 1,
                  marginTop: 5,
                  height: 50,
                }}
                //avatar={{uri: u.avatar}}
              />
            );
          })}
        </Card>
      );
    }
  };

  loadFirstBtnGrp = () => {
    var teams = this.state.teams;
    const {selectedIndexFirst} = this.state;
    if (teams.length !== 0) {
      return (
        <ButtonGroup
          onPress={this.updateIndexFirst}
          selectedIndex={selectedIndexFirst}
          buttons={teams[0]}
          selectedButtonStyle={{
            backgroundColor: '#19388A',
            borderColor: '#ffffff00',
            elevation: 0,
          }}
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
          selectedButtonStyle={{
            backgroundColor: '#19388A',
            borderColor: '#ffffff00',
            elevation: 0,
          }}
        />
      );
    }
  };

  getUsersDoneWithBet(teams) {
    getBetCount(teams)
      // .then(response => {
      //   if (response.ok) {
      //     return response.json();
      //   } else {
      //     return Promise.reject(response);
      //   }
      // })
      .then(responseJson => {
        console.log(
          'getBetCount response final>> = ' + JSON.stringify(responseJson),
        );
        this.setState({
          users: responseJson.data.reverse(),
        });
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',

    //backgroundColor: 'lightgrey',
  },
  spinContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    //backgroundColor: 'lightgrey',
  },
  cardContainer: {
    //flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    //padding: 0,
    //backgroundColor: '#ffffff00',
    //borderColor: '#ffffff00',
    //marginTop:10,
    backgroundColor: 'rgba(10, 20, 46,0.7)',
  },
  spinner: {
    marginBottom: 50,
  },
  cardContainerStyle: {
    //flex: 1,
    elevation: 0,
    backgroundColor: '#ffffff00',
    padding: 0,
    //borderColor:'ffffff00'
  },
  user: {
    width: 100,
    paddingLeft: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255,0.7)',
    marginTop: 5,
  },
  buttonContainer: {
    // flex:1,
    //width: 230,
    marginTop: 20,
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
    //backgroundColor: '#19388A',
    color: '#ffffff',
    //height: 50,
    //textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    //marginBottom: 0,
    //marginTop: 0,
  },
  backgroundImage: {
    flex: 1,
    //resizeMode: 'cover', // or 'stretch'
  },
  cardImage: {
    //flex: 1,
    //resizeMode: 'cover', // or 'stretch'
    height: 180,
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
