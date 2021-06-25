import React, {useEffect} from 'react';
import {View} from 'react-native';
import helpers from './helpers';

interface IProps {
  navigation: any;
}

const AuthState: React.FC<IProps> = props => {
  const getAuthState = async () => {
    const token = await helpers.getItem('xxx-token');

    if (token) {
      return props.navigation.navigate('appHome');
    }
    return props.navigation.navigate('onBoarding');
  };
  useEffect(() => {
    getAuthState();
  }, []);
  return <View></View>;
};

export default AuthState;
