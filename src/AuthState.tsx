import React, {useEffect} from 'react';
import {View} from 'react-native';
import helpers from './helpers';

interface IProps {
  navigation: any;
}

const AuthState: React.FC<IProps> = ({navigation}) => {
  const getAuthState = async () => {
    try {
      // await helpers.removeItem('xxx-token');

      console.log('herre');
      const token = await helpers.getItem('xxx-token');
      console.log('1');
      if (token) {
        console.log('2');
        return navigation.navigate('appHome');
      }
      console.log('3');
      return navigation.navigate('onBoarding');
    } catch (error) {
      console.log(error);
      return;
    }
  };
  useEffect(() => {
    // console.log('call here in');
    getAuthState();
  }, [navigation]);
  return <View></View>;
};

export default AuthState;
