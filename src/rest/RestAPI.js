import React from 'react';
import {retrieveAuthToken} from './Storage';
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
