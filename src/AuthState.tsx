import {StackActions} from '@react-navigation/routers';
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
      const resetAction = StackActions.push('onBoarding');
      navigation.dispatch(resetAction);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  useEffect(() => {
    // console.log('call here in');
    const unsubscribe = navigation.addListener('focus', (e: any) => {
      // Prevent default action
      // e.preventDefault();
      console.log('lets get authstate');
      getAuthState();
      console.log('called here');
    });
    return unsubscribe;
  }, [navigation]);
  return <View></View>;
};

export default AuthState;
