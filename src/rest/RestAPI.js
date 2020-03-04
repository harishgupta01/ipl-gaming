import React from 'react';
import {retrieveAuthToken, saveCurrentBet, getBetsFromStore} from './Storage';
import AsyncStorage from '@react-native-community/async-storage';

const URL = 'https://manishg-beta.herokuapp.com';
export const signupUser = async user => {
  const queryString =
    'email=' + user.email + '&password=' + user.password + '&name=' + user.name;
  const fullURL = URL + `/api/user/signup?${queryString}`;
  const res = await fetch(fullURL, {
    method: 'POST',
  });
  return res;
};

export const login = async user => {
  const queryString = 'email=' + user.email + '&password=' + user.password;
  const fullURL = URL + `/api/user/login?${queryString}`;
  const res = await fetch(fullURL, {
    method: 'POST',
  });
  return res;
};

export const getCurrentBet = async () => {
  const fullURL = URL + '/api/user/betlist';
  const res = await fetch(fullURL, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer' + retrieveAuthToken(),
    },
  });
  return res;
};

export const getBetParticipant = res => {
  var nameArray = [];
  var betArray = [];
  console.log('nameArray = ' + nameArray);
  res.forEach(element => {
    var name = element.name;
    betArray.push(name);
    console.log('getBetParticipant = ' + name.split('vs'));
    nameArray.push(name.split('vs'));
  });
  saveCurrentBet(betArray);
  //nameArray.push(['team11','team22'])
  return nameArray;
};

export const saveBet = async (teams, firstIndex, secondIndex) => {
  const fullURL = URL + '/api/user/save';
  var data = teams[0][0] + 'vs' + teams[0][1] + '=' + teams[0][firstIndex];
  if (teams.length > 1) {
    var data =
      data +
      '&' +
      teams[1][0] +
      'vs' +
      teams[1][1] +
      '=' +
      teams[1][secondIndex];
  }
  console.log('Harish::saved bet is = ' + data);
  const res = await fetch(fullURL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer' + retrieveAuthToken(),
    },
    body: data,
  });
  return res;
};

export const getBetCount = async () => {
  const fullURL = URL + '/api/user/getbetcount';
  var betArray = getBetsFromStore();
  var bodyData = 'name=' + betArray[0];
  const res = await fetch(fullURL, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer' + retrieveAuthToken(),
    },
    body: bodyData,
  });
  return res;
};

export const getHistory = async () => {
  const fullURL = URL + '/api/user/getbets';
  const res = await fetch(fullURL, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer' + retrieveAuthToken(),
    },
  });

  // console.log('getHistory = ' + JSON.stringify(res));
  return res;
};

export const parseHistory = res => {
  var res1 = {
    Test1vsTest2: [
      {
        name: '1',
        betname: 'Test6vsTest7',
        bet: 'Test7',
      },
      {
        name: '2',
        betname: 'Test6vsTest7',
        bet: 'Test7',
      },
    ],
    Test3vsTest4: [
      {
        name: '3',
        betname: 'Test6vsTest7',
        bet: 'Test7',
      },
      {
        name: '4',
        betname: 'Test6vsTest7',
        bet: 'Test7',
      },
    ],
    Test7vsTest2: [
      {
        name: '5',
        betname: 'Test6vsTest7',
        bet: 'Test7',
      },
      {
        name: '6',
        betname: 'Test6vsTest7',
        bet: 'Test7',
      },
    ],
    Test6vsTest4: [
      {
        name: '7',
        betname: 'Test6vsTest7',
        bet: 'Test7',
      },
      {
        name: '8',
        betname: 'Test6vsTest7',
        bet: 'Test7',
      },
    ],
  };
  //const obj = JSON.parse(res);

  var matches = {};
  var bets = [];
  for (var k in res) {
    var bets = res[k];
    console.log('parseHistory1 = ' + bets);
    var totalBets = [];
    bets.forEach(b => {
      console.log('parseHistory2 = ' + b.bet);
      // var eachBet = {name: b.name, bet: b.bet};
      var eachBet = [b.name, b.bet];
      totalBets.push(eachBet);
    });
    matches[k] = totalBets;
  }

  console.log('parseHistory3 = ' + matches);

  /*res.forEach(element => {
    console.log('parseHistory = ' + element);
  });*/
  //nameArray.push(['team11','team22'])
  return res;
};

// export const signupUser = async user => {
//   const queryString =
//     'email=' + user.email + '&password=' + user.password + '&name=' + user.name;
//   const fullURL = URL + `/api/user/signup?${queryString}`;
//   console.log('Fullurl::' + fullURL);
//   fetch(fullURL, {
//     method: 'POST',
//   })
//     .then(response => response.json())
//     .then(responseJson => {
//       console.log(responseJson);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };
