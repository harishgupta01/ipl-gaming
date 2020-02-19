import AsyncStorage from '@react-native-community/async-storage';

export const saveAuthToken = async token => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    // Error saving data
  }
};

export const retrieveAuthToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // Our data is fetched successfully
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};
