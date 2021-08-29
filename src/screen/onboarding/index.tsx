import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';

// import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import Button from '../../components/Button';
import Indicator from '../../components/Indicator';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';
import {Colors} from '../../util/Colors';
import {StackActions} from '@react-navigation/routers';

export const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
};

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

interface Props {
  navigation: any;
  router: any;
}

const STATUS_BAR_BACKGROUND = ['#f5b498', '#A471F7', '#f5b498'];

const CARROUSEL_COMPONENT: JSX.Element[] = [
  <FirstScreen />,
  <SecondScreen />,
  <ThirdScreen />,
];

const Onboarding: React.FC<Props> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.WHITE : Colors.WHITE,
  };

  const handleleftSwipe = () => {
    const length = CARROUSEL_COMPONENT.length;
    console.log('swipe left');
    setCurrentIndex(currentIndex => (currentIndex + 1) % length);
  };

  const handleRightSwipe = () => {
    console.log('swipe right');
    const length = CARROUSEL_COMPONENT.length;
    setCurrentIndex(currentIndex =>
      currentIndex == 0 ? length - 1 : (currentIndex - 1) % length,
    );
  };

  const gotToLogin = () => {
    // navigation.navigate('login')
    const resetAction = StackActions.push('login');
    navigation.dispatch(resetAction);
  };

  return (
    <SafeAreaView style={{...backgroundStyle, flex: 1}}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'light-content'}
        backgroundColor={STATUS_BAR_BACKGROUND[currentIndex]}
      />
      <GestureRecognizer
        config={config}
        onSwipeLeft={handleleftSwipe}
        onSwipeRight={handleRightSwipe}
        style={{flex: 1}}>
        <View style={styles.containerStyle}>
          <View style={{flex: 3}}>{CARROUSEL_COMPONENT[currentIndex]}</View>
          <View style={{flex: 2, width: '100%'}}>
            <View style={styles.indicatorWrapper}>
              <Indicator
                onPress={() => setCurrentIndex(0)}
                isActive={currentIndex === 0}
              />
              <Indicator
                onPress={() => setCurrentIndex(1)}
                isActive={currentIndex === 1}
              />
              <Indicator
                onPress={() => setCurrentIndex(2)}
                isActive={currentIndex === 2}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                left: 0,
                width: '100%',
              }}>
              <View style={styles.buttonContainer}>
                <Button
                  text="Register"
                  // onPress={() => navigation.navigate('businessDetailRegister')}
                  onPress={() => navigation.navigate('register')}
                />
              </View>

              <View style={styles.optionalContainer}>
                <Text style={styles.optionalText}>Already registered?</Text>
                <TouchableWithoutFeedback onPress={gotToLogin}>
                  <Text style={[styles.optionalText, styles.highlightText]}>
                    Login
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </GestureRecognizer>
    </SafeAreaView>
  );
};

//contentInsetAdjustmentBehavior="automatic"

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  buttonContainer: {
    height: 50,
    marginHorizontal: 24,
  },
  optionalContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionalText: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
  },
  highlightText: {
    marginLeft: 8,
    color: '#007AFF',
  },

  onBoardingTextContatiner: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onBoardingText: {
    color: '#808080',
    fontSize: 18,
    fontFamily: 'SFUIText-Light',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splishPayIcon: {
    width: 180,
    resizeMode: 'contain',
    height: 180,
  },
  indicatorWrapper: {
    marginTop: 10,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
});

export default Onboarding;
