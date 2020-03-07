import React from 'react';
import {retrieveAuthToken, saveCurrentBet, getBetsFromStore} from './Storage';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import querystring from 'querystring';

const URL = 'https://manishg-beta.herokuapp.com';
export const signupUser = async user => {
  // var formData = new FormData();
  // formData.append('email', user.email);
  // formData.append('password', user.password);
  // formData.append('name', user.name);
  // const queryString =
  //   'email=' + user.email + '&password=' + user.password + '&name=' + user.name;
  //   var data = encodeURIComponent(queryString);

  // const res = fetch(fullURL, {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'x-www-form-urlencoded',
  //   },
  // })
  //   .then(function(response) {
  //     console.log('signupUser::response = ' + response);
  //     return response.json();
  //   })
  //   .then(function(data) {
  //     console.log('signupUser::done');
  //   });
  // return res;
  // const params = new URLSearchParams();
  // params.append('email', user.email);
  //  params.append('password', user.password);
  //  params.append('name', user.name);
  // //return params;
  const fullURL = URL + '/api/user/signup';
  const res = await axios.post(
    fullURL,
    querystring.stringify({
      email: user.email,
      password: user.password,
      name: user.name,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return res;
};

export const login = async user => {
  const fullURL = URL + '/api/user/login';
  const res = await axios
    .post(
      fullURL,
      querystring.stringify({
        email: user.email,
        password: user.password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then(function(response) {
      console.log('login = ' + response);
    });

  //return res;
};

// export const login = async user => {
//   // var formData = new FormData();
//   // formData.push('email', user.email);
//   // formData.push('password', user.password);
//   var formData = new FormData();
//   formData.append('email', user.email);
//   formData.append('password', user.password);
//   const queryString = 'email=' + user.email + '&password=' + user.password;
//   const fullURL = URL + `/api/user/login?${queryString}`;
//   const res = await fetch(fullURL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'x-www-form-urlencoded',
//     },
//   });
//   return res;
// };

export const getCurrentBet = async () => {
  const fullURL = URL + '/api/user/betlist';
  const res = await fetch(fullURL, {
    method: 'GET',
    // headers: {
    //   Authorization: 'Bearer' + retrieveAuthToken(),
    // },
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
  console.log('saveCurrentBet = ' + betArray);
  saveCurrentBet(betArray);
  //nameArray.push(['team11','team22'])
  return nameArray;
};

/*export const saveBet = async (teams, firstIndex, secondIndex) => {
  //console.log('Harish::saved token is = ' + retrieveAuthToken());
  retrieveAuthToken()
    .then(token => {
      return restforSaveBet(teams, firstIndex, secondIndex, token);
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      //this callback is executed when your Promise is rejected
      console.log('Promise is rejected with error: ' + error);
    });
};*/

export const saveBet = async (teams, firstIndex, secondIndex) => {
  var querryData = {};
  const fullURL = URL + '/api/user/save';
  var data = teams[0][0] + 'vs' + teams[0][1] + '=' + teams[0][firstIndex];

  querryData[teams[0][0] + 'vs' + teams[0][1]] = teams[0][firstIndex];

  if (teams.length > 1) {
    querryData[teams[1][0] + 'vs' + teams[1][1]] = teams[1][secondIndex];
    var data =
      data +
      '&' +
      teams[1][0] +
      'vs' +
      teams[1][1] +
      '=' +
      teams[1][secondIndex];
  }

  const res = await axios.post(fullURL, querystring.stringify(querryData), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return res;
};
export const getBetCount = async teams => {

  var querryData = {};
  querryData['name'] = teams[0][0] + 'vs' + teams[0][1]
  const fullURL = URL + '/api/user/getbetcount';
  var betArray = getBetsFromStore();
  var bodyData = 'name=' + teams[0][0] + 'vs' + teams[0][1];
  var formData = new FormData();
  formData.append('name', teams[0][0] + 'vs' + teams[0][1]);
  console.log('getBetCount:body = ' + bodyData);

  const res = await axios.post(fullURL, querystring.stringify(querryData), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });


  // const res = await fetch(fullURL, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'x-www-form-urlencoded',
  //   },
  //   body: formData,
  // });
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
  //const obj = JSON.parse(res);

  var matches = [];
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

export const logout = async user => {
  const fullURL = URL + '/api/user/logout';
  const res = await axios.get(fullURL);
  return res;
};
