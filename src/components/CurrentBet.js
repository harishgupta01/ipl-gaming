import {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Card} from 'react-native-elements';
import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StyleSheet} from 'react-native';
import InputView from './InputView.js';
import ButtonView from './ButtonView.js';
import {Button, Text} from 'react-native-elements';

export default class CurrentBets extends Component {
  render() {
    return (
        <View>
      <Card title="Current Bet" image={require('../res/team.png')}>
        <Text style={{marginBottom: 10}}>Who is going to win ?</Text>
        <View style={{flexDirection: 'row',height:100}}>
          <Button containerStyle={styles.switchButtonStyle} />
          <Button containerStyle={styles.switchButtonStyle} />
        </View>
        <Button
          // icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            //marginTop: 20,
          }}
          title="BET NOW"
        />
      </Card>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#19388A',
  },

  switchButtonStyle: {
    flex: 1,
    width: 80,
    height: 100,
  },
  iconContainer: {
    //alignItems:'center',
    //justifyContent:'center',

    marginRight: 10,

    //marginRight:50,
    //marginLeft:50,
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

  textColumn: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: 50,
  },

  buttonContainer: {
    flex: 1,
    marginBottom: '5%',
    justifyContent: 'flex-end',
  },

  endButton: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 50,
  },

  buttonRow: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 5,
    marginLeft: 5,
  },

  name: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
  },

  status: {
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
});
