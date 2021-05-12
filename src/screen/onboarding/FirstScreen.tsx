import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from '../HomeScreen';
import Button from '../../components/Button';
import Indicator from '../../components/Indicator';

const backgroundImage = require('../../../assets/images/pink_bg.jpg');
const splishPay = require('../../../assets/images/splishpay.png');

const Banner: React.FC<any> = () => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={backgroundImage} style={styles.image}>
        <Image
          source={splishPay}
          resizeMode="contain"
          style={styles.splishPayIcon}
        />
      </ImageBackground>
    </View>
  );
};

const FirstScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, width: '100%'}}>
        <Banner />
      </View>
      <View style={styles.onBoardingTextContatiner}>
        <View>
          <Text style={styles.onBoardingText}>Sign up to do it the easy</Text>
        </View>
        <View>
          <Text style={styles.onBoardingText}> Way</Text>
        </View>
      </View>
    </View>
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
});

export default FirstScreen;
